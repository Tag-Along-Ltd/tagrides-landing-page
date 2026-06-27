'use client';

import { motion } from 'motion/react';
import { Mail, Phone, Globe, ArrowUpRight } from 'lucide-react';

import { PitchSection } from '../motion/Section';
import pitch from '@/data/pitch.json';

// Ask — the close. Teal background to break visual rhythm and signal
// "this is the moment". Big number, use-of-funds pie via inline %
// bars, contact card on the right.
export function Ask({ audience = 'investor' }) {
  const data = pitch.ask;
  const audienceCfg = pitch.audiences[audience] ?? pitch.audiences.investor;
  const ask = audienceCfg.ask ?? pitch.audiences.investor.ask;

  return (
    <PitchSection id="ask" tone="primary" className="text-primary-foreground">
      <div className="grid gap-16 md:grid-cols-[1.4fr_1fr] md:gap-24">
        {/* Headline + use of funds */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="font-mono text-xs tracking-[0.24em] text-primary-foreground/80 md:text-sm"
          >
            {data.eyebrow}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 font-display text-4xl leading-[1.05] font-extrabold md:text-6xl lg:text-7xl"
          >
            {data.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-primary-foreground/85 md:text-lg"
          >
            {data.subtitle}
          </motion.p>

          {/* Ask snapshot */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 grid grid-cols-3 gap-4 rounded-2xl bg-background/15 p-6 ring-1 ring-primary-foreground/15 backdrop-blur md:gap-6"
          >
            <div>
              <div className="font-mono text-[10px] tracking-[0.2em] text-primary-foreground/70 md:text-xs">
                ROUND
              </div>
              <div className="mt-2 font-display text-lg font-bold md:text-2xl">{ask.stage}</div>
            </div>
            <div>
              <div className="font-mono text-[10px] tracking-[0.2em] text-primary-foreground/70 md:text-xs">
                ASK
              </div>
              <div className="mt-2 font-display text-lg font-bold md:text-2xl">
                ${(ask.amount / 1000).toFixed(0)}K
              </div>
            </div>
            <div>
              <div className="font-mono text-[10px] tracking-[0.2em] text-primary-foreground/70 md:text-xs">
                RUNWAY
              </div>
              <div className="mt-2 font-display text-lg font-bold md:text-2xl">{ask.runway}</div>
            </div>
          </motion.div>

          {/* Use of funds */}
          <div className="mt-12 md:mt-16">
            <div className="font-mono text-xs tracking-[0.24em] text-primary-foreground/80 md:text-sm">
              USE OF FUNDS
            </div>
            <div className="mt-6 space-y-4">
              {ask.use.map((u, i) => (
                <motion.div
                  key={u.label}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.08 }}
                >
                  <div className="flex items-baseline justify-between">
                    <span className="font-display text-sm font-bold md:text-base">{u.label}</span>
                    <span className="font-mono text-sm tabular-nums md:text-base">{u.pct}%</span>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-background/20">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${u.pct}%` }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.9, delay: 0.6 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full bg-accent"
                    />
                  </div>
                  {u.detail && (
                    <div className="mt-1.5 text-xs leading-relaxed text-primary-foreground/70 md:text-sm">
                      {u.detail}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact */}
        <motion.aside
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="rounded-3xl bg-background/15 p-8 ring-1 ring-primary-foreground/15 backdrop-blur md:p-10"
        >
          <div className="font-mono text-xs tracking-[0.24em] text-primary-foreground/80 md:text-sm">
            TALK TO US
          </div>
          <div className="mt-4 font-display text-2xl font-bold md:text-3xl">{data.contact.name}</div>
          <div className="mt-1 text-sm text-primary-foreground/80 md:text-base">
            {data.contact.role}
          </div>

          <div className="mt-8 space-y-4">
            <ContactRow
              icon={Mail}
              label="Email"
              value={data.contact.email}
              href={`mailto:${data.contact.email}`}
            />
            <ContactRow
              icon={Phone}
              label="Phone"
              value={data.contact.phone}
              href={`tel:${data.contact.phone.replace(/\s/g, '')}`}
            />
            <ContactRow
              icon={Globe}
              label="Website"
              value={data.contact.site.replace(/^https?:\/\//, '')}
              href={data.contact.site}
              external
            />
          </div>
        </motion.aside>
      </div>
    </PitchSection>
  );
}

function ContactRow({ icon: Icon, label, value, href, external = false }) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="group flex items-center gap-4 rounded-xl border border-primary-foreground/15 bg-background/10 p-4 transition hover:bg-background/20"
    >
      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-foreground/15">
        <Icon className="size-5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="font-mono text-[10px] tracking-[0.2em] text-primary-foreground/70 md:text-xs">
          {label.toUpperCase()}
        </div>
        <div className="truncate font-sans text-sm font-semibold md:text-base">{value}</div>
      </div>
      {external && <ArrowUpRight className="size-4 text-primary-foreground/60 group-hover:text-primary-foreground" />}
    </a>
  );
}
