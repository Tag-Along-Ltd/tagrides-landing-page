'use client';

import { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';

import survey from '@/data/lagos-rider-survey.json';

const BAR_PALETTE = ['#14b8a6', '#0d9488', '#67e8f9', '#f59e0b', '#fbbf24'];

export function RiderDemandChart() {
  const option = useMemo(() => {
    const factors = survey.demandFactors;
    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        backgroundColor: 'rgba(20,20,20,0.92)',
        borderColor: 'rgba(20,184,166,0.4)',
        textStyle: { color: '#fff', fontFamily: 'inherit' },
        formatter: (params) => {
          const point = Array.isArray(params) ? params[0] : params;
          const f = factors[point.dataIndex];
          return `<div style="font-weight:600;margin-bottom:4px">${f.label}</div>
                  <div style="opacity:0.85">${f.percent}% of riders · ${f.count} responses</div>`;
        },
      },
      grid: { left: 12, right: 58, top: 18, bottom: 10, containLabel: true },
      xAxis: {
        type: 'value',
        min: 0,
        max: 100,
        axisLabel: { color: '#8a8a8a', fontSize: 11, formatter: '{value}%' },
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { lineStyle: { color: 'rgba(80,80,80,0.22)' } },
      },
      yAxis: {
        type: 'category',
        data: factors.map((f) => f.label),
        inverse: true,
        axisLabel: { color: '#cfcfcf', fontSize: 12, lineHeight: 16, width: 150, overflow: 'break' },
        axisLine: { show: false },
        axisTick: { show: false },
      },
      series: [
        {
          type: 'bar',
          barWidth: 24,
          barMaxWidth: 30,
          data: factors.map((f, i) => ({
            value: f.percent,
            itemStyle: {
              color: BAR_PALETTE[i % BAR_PALETTE.length],
              borderRadius: [0, 999, 999, 0],
            },
          })),
          label: {
            show: true,
            position: 'right',
            color: '#e5e5e5',
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            formatter: '{c}%',
          },
          backgroundStyle: { color: 'rgba(255,255,255,0.04)', borderRadius: 999 },
          showBackground: true,
          emphasis: {
            focus: 'series',
            itemStyle: { shadowBlur: 18, shadowColor: 'rgba(20,184,166,0.28)' },
          },
        },
      ],
    };
  }, []);

  return (
    <section className="relative mx-auto max-w-6xl px-6 py-24">
      <div className="mb-10 text-center">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
          Built on what Lagos riders told us
        </p>
        <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-5xl">
          {survey.headline}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-balance text-neutral-400">
          We surveyed {survey.totalResponses} riders across Lagos. These are the things they said
          matter most when they pick a ride.
        </p>
      </div>

      <div className="h-[480px] w-full md:h-[560px]">
        <ReactECharts
          option={option}
          style={{ height: '100%', width: '100%' }}
          opts={{ renderer: 'svg' }}
        />
      </div>
    </section>
  );
}
