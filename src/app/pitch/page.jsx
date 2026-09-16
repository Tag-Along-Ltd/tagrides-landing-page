'use client';

import { useMemo, useState, useSyncExternalStore } from 'react';

import { LenisProvider } from '@/components/pitch/LenisProvider';
import { PitchShell } from '@/components/pitch/PitchShell';
import { Cover } from '@/components/pitch/sections/Cover';
import { Problem } from '@/components/pitch/sections/Problem';
import { LagosCost } from '@/components/pitch/sections/LagosCost';
import { Solution } from '@/components/pitch/sections/Solution';
import { Product } from '@/components/pitch/sections/Product';
import { Market } from '@/components/pitch/sections/Market';
import { BusinessModel } from '@/components/pitch/sections/BusinessModel';
import { GTM } from '@/components/pitch/sections/GTM';
import { Competitive } from '@/components/pitch/sections/Competitive';
import { Traction } from '@/components/pitch/sections/Traction';
import { Team } from '@/components/pitch/sections/Team';
import { Financials } from '@/components/pitch/sections/Financials';
import { Milestones } from '@/components/pitch/sections/Milestones';
import { Impact } from '@/components/pitch/sections/Impact';
import { Ask } from '@/components/pitch/sections/Ask';
import { Support } from '@/components/pitch/sections/Support';

// Customer-only narrative pieces
import { ProblemPersonal } from '@/components/pitch/sections/customer/ProblemPersonal';
import { HowItWorks } from '@/components/pitch/sections/customer/HowItWorks';
import { Modes } from '@/components/pitch/sections/customer/Modes';
import { SafetyCustomer } from '@/components/pitch/sections/customer/Safety';
import { PricingFair } from '@/components/pitch/sections/customer/PricingFair';
import { AppCTA } from '@/components/pitch/sections/customer/AppCTA';

import pitch from '@/data/pitch.json';

// Section registry — section keys map to React components. The active
// audience's `sections` array picks which ones render, in what order.
// Adding a new section: add a key here + add it to pitch.json + add it
// to one or more audience.sections arrays.
const SECTION_MAP = {
  cover: Cover,
  problem: Problem,
  lagosCost: LagosCost,
  solution: Solution,
  product: Product,
  market: Market,
  model: BusinessModel,
  gtm: GTM,
  competitive: Competitive,
  traction: Traction,
  team: Team,
  financials: Financials,
  milestones: Milestones,
  impact: Impact,
  ask: Ask,
  support: Support,
  // Customer-only
  problemPersonal: ProblemPersonal,
  howItWorks: HowItWorks,
  modes: Modes,
  safety: SafetyCustomer,
  pricingFair: PricingFair,
  appCTA: AppCTA,
};

const AUDIENCE_CHANGE_EVENT = 'pitch-audience-change';

function subscribeToAudience(callback) {
  window.addEventListener('popstate', callback);
  window.addEventListener(AUDIENCE_CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener('popstate', callback);
    window.removeEventListener(AUDIENCE_CHANGE_EVENT, callback);
  };
}

function getAudienceSnapshot() {
  const requestedAudience = new URLSearchParams(window.location.search).get('audience');
  return requestedAudience && pitch.audiences[requestedAudience] ? requestedAudience : 'investor';
}

export default function PitchPage() {
  const audience = useSyncExternalStore(subscribeToAudience, getAudienceSnapshot, () => 'investor');
  const [presentMode, setPresentMode] = useState(false);
  const audienceCfg = pitch.audiences[audience] ?? pitch.audiences.investor;
  const sectionKeys = useMemo(() => [...audienceCfg.sections, 'support'], [audienceCfg.sections]);

  function handleAudienceChange(nextAudience) {
    const url = new URL(window.location.href);
    if (nextAudience === 'investor') {
      url.searchParams.delete('audience');
    } else {
      url.searchParams.set('audience', nextAudience);
    }
    window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`);
    window.dispatchEvent(new Event(AUDIENCE_CHANGE_EVENT));
  }

  return (
    <LenisProvider paused={presentMode}>
      <PitchShell
        audience={audience}
        onAudienceChange={handleAudienceChange}
        presentMode={presentMode}
        onPresentToggle={setPresentMode}
        sectionKeys={sectionKeys}
      >
        {sectionKeys.map((key) => {
          const Section = SECTION_MAP[key];
          if (!Section) return null;
          return <Section key={key} audience={audience} />;
        })}
      </PitchShell>
    </LenisProvider>
  );
}
