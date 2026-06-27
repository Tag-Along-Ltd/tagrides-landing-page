'use client';

import { useState } from 'react';

import { LenisProvider } from '@/components/pitch/LenisProvider';
import { PitchShell } from '@/components/pitch/PitchShell';
import { Cover } from '@/components/pitch/sections/Cover';
import { Problem } from '@/components/pitch/sections/Problem';
import { LagosCost } from '@/components/pitch/sections/LagosCost';
import { Solution } from '@/components/pitch/sections/Solution';
import { Product } from '@/components/pitch/sections/Product';
import { Market } from '@/components/pitch/sections/Market';
import { BusinessModel } from '@/components/pitch/sections/BusinessModel';
import { Competitive } from '@/components/pitch/sections/Competitive';
import { Traction } from '@/components/pitch/sections/Traction';
import { Team } from '@/components/pitch/sections/Team';
import { Financials } from '@/components/pitch/sections/Financials';
import { Milestones } from '@/components/pitch/sections/Milestones';
import { Impact } from '@/components/pitch/sections/Impact';
import { Ask } from '@/components/pitch/sections/Ask';
import pitch from '@/data/pitch.json';

// Section registry — section keys map to React components. The
// page composes its content from the active audience's `sections`
// array. Adding a new section means adding it here + to pitch.json.
const SECTION_MAP = {
  cover:       Cover,
  problem:     Problem,
  // Customer audience uses a softer problem framing; for now alias to
  // Problem until the customer-specific variant lands in Phase 2.
  problemPersonal: Problem,
  lagosCost:   LagosCost,
  solution:    Solution,
  product:     Product,
  market:      Market,
  model:       BusinessModel,
  competitive: Competitive,
  traction:    Traction,
  team:        Team,
  financials:  Financials,
  milestones:  Milestones,
  impact:      Impact,
  ask:         Ask,
  // Customer-only stubs that won't fire on investor/judge audiences.
  // They reuse existing components for now so the page never breaks
  // when the customer audience is selected.
  modes:       Solution,
  safety:      Impact,
  pricingFair: BusinessModel,
  appCTA:      Ask,
};

export default function PitchPage() {
  const [audience, setAudience] = useState('investor');
  const audienceCfg = pitch.audiences[audience] ?? pitch.audiences.investor;

  return (
    <LenisProvider>
      <PitchShell audience={audience} onAudienceChange={setAudience}>
        {audienceCfg.sections.map((key) => {
          const Section = SECTION_MAP[key];
          if (!Section) return null;
          // Pass audience prop to Ask so its `use of funds` reflects the
          // selected audience's ask config.
          return <Section key={key} audience={audience} />;
        })}
      </PitchShell>
    </LenisProvider>
  );
}
