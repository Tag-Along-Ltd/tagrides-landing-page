'use client';

import { Slide } from '../Slide';
import { Logo } from '@/components/brand/Logo';
import pitch from '@/data/pitch.json';

// Contact — the closing slide. Centered: thank-you, brand mark, contact
// card. Mirrors the cover for compositional bookend.
export function PrintContact({ page, total, audience }) {
  const d = pitch.ask.contact;
  return (
    <Slide page={page} total={total} audience={audience} section="Contact">
      <div className="flex flex-1 flex-col items-center justify-center text-center" style={{ gap: '6mm' }}>
        <Logo size={48} variant="color" />

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
          Thank you
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '38pt',
            fontWeight: 800,
            lineHeight: 1.05,
            color: '#E5E5E5',
            margin: '4mm 0',
            letterSpacing: '-0.01em',
          }}
        >
          Let's build the Lagos commute that Lagos deserves.
        </h1>

        {/* Contact card */}
        <div
          style={{
            marginTop: '8mm',
            border: '1px solid #008080',
            backgroundColor: 'rgba(0,128,128,0.08)',
            borderRadius: '6mm',
            padding: '10mm 14mm',
            display: 'flex',
            flexDirection: 'column',
            gap: '4mm',
            minWidth: '160mm',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '18pt',
              fontWeight: 700,
              color: '#E5E5E5',
            }}
          >
            {d.name}
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9pt', letterSpacing: '0.12em', color: '#F59E0B', textTransform: 'uppercase' }}>
            {d.role}
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '6mm',
              marginTop: '4mm',
              textAlign: 'left',
            }}
          >
            <ContactItem label="Email" value={d.email} />
            <ContactItem label="Phone" value={d.phone} />
            <ContactItem label="Web"   value={d.site.replace(/^https?:\/\//, '')} />
          </div>
        </div>
      </div>
    </Slide>
  );
}

function ContactItem({ label, value }) {
  return (
    <div>
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '7pt',
          letterSpacing: '0.2em',
          color: '#888',
          textTransform: 'uppercase',
          marginBottom: '1.5mm',
        }}
      >
        {label}
      </div>
      <div style={{ fontSize: '10pt', fontWeight: 600, color: '#E5E5E5', wordBreak: 'break-all' }}>
        {value}
      </div>
    </div>
  );
}
