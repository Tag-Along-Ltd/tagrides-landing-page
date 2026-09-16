// Public business details supplied by the founder. Keep every support surface
// linked to this record so account information has one source of truth.
export const support = {
  accountName: 'TAG-ALONG LTD',
  accountNumber: '1026504831',
  bank: 'United Bank for Africa (UBA)',
  email: 'oniya.olaiya@tagrider.com',
  path: '/support',
  articlePath: '/blog/the-car-is-going-there-anyway',
};

export function supportEmail(subject, body = '') {
  const query = new URLSearchParams({ subject });
  if (body) query.set('body', body);
  return `mailto:${support.email}?${query.toString()}`;
}
