'use client';

import { Slide, SlideHeading } from '../Slide';
import pitch from '@/data/pitch.json';

// Problem — heading + 2 persona cards side-by-side. Each card carries
// name, role, location, 2 pain bullets (stripped from web's 3 for
// print density). Photo not embedded — too risky in print + adds
// visual noise. The persona role badge (RIDER / DRIVER) carries the
// archetype signal.
export function PrintProblem({ page, total, audience, watermark }) {
  const d = pitch.problem;
  return (
    <Slide page={page} total={total} audience={audience} watermark={watermark} section="Problem">
      <SlideHeading eyebrow={d.eyebrow} title={d.title} subtitle={d.subtitle} />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '10mm',
          flex: 1,
          alignItems: 'stretch',
        }}
      >
        {d.personas.slice(0, 2).map((p, i) => (
          <PersonaCard key={p.name} persona={p} kind={i === 0 ? 'rider' : 'driver'} />
        ))}
      </div>
    </Slide>
  );
}

function PersonaCard({ persona, kind }) {
  const accent = kind === 'rider' ? '#008080' : '#F59E0B';
  return (
    <article
      style={{
        border: `1px solid ${accent}40`,
        borderTop: `3px solid ${accent}`,
        borderRadius: '4mm',
        padding: '10mm 10mm 8mm 10mm',
        backgroundColor: 'rgba(26,26,26,0.8)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '8pt',
          letterSpacing: '0.24em',
          color: accent,
          textTransform: 'uppercase',
          marginBottom: '2mm',
        }}
      >
        {kind}
      </div>

      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '20pt',
          fontWeight: 700,
          lineHeight: 1.1,
          color: '#E5E5E5',
          margin: 0,
        }}
      >
        {persona.name}
      </h3>

      <div
        style={{
          fontSize: '11pt',
          color: '#B3B3B3',
          marginTop: '1.5mm',
        }}
      >
        {persona.role}
      </div>

      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '9pt',
          color: '#888',
          letterSpacing: '0.06em',
          marginTop: '1mm',
        }}
      >
        {persona.location}
      </div>

      {/* Divider — visual separator */}
      <div
        style={{
          marginTop: '7mm',
          height: '0.4mm',
          background: `linear-gradient(90deg, ${accent}, transparent)`,
          width: '40%',
        }}
      />

      <ul style={{ listStyle: 'none', padding: 0, margin: '7mm 0 0 0', display: 'flex', flexDirection: 'column', gap: '5mm', flex: 1 }}>
        {persona.pain.map((point, i) => (
          <li
            key={i}
            style={{
              display: 'flex',
              gap: '3mm',
              fontSize: '11pt',
              lineHeight: 1.5,
              color: '#D0D0D0',
            }}
          >
            <span
              style={{
                marginTop: '2mm',
                width: '1.5mm',
                height: '1.5mm',
                transform: 'rotate(45deg)',
                backgroundColor: accent,
                flexShrink: 0,
              }}
            />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
