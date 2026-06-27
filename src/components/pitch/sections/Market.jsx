'use client';

import dynamic from 'next/dynamic';
import { motion } from 'motion/react';

import { PitchSection, SectionHeading } from '../motion/Section';
import pitch from '@/data/pitch.json';

// ECharts is heavy + SSR-unfriendly. Defer.
const ReactECharts = dynamic(() => import('echarts-for-react'), { ssr: false });

// Market — Africa ride-sharing TAM curve 2024→2029, plus three context
// facts to right-size the prize. Chart uses brand-teal line over a soft
// gradient fill so it reads as "growth toward us".
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

      <div className="mt-16 grid items-start gap-10 md:mt-20 md:grid-cols-[1.4fr_1fr] md:gap-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="rounded-2xl bg-elevated/60 p-4 ring-1 ring-border/30 md:p-6"
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="font-mono text-xs text-foreground-muted">
              African ride-sharing TAM, USD billions
            </div>
            <div className="font-mono text-xs text-foreground-muted">Source: Statista</div>
          </div>
          <div className="h-[280px] md:h-[360px]">
            <ReactECharts
              option={option}
              style={{ height: '100%', width: '100%' }}
              opts={{ renderer: 'svg' }}
            />
          </div>
        </motion.div>

        <div className="space-y-6">
          {data.facts.map((f, i) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="border-l-2 border-primary pl-5"
            >
              <div className="font-display text-4xl font-extrabold text-foreground tabular-nums md:text-5xl">
                {f.value}
              </div>
              <div className="mt-2 text-sm text-foreground-muted md:text-base">{f.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </PitchSection>
  );
}
