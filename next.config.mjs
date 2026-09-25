const hostingTarget = process.env.TAGRIDES_HOSTING_TARGET || 'node';
const isStaticHost = hostingTarget === 'cloudflare-pages';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Isolate local verification builds from a currently running site build.
  distDir:
    process.env.TAGRIDES_BUILD_DIR ||
    (process.env.TAGRIDES_HELP_REVIEW === '1' ? '.next-help-review' : '.next'),
  ...(isStaticHost
    ? {
        output: 'export',
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;
