'use client';

import { useSyncExternalStore } from 'react';

const formatter = new Intl.DateTimeFormat('en-NG', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'Africa/Lagos',
});

export function CurrentDate() {
  const date = useSyncExternalStore(
    () => () => {},
    () => formatter.format(new Date()),
    () => '',
  );

  return <span className="current-document-date">{date || '________________'}</span>;
}
