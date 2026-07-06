const hostingTarget = process.env.TAGRIDES_HOSTING_TARGET || 'node';
const isStaticHost = hostingTarget === 'cloudflare-pages';

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(isStaticHost
    ? {
        output: 'export',
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;
