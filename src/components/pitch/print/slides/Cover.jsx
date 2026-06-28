'use client';

import { Logo } from '@/components/brand/Logo';
import { Slide } from '../Slide';
import pitch from '@/data/pitch.json';

// Cover slide — Airbnb / Sequoia-style first impression. Brand mark
// centred at top, big title centred mid-page, presenter + version at
// bottom. Generous whitespace.
export function PrintCover({ page, total, audience }) {
  const d = pitch.cover;
  return (
    <Slide page={page} total={total} audience={audience} section="Cover">
      <div
        className="flex flex-1 flex-col items-center justify-center text-center"
        style={{ gap: '6mm' }}
      >
        <Logo size={64} variant="color" />

        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '8.5pt',
            letterSpacing: '0.32em',
            color: '#888',
            textTransform: 'uppercase',
            marginTop: '4mm',
          }}
        >
          {d.eyebrow}
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '46pt',
            fontWeight: 800,
            lineHeight: 1.02,
            letterSpacing: '-0.015em',
            color: '#E5E5E5',
            maxWidth: '230mm',
            margin: '4mm 0 0 0',
          }}
        >
          Their route.{' '}
          <span style={{ color: '#008080' }}>Your ride.</span>
        </h1>

        <p
          style={{
            fontSize: '12pt',
            lineHeight: 1.5,
            color: '#B3B3B3',
            maxWidth: '180mm',
            margin: '6mm 0 0 0',
          }}
        >
          {d.subtitle}
        </p>

        <div
          style={{
            marginTop: '14mm',
            fontFamily: 'var(--font-mono)',
            fontSize: '9pt',
            color: '#888',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
          }}
        >
          <div style={{ color: '#E5E5E5', fontWeight: 700, marginBottom: '1.5mm' }}>
            {d.presenter}
          </div>
          <div>{d.version}</div>
        </div>
      </div>
    </Slide>
  );
}
