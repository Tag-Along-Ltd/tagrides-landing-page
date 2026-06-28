'use client';

import { Slide, SlideHeading } from '../Slide';
import pitch from '@/data/pitch.json';

// Team — 3 portrait cards. Diamond-cropped photo + name + role + bio.
export function PrintTeam({ page, total, audience }) {
  const d = pitch.team;
  return (
    <Slide page={page} total={total} audience={audience} section="Team">
      <SlideHeading eyebrow={d.eyebrow} title={d.title} subtitle={d.subtitle} />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '8mm',
          flex: 1,
          alignItems: 'stretch',
        }}
      >
        {d.members.map((m) => {
          const isAdviser = m.role.toLowerCase().includes('adviser');
          return (
            <article
              key={m.name}
              style={{
                border: '1px solid #333',
                backgroundColor: isAdviser ? '#141414' : '#1A1A1A',
                borderRadius: '4mm',
                padding: '7mm',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              {/* Diamond photo */}
              <div
                style={{
                  width: '34mm',
                  height: '34mm',
                  transform: 'rotate(45deg)',
                  overflow: 'hidden',
                  borderRadius: '4mm',
                  border: '1px solid #444',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={m.image}
                  alt={m.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    transform: 'rotate(-45deg) scale(1.5)',
                    objectFit: 'cover',
                  }}
                />
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '13pt',
                  fontWeight: 700,
                  color: '#E5E5E5',
                  marginTop: '8mm',
                  marginBottom: '1.5mm',
                }}
              >
                {m.name}
              </h3>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '8pt',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: isAdviser ? '#F59E0B' : '#008080',
                  marginBottom: '3mm',
                }}
              >
                {m.role}
              </div>
              <p
                style={{
                  fontSize: '9pt',
                  lineHeight: 1.5,
                  color: '#B3B3B3',
                  margin: 0,
                }}
              >
                {m.bio}
              </p>
            </article>
          );
        })}
      </div>
    </Slide>
  );
}
