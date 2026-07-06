const apiBase = (process.env.NEXT_PUBLIC_LANDING_API_BASE_URL || '').replace(/\/$/, '');

export function landingApiPath(path) {
  if (!path.startsWith('/')) {
    throw new Error('landingApiPath requires an absolute path');
  }
  return `${apiBase}${path}`;
}
