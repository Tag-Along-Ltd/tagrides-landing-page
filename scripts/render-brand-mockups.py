from pathlib import Path
import importlib.util


ROOT = Path(__file__).resolve().parents[1]
TMP = Path('/tmp/opencode')
spec = importlib.util.spec_from_file_location('compositor', ROOT / 'scripts/composite-brand-mockups.py')
compositor = importlib.util.module_from_spec(spec)
spec.loader.exec_module(compositor)


compositor.compose(
    TMP / 'tagrides-apparel-base.png',
    ROOT / 'public/assets/brand/mockup-apparel.png',
    [
        (TMP / 'tagrides-mark-reference.png', [(258, 307), (375, 304), (382, 382), (255, 390)], 'embroidery', 0.92),
        (TMP / 'tagrides-lockup-reference.png', [(790, 316), (1005, 326), (1000, 376), (788, 366)], 'embroidery', 0.92),
    ],
)
compositor.compose(
    TMP / 'tagrides-vehicle-base.png',
    ROOT / 'public/assets/brand/mockup-vehicle.png',
    [(TMP / 'tagrides-lockup-reference.png', [(570, 390), (795, 390), (798, 447), (570, 450)], 'vinyl', 0.88)],
)
compositor.compose(
    TMP / 'yhly-workwear-base.png',
    Path('/home/ubuntu/your-home-like-you/public/brand/yhly-mockup-workwear.png'),
    [
        (TMP / 'yhly-white-ref.png', [(350, 295), (415, 302), (414, 366), (347, 358)], 'embroidery', 0.90),
        (TMP / 'yhly-white-ref.png', [(630, 151), (688, 157), (686, 213), (628, 207)], 'embroidery', 0.90),
        (TMP / 'yhly-red-ref.png', [(975, 178), (1035, 188), (1028, 246), (968, 234)], 'vinyl', 0.88),
        (TMP / 'yhly-red-ref.png', [(866, 515), (928, 508), (934, 569), (872, 575)], 'embroidery', 0.90),
    ],
)
compositor.compose(
    TMP / 'yhly-vehicle-base.png',
    Path('/home/ubuntu/your-home-like-you/public/brand/yhly-mockup-vehicle.png'),
    [(TMP / 'yhly-red-ref.png', [(610, 292), (715, 296), (711, 396), (606, 390)], 'vinyl', 0.88)],
)
compositor.compose(
    TMP / 'hadassah-packaging-base.png',
    Path('/home/ubuntu/hadassah-lifestyle/public/brand/hadassah-mockup-packaging.png'),
    [
        (TMP / 'hadassah-primary-ref.png', [(235, 220), (405, 220), (402, 279), (233, 279)], 'foil', 0.92),
        (TMP / 'hadassah-light-ref.png', [(685, 452), (914, 468), (905, 545), (680, 530)], 'foil', 0.92),
        (TMP / 'hadassah-symbol-ref.png', [(448, 602), (493, 606), (490, 650), (445, 646)], 'letterpress', 0.45),
        (TMP / 'hadassah-symbol-ref.png', [(758, 604), (813, 604), (813, 659), (758, 659)], 'letterpress', 0.42),
    ],
)
compositor.compose(
    TMP / 'hadassah-retail-base.png',
    Path('/home/ubuntu/hadassah-lifestyle/public/brand/hadassah-mockup-retail.png'),
    [
        (TMP / 'hadassah-light-ref.png', [(285, 505), (410, 507), (410, 553), (286, 551)], 'embroidery', 0.90),
        (TMP / 'hadassah-light-ref.png', [(540, 184), (925, 184), (920, 303), (538, 301)], 'signage', 0.94),
    ],
)
print('Rendered deterministic brand mockups from exact logo rasters.')
