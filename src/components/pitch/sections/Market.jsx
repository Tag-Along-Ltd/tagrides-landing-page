'use client';

import dynamic from 'next/dynamic';
import { motion } from 'motion/react';

import { PitchSection, SectionHeading } from '../motion/Section';
import { AfricaMap } from '../AfricaMap';
import pitch from '@/data/pitch.json';

const ReactECharts = dynamic(() => import('echarts-for-react'), { ssr: false });

// Market — three blocks tell the size + the shape of the opportunity:
//   1. TAM growth chart (Africa ride-sharing 2024 → 2029)
//   2. Africa map with Lagos pulse + planned expansion arcs
//   3. Three context facts in a row at the bottom
export function Market() {
  const data = pitch.market;

  const option = {
    grid: { left: 50, right: 20, top: 24, bottom: 36 },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(26,26,26,0.95)',
      borderColor: '#333',
      textStyle: { color: '#E5E5E5', fontFamily: 'var(--font-mono)' },
      valueFormatter: (v) => `$${v}B`,
    },
    xAxis: {
      type: 'category',
      data: data.tam.map((d) => d.year),
      axisLine: { lineStyle: { color: '#333' } },
      axisLabel: { color: '#B3B3B3', fontFamily: 'var(--font-mono)', fontSize: 12 },
    },
    yAxis: {
      type: 'value',
      min: 1.8,
      max: 3.7,
      axisLine: { show: false },
      splitLine: { lineStyle: { color: '#1f1f1f' } },
      axisLabel: {
        color: '#B3B3B3',
        fontFamily: 'var(--font-mono)',
        fontSize: 12,
        formatter: '${value}B',
      },
    },
    series: [
      {
        data: data.tam.map((d) => d.value),
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: { color: '#008080', width: 3 },
        itemStyle: { color: '#008080', borderColor: '#0A0A0A', borderWidth: 2 },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(0,128,128,0.45)' },
              { offset: 1, color: 'rgba(0,128,128,0.00)' },
            ],
          },
        },
        animationDuration: 1800,
        animationEasing: 'cubicOut',
      },
    ],
  };

  return (
    <PitchSection id="market" tone="surface">
      <SectionHeading eyebrow={data.eyebrow} title={data.title} subtitle={data.subtitle} />

      {/* TAM chart + Africa map side by side */}
      <div className="mt-16 grid items-stretch gap-6 md:mt-20 md:grid-cols-2 md:gap-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="rounded-2xl bg-elevated/60 p-4 ring-1 ring-border/30 md:p-6"
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="font-mono text-xs text-foreground-muted">
              African ride-sharing TAM, USD billions
            </div>
            <div className="font-mono text-xs text-foreground-muted">Source: Statista</div>
          </div>
          <div className="h-[280px] md:h-[340px]">
            <ReactECharts
              option={option}
              style={{ height: '100%', width: '100%' }}
              opts={{ renderer: 'svg' }}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative overflow-hidden rounded-2xl bg-elevated/60 p-4 ring-1 ring-border/30 md:p-6"
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="font-mono text-xs text-foreground-muted">Expansion path</div>
            <div className="flex items-center gap-3 font-mono text-xs text-foreground-muted/80">
              <span className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-primary" /> Now
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-accent" /> Next
              </span>
            </div>
          </div>
          <div className="h-[280px] md:h-[340px]">
            <AfricaMap className="size-full" />
          </div>
        </motion.div>
      </div>

      {/* Context facts row */}
      <div className="mt-10 grid gap-3 md:grid-cols-3 md:gap-6">
        {data.facts.map((f, i) => (
          <motion.div
            key={f.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="rounded-xl border-l-2 border-primary bg-elevated/40 px-5 py-4 md:px-6"
          >
            <div className="font-display text-3xl font-extrabold text-foreground tabular-nums md:text-4xl">
              {f.value}
            </div>
            <div className="mt-1.5 text-xs text-foreground-muted md:text-sm">{f.label}</div>
          </motion.div>
        ))}
      </div>
    </PitchSection>
  );
}
