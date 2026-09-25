'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BrainCircuit,
  Clock3,
  ExternalLink,
  Expand,
  MapPin,
  Network,
  Route,
  Sparkles,
  StickyNote,
  X,
} from 'lucide-react';

import styles from './ai-poc.module.css';

const slides = [
  { id: 'empty-seat', label: 'The empty seat' },
  { id: 'before-after', label: 'Before and after' },
  { id: 'intelligence', label: 'Three layers' },
  { id: 'denver', label: 'Denver demo' },
  { id: 'pilot', label: 'Pilot' },
  { id: 'outcomes', label: 'SMART outcomes' },
  { id: 'architecture', label: 'AWS flywheel' },
  { id: 'investment', label: 'Spend to proof' },
  { id: 'ask', label: 'The ask' },
];

const notes = [
  'Joshua, you asked what measurable change we expect over 12 to 24 months and how that growth translates into AWS usage. The capacity already exists. We need intelligence to connect it.',
  'The AI does not dictate price. It removes the blank page and gives both people a realistic place to begin.',
  'Clustering understands space. Trip patterns understand time. Draft-offer intelligence turns both into an actionable decision.',
  'A static calculator prices the route. TagRides prices the reality surrounding the route.',
  'The July pilot establishes the manual-negotiation baseline. The six-month AI PoC then has explicit pass/fail gates for acceptance, price fit, speed and completed trips.',
  'These are working business-case targets. The baseline comes from the pilot, and the targets should be validated with SnapSoft and AWS.',
  'These services are likely components, not a locked architecture. We want SnapSoft to help choose the smallest credible PoC.',
  'The calculator turns the technical plan into a business case: about $2,400 per month and $28,650 over 12 months. Every spend lane has a corresponding proof point.',
  'We are not asking AWS to fund an abstract experiment. We are asking for help proving a mechanism that shortens negotiation and increases completed trips.',
];

export default function AiPocPage() {
  const [active, setActive] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const touchStart = useRef(null);

  const go = useCallback((index) => {
    setActive(Math.max(0, Math.min(slides.length - 1, index)));
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'ArrowRight' || event.key === 'PageDown') {
        setActive((value) => Math.min(slides.length - 1, value + 1));
      }
      if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
        setActive((value) => Math.max(0, value - 1));
      }
      if (event.key.toLowerCase() === 'n') setShowNotes((value) => !value);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const enterFullscreen = () => document.documentElement.requestFullscreen?.();

  return (
    <main
      className={styles.deck}
      onTouchStart={(event) => (touchStart.current = event.touches[0].clientX)}
      onTouchEnd={(event) => {
        if (touchStart.current === null) return;
        const delta = touchStart.current - event.changedTouches[0].clientX;
        if (Math.abs(delta) > 55) go(active + (delta > 0 ? 1 : -1));
        touchStart.current = null;
      }}
    >
      <header className={styles.header}>
        <Image
          src="/assets/brand/lockup-reverse.svg"
          width={144}
          height={36}
          alt="TagRides"
          priority
        />
        <div className={styles.headerTitle}>
          <span /> SNAPSOFT × AWS · AI POC
        </div>
        <div className={styles.headerActions}>
          <button onClick={() => setShowNotes((value) => !value)} aria-pressed={showNotes}>
            <StickyNote /> Notes
          </button>
          <button onClick={enterFullscreen} aria-label="Enter fullscreen">
            <Expand />
          </button>
        </div>
      </header>

      <div className={styles.viewport}>
        <div className={styles.track} style={{ transform: `translateX(-${active * 100}%)` }}>
          <EmptySeat />
          <BeforeAfter />
          <Intelligence />
          <Denver />
          <Pilot />
          <Outcomes />
          <Architecture />
          <Investment />
          <Ask />
        </div>
      </div>

      {showNotes && (
        <aside className={styles.notes}>
          <button onClick={() => setShowNotes(false)} aria-label="Close notes">
            <X />
          </button>
          <strong>Presenter note</strong>
          <p>{notes[active]}</p>
        </aside>
      )}

      <footer className={styles.footer}>
        <button className={styles.navButton} onClick={() => go(active - 1)} disabled={active === 0}>
          <ArrowLeft /> Previous
        </button>
        <div className={styles.progress} aria-label="Slide navigation">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              className={index === active ? styles.activeDot : ''}
              onClick={() => go(index)}
              aria-label={`Go to ${slide.label}`}
            />
          ))}
        </div>
        <span className={styles.counter}>
          {String(active + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </span>
        <button
          className={styles.navButton}
          onClick={() => go(active + 1)}
          disabled={active === slides.length - 1}
        >
          Next <ArrowRight />
        </button>
      </footer>
    </main>
  );
}

function Slide({ number, eyebrow, title, children, className = '' }) {
  return (
    <section className={`${styles.slide} ${className}`}>
      <div className={styles.slideInner}>
        <div className={styles.eyebrow}>
          <span>{number}</span>
          {eyebrow}
        </div>
        <h1>{title}</h1>
        {children}
      </div>
    </section>
  );
}

function Card({ icon, title, children, tone = '' }) {
  return (
    <article className={`${styles.card} ${tone ? styles[tone] : ''}`}>
      <div className={styles.cardIcon}>{icon}</div>
      <h3>{title}</h3>
      <div>{children}</div>
    </article>
  );
}

function EmptySeat() {
  return (
    <Slide
      number="01"
      eyebrow="THE OPPORTUNITY"
      title={
        <>
          What if every empty seat <em>knew who needed it?</em>
        </>
      }
    >
      <div className={styles.heroGrid}>
        <div className={styles.heroCopy}>
          <p className={styles.lead}>
            Every day, drivers move through cities with unused seats while riders struggle with
            unaffordable transportation.
          </p>
          <p>TagRides connects these two realities through regulated casual carpooling.</p>
          <div className={styles.thesis}>
            <Sparkles />
            <span>
              The capacity already exists.<strong> Intelligence makes the connection.</strong>
            </span>
          </div>
        </div>
        <DenverMap hero />
      </div>
    </Slide>
  );
}

function BeforeAfter() {
  const before = [
    'Rider proposes a price',
    'Driver reviews',
    'Accepts or counters',
    'Rider responds',
    'Possible abandonment',
  ];
  const after = [
    'AI studies current conditions',
    'Generates a draft offer',
    'Rider accepts or adjusts',
    'Driver receives a realistic offer',
    'Faster agreement',
  ];
  return (
    <Slide
      number="02"
      eyebrow="REMOVE THE BLANK PAGE"
      title={
        <>
          From negotiation friction to an <em>intelligent starting point</em>
        </>
      }
    >
      <div className={styles.splitFlow}>
        <Flow
          title="Before"
          items={before}
          tone="before"
          footer="Slow · uncertain · hard to scale"
        />
        <div className={styles.flowArrow}>
          <ArrowRight />
        </div>
        <Flow
          title="With TagRides AI"
          items={after}
          tone="after"
          footer="Faster · realistic · more completions"
        />
      </div>
      <div className={styles.choice}>
        <BrainCircuit />
        <span>
          <strong>The AI recommends a starting point.</strong> It does not remove user choice.
        </span>
      </div>
    </Slide>
  );
}

function Flow({ title, items, tone, footer }) {
  return (
    <article className={`${styles.flow} ${styles[tone]}`}>
      <h2>{title}</h2>
      <ol>
        {items.map((item, index) => (
          <li key={item}>
            <span>{index + 1}</span>
            {item}
          </li>
        ))}
      </ol>
      <p>{footer}</p>
    </article>
  );
}

function Intelligence() {
  return (
    <Slide
      number="03"
      eyebrow="THE INTELLIGENCE LAYER"
      title={
        <>
          One system. <em>Three connected decisions.</em>
        </>
      }
    >
      <div className={styles.threeCol}>
        <Card icon={<Network />} title="1. Movement clustering">
          <strong>Who can travel together now?</strong>
          <ul>
            <li>Overlapping routes and pickup corridors</li>
            <li>Available seats and nearby demand</li>
            <li>Multi-leg journeys with fewer detours</li>
          </ul>
          <div className={styles.routeFormula}>
            A → C <span>+</span> C → E <b>= A → E</b>
          </div>
        </Card>
        <Card icon={<Clock3 />} title="2. Time-aware patterns">
          <strong>When will the opportunity repeat?</strong>
          <ul>
            <li>Commute and weekday patterns</li>
            <li>Recurring pickup corridors</li>
            <li>Traffic, events and weather</li>
            <li>Predicted seat availability</li>
          </ul>
        </Card>
        <Card icon={<BrainCircuit />} title="3. Draft-offer intelligence">
          <strong>What starting offer is likely to work?</strong>
          <ul>
            <li>Distance, time, detour and legs</li>
            <li>Traffic and current demand</li>
            <li>Historical accepted prices</li>
            <li>Rider affordability + driver value</li>
          </ul>
        </Card>
      </div>
      <div className={styles.logicLine}>
        <span>SPACE</span>
        <i /> <span>TIME</span>
        <i /> <strong>ACTIONABLE OFFER</strong>
      </div>
    </Slide>
  );
}

const scenarios = {
  midday: {
    label: 'Normal midday',
    price: '12.80',
    detail: 'Moderate traffic · Normal demand · Flexible arrival',
    rows: [
      ['Route baseline', '$9.20'],
      ['Time and traffic', '+$1.80'],
      ['Driver detour', '+$1.20'],
      ['Demand condition', '+$1.10'],
      ['Shared-seat efficiency', '−$0.50'],
    ],
  },
  rush: {
    label: 'Morning rush',
    price: '15.40',
    detail: 'Increased traffic · High commuter demand · Fewer seats',
    rows: [
      ['Route baseline', '$9.20'],
      ['Time and traffic', '+$3.20'],
      ['Driver detour', '+$1.40'],
      ['Demand condition', '+$2.10'],
      ['Shared-seat efficiency', '−$0.50'],
    ],
  },
  event: {
    label: 'Major event',
    price: '17.20',
    detail: 'Event ending · Concentrated demand · Traffic disruption',
    rows: [
      ['Route baseline', '$9.20'],
      ['Time and traffic', '+$3.70'],
      ['Driver detour', '+$1.50'],
      ['Demand condition', '+$3.30'],
      ['Shared-seat efficiency', '−$0.50'],
    ],
  },
};

function Denver() {
  const [scenario, setScenario] = useState('midday');
  const current = scenarios[scenario];
  return (
    <Slide
      number="04"
      eyebrow="DENVER ROUTE DEMONSTRATION"
      title={
        <>
          The route is static. <em>Reality is not.</em>
        </>
      }
    >
      <div className={styles.demoGrid}>
        <div>
          <DenverMap />
          <div className={styles.legend}>
            <span>Rider · Union Station → DTC</span>
            <span>Driver 1 · RiNo → Cherry Creek</span>
            <span>Driver 2 · Cherry Creek → DTC</span>
          </div>
        </div>
        <div className={styles.offerPanel}>
          <div className={styles.tabs}>
            {Object.entries(scenarios).map(([key, value]) => (
              <button
                key={key}
                className={scenario === key ? styles.selected : ''}
                onClick={() => setScenario(key)}
              >
                {value.label}
              </button>
            ))}
          </div>
          <p className={styles.condition}>{current.detail}</p>
          <div className={styles.breakdown}>
            {current.rows.map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                <b>{value}</b>
              </div>
            ))}
          </div>
          <div className={styles.total}>
            <span>
              AI draft offer<small>Illustrative PoC example</small>
            </span>
            <strong>${current.price}</strong>
          </div>
        </div>
      </div>
    </Slide>
  );
}

function Pilot() {
  const measures = [
    ['≥50%', 'accepted without a counteroffer'],
    ['≥75%', 'within ±15% of final agreed price'],
    ['−20%', 'median time to agreement'],
    ['+10%', 'completed requests vs. manual baseline'],
    ['<2 sec', 'p95 pricing response time'],
  ];
  return (
    <Slide
      number="05"
      eyebrow="CONTROLLED LAGOS PILOT · JULY 20, 2026"
      title={
        <>
          Start controlled. Learn quickly. <em>Prove what matters.</em>
        </>
      }
    >
      <div className={styles.pilotGrid}>
        <article className={styles.pilotStart}>
          <div className={styles.bigNumber}>
            50<small>approx. pilot users</small>
          </div>
          <div className={styles.driverNumber}>
            1–5 <span>drivers</span>
          </div>
          <ul>
            <li>Controlled negotiation testing</li>
            <li>Real trip and pricing observations</li>
            <li>Contribute-page data</li>
            <li>Privacy-compliant analytics</li>
          </ul>
        </article>
        <article className={styles.measure}>
          <h2>Proposed six-month PoC gates</h2>
          <p>The July pilot establishes the baseline. The AI passes only if behavior improves.</p>
          <div className={styles.measureGrid}>
            {measures.map(([target, measure]) => (
              <div key={measure}>
                <span>{target}</span>
                {measure}
              </div>
            ))}
          </div>
          <p className={styles.measureFoot}>
            Guardrails: rider “reasonable price” rating, driver “worthwhile trip” rating, feature
            freshness, fairness by corridor, and AWS cost per recommendation.
          </p>
        </article>
      </div>
    </Slide>
  );
}

function Outcomes() {
  const rows = [
    ['Monthly active riders', '50', '10,000', '100,000'],
    ['Active drivers', '1–5', '500', '5,000'],
    ['Monthly trip requests', '250+', '25,000', '300,000'],
    ['First-offer acceptance', 'Baseline', '60%', '70%'],
    ['Within 10% of final', 'Baseline', '80%', '90%'],
    ['Trip completion lift', 'Baseline', '+15%', '+25%'],
    ['Response time', '<3 sec', '<2 sec', '<1.5 sec'],
  ];
  return (
    <Slide
      number="06"
      eyebrow="12–24 MONTH SMART OUTCOMES"
      title={
        <>
          From pilot baseline to <em>measurable proof.</em>
        </>
      }
    >
      <div className={styles.assumption}>
        WORKING BUSINESS-CASE TARGETS <span>To be validated with SnapSoft and AWS</span>
      </div>
      <div className={styles.scorecard}>
        <div className={styles.scoreHead}>
          <span>Measure</span>
          <b>Pilot</b>
          <b>Jul 2027</b>
          <b>Jul 2028</b>
        </div>
        {rows.map((row) => (
          <div className={styles.scoreRow} key={row[0]}>
            {row.map((cell, index) =>
              index === 0 ? <span key={cell}>{cell}</span> : <b key={cell + index}>{cell}</b>,
            )}
          </div>
        ))}
      </div>
      <div className={styles.outcomeFoot}>
        <span>
          <strong>12 months</strong> 10K riders · 25K requests · +15% completion
        </span>
        <span>
          <strong>24 months</strong> 100K riders · 300K requests · +25% completion
        </span>
      </div>
    </Slide>
  );
}

function Architecture() {
  const tech = [
    'Amazon S3',
    'AWS Glue',
    'Amazon Athena',
    'SageMaker',
    'SageMaker endpoints',
    'Amazon Bedrock',
    'CloudWatch + X-Ray',
  ];
  return (
    <Slide
      number="07"
      eyebrow="AWS DATA FLYWHEEL"
      title={
        <>
          Build the intelligence once. <em>Prepare it for every city.</em>
        </>
      }
    >
      <div className={styles.flywheel}>
        <div className={styles.dataInputs}>
          <span>Contribution data</span>
          <span>Pilot trips</span>
          <span>Offers + counters</span>
          <span>Completed journeys</span>
        </div>
        <ArrowRight />
        <div className={styles.awsCore}>
          <strong>AWS</strong>
          <span>Secure data pipeline</span>
        </div>
        <ArrowRight />
        <div className={styles.learning}>
          <span>Cluster + learn patterns</span>
          <span>Draft recommendation</span>
          <span>User outcome</span>
          <b>Better next offer ↻</b>
        </div>
      </div>
      <div className={styles.archGrid}>
        <Card icon={<Route />} title="Likely workloads">
          <p>
            Event archive · training-set preparation · model training and evaluation · real-time
            inference · batch scoring · quality, latency and cost observability
          </p>
        </Card>
        <article className={styles.tech}>
          <h3>Calculator-backed AI building blocks</h3>
          <div>
            {tech.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <small>
            AI workload only. Existing platform operations remain outside this credit ask.
          </small>
        </article>
      </div>
      <a
        className={styles.architectureLink}
        href="https://gist.github.com/OlaiyaO/89624b911225cd473f6e5ce16e68b32d"
        target="_blank"
        rel="noreferrer"
      >
        Review full architecture + Bhavin&apos;s questions <ExternalLink />
      </a>
    </Slide>
  );
}

function Investment() {
  const lanes = [
    [
      'Train + compare models',
      'SageMaker training and notebooks',
      'Better acceptance and price-fit',
    ],
    [
      'Serve decisions in real time',
      'SageMaker inference + batch evaluation',
      'Draft offer in under 2 seconds',
    ],
    ['Build trustworthy training data', 'S3, Glue and Athena', 'Fresh, reproducible features'],
    [
      'Observe + explain outcomes',
      'CloudWatch, X-Ray and Bedrock',
      'Quality, drift and cost visibility',
    ],
  ];

  return (
    <Slide
      number="08"
      eyebrow="FROM AWS SPEND TO MEASURABLE PROOF"
      title={
        <>
          Every dollar funds a <em>testable outcome.</em>
        </>
      }
    >
      <div className={styles.investmentSummary}>
        <span>
          Monthly AI workload<strong>~$2,400</strong>
        </span>
        <span>
          12-month calculator projection<strong>~$28,650</strong>
        </span>
        <span className={styles.askAmount}>
          Credit request<strong>$30,000</strong>
        </span>
      </div>
      <div className={styles.spendLanes}>
        <div className={styles.spendHead}>
          <span>What we fund</span>
          <span>What runs on AWS</span>
          <span>What we measure</span>
        </div>
        {lanes.map(([purpose, workload, proof]) => (
          <div className={styles.spendRow} key={purpose}>
            <strong>{purpose}</strong>
            <span>{workload}</span>
            <b>{proof}</b>
          </div>
        ))}
      </div>
      <div className={styles.projectionNote}>
        <strong>Year 1 is calculator-backed.</strong> Year 2 is re-sized from observed trip volume,
        endpoint utilization and retraining cadence; the current planning range is $4K–$6K/month,
        subject to SnapSoft/AWS validation.
      </div>
      <div className={styles.fundingPhases}>
        <span>
          <b>Months 0–3</b>Baseline + data pipeline
        </span>
        <ArrowRight />
        <span>
          <b>Months 4–6</b>Shadow inference + PoC gates
        </span>
        <ArrowRight />
        <span>
          <b>Months 7–12</b>Controlled rollout + retraining
        </span>
      </div>
    </Slide>
  );
}

function Ask() {
  const asks = [
    'Validate the AI PoC architecture',
    'Define training + production data pipelines',
    'Size 12- and 24-month AWS consumption',
    'Identify the right AWS funding program',
    'Agree measurable PoC acceptance criteria',
    'Start in Lagos, design for more cities',
  ];
  return (
    <Slide
      number="09"
      eyebrow="THE SNAPSOFT × AWS ASK"
      title={
        <>
          Help us prove a <em>measurable business mechanism.</em>
        </>
      }
    >
      <div className={styles.askGrid}>
        <div>
          <div className={styles.credit}>
            <span>
              Calculator / month<strong>~$2,400</strong>
            </span>
            <span>
              12-month projection<strong>~$28,650</strong>
            </span>
          </div>
          <div className={styles.finalAsk}>
            $30,000 <span>AI credits requested</span>
          </div>
          <div className={styles.sourceLinks}>
            <a
              href="https://calculator.aws/#/estimate?id=3fb48a832db910c836bada001260decae4dd33b1"
              target="_blank"
              rel="noreferrer"
            >
              AI PoC calculator <ExternalLink />
            </a>
            <a
              href="https://gist.github.com/OlaiyaO/89624b911225cd473f6e5ce16e68b32d"
              target="_blank"
              rel="noreferrer"
            >
              Architecture review <ExternalLink />
            </a>
          </div>
          <p className={styles.noSpend}>
            The request matches the calculator&apos;s 12-month projection, with ~$1,350 headroom for
            controlled iteration. It excludes ordinary platform hosting.
          </p>
          <div className={styles.growth}>
            <span>
              <b>50</b>Pilot users
            </span>
            <ArrowRight />
            <span>
              <b>10K</b>12-month riders
            </span>
            <ArrowRight />
            <span>
              <b>100K</b>24-month riders
            </span>
          </div>
        </div>
        <div className={styles.askList}>
          {asks.map((ask, index) => (
            <div key={ask}>
              <span>{index + 1}</span>
              {ask}
            </div>
          ))}
        </div>
      </div>
      <blockquote>
        The transportation capacity already exists.{' '}
        <em>TagRides makes it visible, predictable, and affordable.</em>
      </blockquote>
    </Slide>
  );
}

function DenverMap({ hero = false }) {
  return (
    <div className={`${styles.map} ${hero ? styles.heroMap : ''}`}>
      <svg viewBox="0 0 720 430" role="img" aria-label="Stylized Denver route map">
        <defs>
          <pattern
            id={hero ? 'gridHero' : 'gridDemo'}
            width="44"
            height="44"
            patternUnits="userSpaceOnUse"
          >
            <path d="M 44 0 L 0 0 0 44" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
          <filter id="glow">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <rect
          width="720"
          height="430"
          fill={`url(#${hero ? 'gridHero' : 'gridDemo'})`}
          className={styles.mapGrid}
        />
        <path d="M74 84 C200 112 214 205 336 214 S518 270 646 360" className={styles.riderRoute} />
        <path d="M272 62 C303 120 311 174 336 214" className={styles.driverOne} />
        <path d="M336 214 C430 250 526 304 646 360" className={styles.driverTwo} />
        <g className={styles.mapPoint}>
          <circle cx="74" cy="84" r="9" />
          <text x="92" y="80">
            Union Station
          </text>
          <text x="92" y="98" className={styles.mapSub}>
            RIDER START
          </text>
        </g>
        <g className={styles.mapPoint}>
          <circle cx="272" cy="62" r="8" />
          <text x="290" y="58">
            RiNo
          </text>
          <text x="290" y="76" className={styles.mapSub}>
            DRIVER 1
          </text>
        </g>
        <g className={styles.mapPoint}>
          <circle cx="336" cy="214" r="12" />
          <circle cx="336" cy="214" r="22" className={styles.pulse} />
          <text x="356" y="210">
            Cherry Creek
          </text>
          <text x="356" y="228" className={styles.mapSub}>
            CONNECTION CLUSTER
          </text>
        </g>
        <g className={styles.mapPoint}>
          <circle cx="646" cy="360" r="9" />
          <text x="465" y="382">
            Denver Tech Center
          </text>
        </g>
        {hero && (
          <g className={styles.seats}>
            <rect x="414" y="106" rx="12" width="148" height="54" />
            <text x="432" y="128">
              DRIVER NEARBY
            </text>
            <text x="432" y="148">
              ● ● ● 3 seats
            </text>
          </g>
        )}
        <text x="72" y="350" className={styles.denverLabel}>
          DENVER
        </text>
      </svg>
    </div>
  );
}
