import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { helpScreenshots } from '../src/data/help/screenshots.mjs';

const input = resolve(process.argv[2] || '/tmp/opencode/tagrides-help-captures');
const prepared = new Set();
const selected = process.env.HELP_IMAGE_IDS?.split(',');
for (const [id, image] of Object.entries(helpScreenshots)) {
  if (selected && !selected.includes(id)) continue;
  if (prepared.has(image.src)) continue;
  prepared.add(image.src);
  const destination = resolve(`public${image.src}`);
  await mkdir(resolve(destination, '..'), { recursive: true });
  let transform = sharp(resolve(input, `${id}.png`));
  if (image.crop) transform = transform.extract(image.crop);
  const result = await transform.webp({ quality: 88, effort: 5 }).toFile(destination);
  if (result.width !== image.width || result.height !== image.height)
    throw new Error(`Unexpected image dimensions: ${id}`);
  console.log(`${id}: ${result.width}x${result.height}, ${Math.round(result.size / 1024)} KB`);
}
