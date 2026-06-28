'use client';

import { Slide, SlideHeading } from '../Slide';
import pitch from '@/data/pitch.json';

// Problem — heading + 2 persona cards side-by-side. Each card carries
// name, role, location, 2 pain bullets (stripped from web's 3 for
// print density). Photo not embedded — too risky in print + adds
// visual noise. The persona role badge (RIDER / DRIVER) carries the
// archetype signal.
export function PrintProblem({ page, total, audience }) {
  const d = pitch.problem;
  return (
    <Slide page={page} total={total} audience={audience} section="Problem">
      <SlideHeading eyebrow={d.eyebrow} title={d.title} subtitle={d.subtitle} />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '10mm',
          flex: 1,
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
        borderLeft: `3px solid ${accent}`,
        borderRadius: '4mm',
        padding: '7mm 8mm',
        backgroundColor: '#1A1A1A',
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
          fontSize: '18pt',
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
          fontSize: '10pt',
          color: '#B3B3B3',
          marginTop: '1mm',
        }}
      >
        {persona.role}
      </div>

      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '8.5pt',
          color: '#888',
          letterSpacing: '0.06em',
          marginTop: '1mm',
        }}
      >
        {persona.location}
      </div>

      <ul style={{ listStyle: 'none', padding: 0, margin: '6mm 0 0 0' }}>
        {persona.pain.slice(0, 2).map((point, i) => (
          <li
            key={i}
            style={{
              display: 'flex',
              gap: '3mm',
              fontSize: '10pt',
              lineHeight: 1.45,
              color: '#D0D0D0',
              marginBottom: '3mm',
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
