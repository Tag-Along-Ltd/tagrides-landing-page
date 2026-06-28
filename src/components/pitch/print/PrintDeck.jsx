'use client';

import { PrintCover } from './slides/Cover';
import { PrintProblem } from './slides/Problem';
import { PrintCost } from './slides/Cost';
import { PrintSolution } from './slides/Solution';
import { PrintProduct } from './slides/Product';
import { PrintMarket } from './slides/Market';
import { PrintModel } from './slides/Model';
import { PrintGTM } from './slides/GTM';
import { PrintCompetitive } from './slides/Competitive';
import { PrintDifferentiation } from './slides/Differentiation';
import { PrintTraction } from './slides/Traction';
import { PrintTeam } from './slides/Team';
import { PrintFinancials } from './slides/Financials';
import { PrintMilestones } from './slides/Milestones';
import { PrintImpact } from './slides/Impact';
import { PrintAsk } from './slides/Ask';
import { PrintContact } from './slides/Contact';

import pitch from '@/data/pitch.json';

// Watermark assignments per slide. Cycles through positions
// (br → bl → tr → tl → br...) with content-aware overrides so the deck
// reads as a designed system, not a stamped repeat. Slides with strong
// visual identity (Cover, Market with its Africa map, Contact's centered
// brand mark) opt out of the watermark entirely.
const SLIDE_DEFS = {
  investor: [
    { c: PrintCover,          wm: 'none' },
    { c: PrintProblem,        wm: 'mark-br' },
    { c: PrintCost,           wm: 'diamonds' },
    { c: PrintSolution,       wm: 'mark-bl' },
    { c: PrintProduct,        wm: 'mark-tr' },
    { c: PrintMarket,         wm: 'none' },
    { c: PrintModel,          wm: 'word-diag' },
    { c: PrintGTM,            wm: 'mark-tl' },
    { c: PrintCompetitive,    wm: 'diamonds' },
    { c: PrintDifferentiation,wm: 'mark-br' },
    { c: PrintTraction,       wm: 'mark-bl' },
    { c: PrintTeam,           wm: 'mark-tr' },
    { c: PrintFinancials,     wm: 'word-diag' },
    { c: PrintMilestones,     wm: 'mark-tl' },
    { c: PrintAsk,            wm: 'mark-br' },
    { c: PrintContact,        wm: 'none' },
  ],
  judge: [
    { c: PrintCover,          wm: 'none' },
    { c: PrintProblem,        wm: 'mark-br' },
    { c: PrintCost,           wm: 'diamonds' },
    { c: PrintSolution,       wm: 'mark-bl' },
    { c: PrintProduct,        wm: 'mark-tr' },
    { c: PrintMarket,         wm: 'none' },
    { c: PrintModel,          wm: 'word-diag' },
    { c: PrintGTM,            wm: 'mark-tl' },
    { c: PrintCompetitive,    wm: 'diamonds' },
    { c: PrintDifferentiation,wm: 'mark-br' },
    { c: PrintTeam,           wm: 'mark-tr' },
    { c: PrintFinancials,     wm: 'word-diag' },
    { c: PrintMilestones,     wm: 'mark-tl' },
    { c: PrintTraction,       wm: 'mark-bl' },
    { c: PrintImpact,         wm: 'mark-br' },
    { c: PrintAsk,            wm: 'diamonds' },
    { c: PrintContact,        wm: 'none' },
  ],
  // Customer's web narrative is light — reusing investor slides for
  // v1; the operator can request a bespoke customer deck if needed.
  customer: [
    { c: PrintCover,    wm: 'none' },
    { c: PrintProblem,  wm: 'mark-br' },
    { c: PrintSolution, wm: 'mark-bl' },
    { c: PrintProduct,  wm: 'mark-tr' },
    { c: PrintCost,     wm: 'diamonds' },
    { c: PrintTeam,     wm: 'mark-tl' },
    { c: PrintContact,  wm: 'none' },
  ],
};

export function PrintDeck({ audience = 'investor' }) {
  const cfg = pitch.audiences[audience] ?? pitch.audiences.investor;
  const slides = SLIDE_DEFS[audience] ?? SLIDE_DEFS.investor;
  const total = slides.length;

  return (
    <div className="pitch-print-deck">
      {slides.map(({ c: SlideComponent, wm }, i) => (
        <SlideComponent
          key={i}
          page={i + 1}
          total={total}
          audience={cfg.label}
          watermark={wm}
        />
      ))}
    </div>
  );
}
