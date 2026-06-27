'use client';

import dynamic from 'next/dynamic';
import { motion } from 'motion/react';

import { PitchSection, SectionHeading } from '../motion/Section';
import pitch from '@/data/pitch.json';

const ReactECharts = dynamic(() => import('echarts-for-react'), { ssr: false });

// Financials — 5-year revenue vs expenses bar pair, plus unit-economics
// quick-reference card to the right. Both speak the same story:
// profitable from year two onward, with controlled OPEX.
export function Financials() {
  const data = pitch.financials;

  const option = {
    grid: { left: 70, right: 20, top: 24, bottom: 36 },
    legend: {
      data: ['Revenue', 'Expenses'],
      textStyle: { color: '#B3B3B3', fontFamily: 'var(--font-mono)', fontSize: 12 },
      top: 0,
      right: 0,
      itemWidth: 14,
      itemHeight: 8,
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(26,26,26,0.95)',
      borderColor: '#333',
      textStyle: { color: '#E5E5E5', fontFamily: 'var(--font-mono)' },
      valueFormatter: (v) => `$${(v / 1000).toFixed(0)}K`,
    },
    xAxis: {
      type: 'category',
      data: data.projection.map((d) => `Y${d.year}`),
      axisLine: { lineStyle: { color: '#333' } },
      axisLabel: { color: '#B3B3B3', fontFamily: 'var(--font-mono)', fontSize: 12 },
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      splitLine: { lineStyle: { color: '#1f1f1f' } },
      axisLabel: {
        color: '#B3B3B3',
        fontFamily: 'var(--font-mono)',
        fontSize: 12,
        formatter: (v) => `$${(v / 1000).toFixed(0)}K`,
      },
    },
    series: [
      {
        name: 'Revenue',
        type: 'bar',
        data: data.projection.map((d) => d.revenue),
        itemStyle: { color: '#008080', borderRadius: [6, 6, 0, 0] },
        animationDuration: 1400,
      },
      {
        name: 'Expenses',
        type: 'bar',
        data: data.projection.map((d) => d.expenses),
        itemStyle: { color: '#F59E0B', borderRadius: [6, 6, 0, 0] },
        animationDuration: 1400,
        animationDelay: 300,
      },
    ],
  };

  return (
    <PitchSection id="financials" tone="background">
      <SectionHeading eyebrow={data.eyebrow} title={data.title} subtitle={data.subtitle} />

      <div className="mt-16 grid items-start gap-10 md:mt-20 md:grid-cols-[1.5fr_1fr] md:gap-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="rounded-2xl bg-elevated/60 p-4 ring-1 ring-border/30 md:p-6"
        >
          <div className="mb-3 font-mono text-xs text-foreground-muted">
            5-year projection · USD
          </div>
          <div className="h-[300px] md:h-[400px]">
            <ReactECharts
              option={option}
              style={{ height: '100%', width: '100%' }}
              opts={{ renderer: 'svg' }}
            />
          </div>
        </motion.div>

        <div className="space-y-3 md:space-y-4">
          <div className="font-mono text-xs tracking-[0.24em] text-accent md:text-sm">
            UNIT ECONOMICS
          </div>
          {data.unitEcon.map((u, i) => (
            <motion.div
              key={u.label}
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex items-baseline justify-between border-b border-border/30 pb-3"
            >
              <span className="text-sm text-foreground-muted md:text-base">{u.label}</span>
              <span className="font-display text-lg font-bold tabular-nums text-foreground md:text-xl">
                {u.value}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </PitchSection>
  );
}
