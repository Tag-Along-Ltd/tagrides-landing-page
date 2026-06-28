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

// Per-audience slide ordering. Each entry maps to a slide component.
// Investor: standard 15-slide arc.
// Judge:    same as investor + Impact slide before close (ALX rubric).
// Customer: shorter sales-pitch arc.
const SLIDES_BY_AUDIENCE = {
  investor: [
    PrintCover,
    PrintProblem,
    PrintCost,
    PrintSolution,
    PrintProduct,
    PrintMarket,
    PrintModel,
    PrintGTM,
    PrintCompetitive,
    PrintDifferentiation,
    PrintTraction,
    PrintTeam,
    PrintFinancials,
    PrintMilestones,
    PrintAsk,
    PrintContact,
  ],
  judge: [
    PrintCover,
    PrintProblem,
    PrintCost,
    PrintSolution,
    PrintProduct,
    PrintMarket,
    PrintModel,
    PrintGTM,
    PrintCompetitive,
    PrintDifferentiation,
    PrintTeam,
    PrintFinancials,
    PrintMilestones,
    PrintTraction,
    PrintImpact,
    PrintAsk,
    PrintContact,
  ],
  // Customer's web narrative is light enough that for v1 we reuse the
  // investor's narrative-deck slides — the operator can request a
  // bespoke customer deck if needed. (Avoids shipping half-finished
  // customer slides.)
  customer: [
    PrintCover,
    PrintProblem,
    PrintSolution,
    PrintProduct,
    PrintCost,
    PrintTeam,
    PrintContact,
  ],
};

export function PrintDeck({ audience = 'investor' }) {
  const cfg = pitch.audiences[audience] ?? pitch.audiences.investor;
  const slides = SLIDES_BY_AUDIENCE[audience] ?? SLIDES_BY_AUDIENCE.investor;
  const total = slides.length;

  return (
    <div className="pitch-print-deck">
      {slides.map((Slide, i) => (
        <Slide key={i} page={i + 1} total={total} audience={cfg.label} />
      ))}
    </div>
  );
}
