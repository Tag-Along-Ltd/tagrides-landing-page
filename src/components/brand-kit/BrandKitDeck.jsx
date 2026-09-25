'use client';

/* eslint-disable @next/next/no-img-element */
import { createContext, useContext } from 'react';
import Link from 'next/link';
import { Printer } from 'lucide-react';

import { Logo, Lockup } from '@/components/brand/Logo';
import { brandBusiness, brandDocuments, brandSlides } from '@/data/brandKit';

import styles from './brand-kit.module.css';

const mark = '/assets/brand/mark.svg';
const lockup = '/assets/brand/lockup-horizontal.svg';
const reverse = '/assets/brand/lockup-reverse.svg';
const qr = '/assets/brand/website-qr.svg';
const ActiveSlideContext = createContext(undefined);
const slideLabels = {
  cover: 'Overview',
  identity: 'Identity',
  rules: 'Rules',
  digital: 'Digital',
  uniforms: 'Uniforms',
  mobility: 'Vehicles',
  field: 'Field',
  documents: 'Documents',
  applications: 'Downloads',
  qr: 'QR',
  governance: 'Governance',
};

function Slide({ id, number, eyebrow, title, children, tone = 'dark', print = false }) {
  const activeSlide = useContext(ActiveSlideContext);
  if (activeSlide && activeSlide !== id) return null;

  return (
    <section
      className={`${styles.slide} ${styles[tone]} ${print ? styles.printSlide : ''}`}
      id={id}
    >
      <div className={styles.slideTop}>
        <Lockup size={26} variant={tone === 'light' ? 'color' : 'reverse'} />
        <span>
          {String(number).padStart(2, '0')} / {String(brandSlides.length).padStart(2, '0')}
        </span>
      </div>
      <div className={styles.slideBody}>
        <header className={styles.heading}>
          <p>{eyebrow}</p>
          <h1>{title}</h1>
        </header>
        {children}
      </div>
      <div className={styles.slideBottom}>
        <span>{brandBusiness.company}</span>
        {!print && (
          <Link className={styles.printOne} href={`/brand-kit/print?slide=${id}&auto=1`}>
            <Printer size={13} /> Print this slide
          </Link>
        )}
        <span>tagrider.com · Brand system 01 · 2026</span>
      </div>
    </section>
  );
}

function ApparelPhotoMockup() {
  return (
    <div className={`${styles.photoMockup} ${styles.apparelPhoto}`}>
      <img
        src="/assets/brand/mockup-apparel.png"
        alt="Photoreal black TagRides cap and polo mockup"
      />
      <span>Material-integrated embroidery proof · exact artwork supplied separately</span>
    </div>
  );
}

function VehiclePhotoMockup() {
  return (
    <div className={`${styles.photoMockup} ${styles.vehiclePhoto}`}>
      <img
        src="/assets/brand/mockup-vehicle.png"
        alt="Photoreal black sedan with TagRides door branding"
      />
      <span>Material-integrated vinyl proof · installer must use a measured vehicle template</span>
    </div>
  );
}

function DocumentMini({ document }) {
  return (
    <Link className={styles.documentMini} href={`/brand-kit/templates/${document.slug}`}>
      <div>
        <img src={mark} alt="" />
        <span>{document.title}</span>
      </div>
      <strong>{document.size}</strong>
      <small>{document.use}</small>
    </Link>
  );
}

export function BrandKitDeck({ print = false, slideKey }) {
  return (
    <ActiveSlideContext.Provider value={slideKey}>
      <main className={`${styles.deck} ${print ? styles.printDeck : ''}`}>
        {!print && (
          <header className={styles.chrome}>
            <Link href="/">
              <Lockup size={26} />
            </Link>
            <nav aria-label="Brand kit sections">
              {brandSlides.map((slide, index) => (
                <a href={`#${slide}`} key={slide}>
                  <span>{String(index + 1).padStart(2, '0')}</span> {slideLabels[slide]}
                </a>
              ))}
            </nav>
            <Link className={styles.download} href="/brand-kit/print?auto=1">
              Download deck
            </Link>
          </header>
        )}

        <Slide
          id="cover"
          number={1}
          eyebrow="Operational identity system"
          title="Built to move through the real world."
          print={print}
        >
          <div className={styles.coverGrid}>
            <div className={styles.coverMark}>
              <Logo size={290} />
            </div>
            <div className={styles.coverCopy}>
              <p>
                One verified system for product, people, vehicles, documents and field operations.
              </p>
              <strong>{brandBusiness.tagline}</strong>
            </div>
          </div>
        </Slide>

        <Slide
          id="identity"
          number={2}
          eyebrow="Core identity"
          title="Two routes. One trusted connection."
          tone="light"
          print={print}
        >
          <div className={styles.identityGrid}>
            <div className={styles.logoField}>
              <img src={lockup} alt="TagRides horizontal logo" />
            </div>
            <div className={`${styles.logoField} ${styles.logoFieldDark}`}>
              <img src={reverse} alt="TagRides reverse logo" />
            </div>
            <div className={styles.identityNotes}>
              <div>
                <span>Primary</span>
                <strong>#008080</strong>
                <small>Trust, movement, infrastructure</small>
              </div>
              <div>
                <span>Accent</span>
                <strong>#F59E0B</strong>
                <small>Arrival, energy, human warmth</small>
              </div>
              <div>
                <span>Base</span>
                <strong>#0A0A0A</strong>
                <small>Authority and contrast</small>
              </div>
            </div>
          </div>
        </Slide>

        <Slide
          id="rules"
          number={3}
          eyebrow="Logo discipline"
          title="Recognition comes from restraint."
          print={print}
        >
          <div className={styles.rulesGrid}>
            <div className={styles.clearspace}>
              <Logo size={250} />
              <i />
              <i />
              <i />
              <i />
            </div>
            <div className={styles.rulesList}>
              <p>
                <b>Clear space</b>
                <span>Keep one ring-stroke width around every side.</span>
              </p>
              <p>
                <b>Minimum size</b>
                <span>Mark: 24 px digital / 8 mm print. Lockup: 96 px / 32 mm.</span>
              </p>
              <p>
                <b>Do not</b>
                <span>
                  Stretch, recolour, outline, rotate, add shadows, or place over visual noise.
                </span>
              </p>
              <p>
                <b>Typography</b>
                <span>
                  Plus Jakarta Sans for display, Inter for body, JetBrains Mono for operational
                  data.
                </span>
              </p>
            </div>
          </div>
        </Slide>

        <Slide
          id="digital"
          number={4}
          eyebrow="Digital surfaces"
          title="One signal from app icon to social share."
          tone="light"
          print={print}
        >
          <div className={styles.digitalGrid}>
            <div className={styles.phone}>
              <div>
                <img src={mark} alt="" />
                <span>TagRides</span>
                <small>Their route. Your ride.</small>
              </div>
            </div>
            <div className={styles.social}>
              <img src="/assets/brand/og-image.png" alt="TagRides social sharing card" />
            </div>
            <div className={styles.appIcons}>
              <div>
                <img src={mark} alt="" />
              </div>
              <div className={styles.appDark}>
                <img src={reverse} alt="" />
              </div>
              <p>App icon · Social avatar · Favicon</p>
            </div>
          </div>
        </Slide>

        <Slide
          id="uniforms"
          number={5}
          eyebrow="People in the field"
          title="Visible, calm, unmistakably TagRides."
          print={print}
        >
          <ApparelPhotoMockup />
          <p className={styles.specNote}>
            Production: white/amber reverse mark on black only; 60 mm cap embroidery; 75 mm
            left-chest embroidery. Teal garments use the white mono mark; amber PPE uses black mono.
          </p>
        </Slide>

        <Slide
          id="mobility"
          number={6}
          eyebrow="Vehicle identity"
          title="Brand the service without disguising the car."
          tone="light"
          print={print}
        >
          <VehiclePhotoMockup />
        </Slide>

        <Slide
          id="field"
          number={7}
          eyebrow="Acquisition and wayfinding"
          title="Every touchpoint should explain the next action."
          print={print}
        >
          <div className={styles.fieldGrid}>
            <div className={styles.poster}>
              <img src={reverse} alt="" />
              <h2>Going your way.</h2>
              <p>Find a verified driver already heading toward your destination.</p>
              <img className={styles.posterQr} src={qr} alt="QR code linking to tagrider.com" />
              <small>SCAN TO VISIT TAGRIDER.COM</small>
            </div>
            <div className={styles.sign}>
              <img src={mark} alt="" />
              <strong>TagRides pickup point</strong>
              <span>Wait here only after your ride is confirmed.</span>
            </div>
            <div className={styles.windowSticker}>
              <Logo size={150} />
              <strong>Verified TagRides partner</strong>
              <small>Brand sticker is not proof of a live driver account. Verify in the app.</small>
            </div>
          </div>
        </Slide>

        <Slide
          id="documents"
          number={8}
          eyebrow="Operational documents"
          title="Correct sizes. Consistent data. Ready to issue."
          tone="light"
          print={print}
        >
          <div className={styles.documentGrid}>
            {brandDocuments
              .filter((document) => document.group === 'documents')
              .map((document) => (
                <DocumentMini document={document} key={document.slug} />
              ))}
          </div>
        </Slide>

        <Slide
          id="applications"
          number={9}
          eyebrow="Download library"
          title="Find the asset. Open it. Use it correctly."
          print={print}
        >
          <div className={styles.documentGrid}>
            {brandDocuments
              .filter((document) => document.group === 'applications')
              .map((document) => (
                <DocumentMini document={document} key={document.slug} />
              ))}
          </div>
        </Slide>

        <Slide
          id="qr"
          number={10}
          eyebrow="QR system"
          title="A scannable path, not a decorative square."
          print={print}
        >
          <div className={styles.qrGrid}>
            <div className={styles.qrCard}>
              <img src={qr} alt="QR code linking to https://tagrider.com" />
            </div>
            <div className={styles.qrRules}>
              <strong>Encodes</strong>
              <code>https://tagrider.com</code>
              <strong>Required quiet zone</strong>
              <span>Never crop the white margin around the code.</span>
              <strong>Minimum print size</strong>
              <span>25 × 25 mm on cards; 40 × 40 mm on posters.</span>
              <strong>Contrast</strong>
              <span>Dark code on solid white only. Never place directly over photography.</span>
            </div>
          </div>
        </Slide>

        <Slide
          id="governance"
          number={11}
          eyebrow="Brand governance"
          title="One source of truth. No invented company data."
          print={print}
        >
          <div className={styles.governance}>
            <div>
              <span>Canonical company</span>
              <strong>{brandBusiness.company}</strong>
            </div>
            <div>
              <span>Website</span>
              <strong>tagrider.com</strong>
            </div>
            <div>
              <span>General email</span>
              <strong>{brandBusiness.email}</strong>
            </div>
            <div>
              <span>Operations contact</span>
              <strong>{brandBusiness.operationsEmail}</strong>
            </div>
            <div>
              <span>Phone</span>
              <strong>{brandBusiness.phone}</strong>
            </div>
            <div>
              <span>Registered address</span>
              <strong>{brandBusiness.address}</strong>
            </div>
          </div>
          <p className={styles.governanceNote}>
            Bank, tax and registration identifiers are intentionally excluded until verified. Add
            them once in the canonical data source before issuing financial documents.
          </p>
        </Slide>
      </main>
    </ActiveSlideContext.Provider>
  );
}
