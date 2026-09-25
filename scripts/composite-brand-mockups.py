from pathlib import Path
from PIL import Image, ImageChops, ImageEnhance, ImageFilter
import math
import sys


def solve(matrix, values):
    size = len(values)
    rows = [list(map(float, matrix[i])) + [float(values[i])] for i in range(size)]
    for column in range(size):
        pivot = max(range(column, size), key=lambda row: abs(rows[row][column]))
        rows[column], rows[pivot] = rows[pivot], rows[column]
        divisor = rows[column][column]
        if abs(divisor) < 1e-10:
            raise ValueError('Singular perspective transform')
        rows[column] = [value / divisor for value in rows[column]]
        for row in range(size):
            if row == column:
                continue
            factor = rows[row][column]
            rows[row] = [rows[row][i] - factor * rows[column][i] for i in range(size + 1)]
    return [rows[i][-1] for i in range(size)]


def perspective_coefficients(target, source):
    matrix = []
    values = []
    for (x, y), (u, v) in zip(target, source):
        matrix.append([x, y, 1, 0, 0, 0, -u * x, -u * y])
        values.append(u)
        matrix.append([0, 0, 0, x, y, 1, -v * x, -v * y])
        values.append(v)
    return solve(matrix, values)


def trim(image):
    alpha = image.getchannel('A')
    bounds = alpha.getbbox()
    return image.crop(bounds) if bounds else image


def warp_logo(logo, quad):
    logo = trim(logo.convert('RGBA'))
    left = min(point[0] for point in quad)
    top = min(point[1] for point in quad)
    right = max(point[0] for point in quad)
    bottom = max(point[1] for point in quad)
    width = max(1, right - left)
    height = max(1, bottom - top)
    local_target = [(x - left, y - top) for x, y in quad]
    source = [(0, 0), (logo.width, 0), (logo.width, logo.height), (0, logo.height)]
    coefficients = perspective_coefficients(local_target, source)
    warped = logo.transform((width, height), Image.Transform.PERSPECTIVE, coefficients, Image.Resampling.BICUBIC)
    return warped, (left, top)


def materialize(base, logo, quad, mode='vinyl', opacity=1.0):
    warped, position = warp_logo(logo, quad)
    alpha = warped.getchannel('A')
    region = base.crop((position[0], position[1], position[0] + warped.width, position[1] + warped.height)).convert('RGB')
    luminance = region.convert('L').filter(ImageFilter.GaussianBlur(1.1))

    if mode in {'embroidery', 'vinyl'}:
        modulation = ImageEnhance.Contrast(luminance).enhance(0.55)
        modulation = modulation.point(lambda value: int(190 + value * 0.24))
        rgb = ImageChops.multiply(warped.convert('RGB'), Image.merge('RGB', (modulation, modulation, modulation)))
        warped = Image.merge('RGBA', (*rgb.split(), alpha.point(lambda value: int(value * opacity))))
    elif mode == 'foil':
        gradient = Image.new('L', warped.size)
        pixels = gradient.load()
        for y in range(warped.height):
            for x in range(warped.width):
                wave = 0.5 + 0.5 * math.sin((x + y * 0.7) / 22)
                pixels[x, y] = int(165 + 80 * wave)
        rgb = ImageChops.multiply(warped.convert('RGB'), Image.merge('RGB', (gradient, gradient, gradient)))
        warped = Image.merge('RGBA', (*rgb.split(), alpha))

    shadow = Image.new('RGBA', base.size)
    shadow_mask = alpha.filter(ImageFilter.GaussianBlur(2.0 if mode == 'signage' else 1.0))
    shadow_strength = {'signage': 58, 'embroidery': 24, 'foil': 18, 'letterpress': 12, 'vinyl': 10}.get(mode, 18)
    shadow_patch = Image.new('RGBA', warped.size, (0, 0, 0, shadow_strength))
    shadow_patch.putalpha(shadow_mask)
    shadow.alpha_composite(shadow_patch, (position[0] + (7 if mode == 'signage' else 2), position[1] + (8 if mode == 'signage' else 2)))
    base.alpha_composite(shadow)

    if mode == 'embroidery':
        highlight = Image.new('RGBA', warped.size, (255, 255, 255, 0))
        edge = ImageChops.subtract(alpha, alpha.filter(ImageFilter.GaussianBlur(1.4))).point(lambda value: min(62, value * 2))
        highlight.putalpha(edge)
        base.alpha_composite(highlight, (position[0] - 1, position[1] - 1))

    base.alpha_composite(warped, position)


def compose(base_path, output_path, placements):
    base = Image.open(base_path).convert('RGBA')
    for logo_path, quad, mode, opacity in placements:
        # Placement coordinates are reviewed against the 1152 x 768 proof render.
        # Scale them to the 1536 x 1024 production source without changing geometry.
        quad = [(round(x * 4 / 3), round(y * 4 / 3)) for x, y in quad]
        logo = Image.open(logo_path).convert('RGBA')
        materialize(base, logo, quad, mode, opacity)
    Path(output_path).parent.mkdir(parents=True, exist_ok=True)
    base.convert('RGB').save(output_path, 'PNG', optimize=True)


if __name__ == '__main__':
    if len(sys.argv) != 2:
        raise SystemExit('Usage: composite-brand-mockups.py <output-directory>')
    print('This module is imported by render-brand-mockups.py; output directory:', sys.argv[1])
