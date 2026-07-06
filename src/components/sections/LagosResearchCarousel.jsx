'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import ReactECharts from 'echarts-for-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

import survey from '@/data/lagos-rider-survey.json';

const BAR_PALETTE = ['#14b8a6', '#0d9488', '#67e8f9', '#f59e0b', '#fbbf24'];
const PIE_PALETTE = ['#14b8a6', '#f59e0b', '#67e8f9', '#fbbf24', '#0d9488'];

function barOption(series, valueKey = 'percent', suffix = '%') {
  return {
    backgroundColor: 'transparent',
    grid: { left: 12, right: 56, top: 16, bottom: 10, containLabel: true },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: 'rgba(20,20,20,0.92)',
      borderColor: 'rgba(20,184,166,0.4)',
      textStyle: { color: '#fff', fontFamily: 'inherit', fontSize: 12 },
      formatter: (params) => {
        const point = Array.isArray(params) ? params[0] : params;
        const f = series[point.dataIndex];
        return `<div style="font-weight:600;margin-bottom:4px">${f.label}</div>
                <div style="opacity:0.85">${f.percent}% · ${f.count} responses</div>`;
      },
    },
    xAxis: {
      type: 'value',
      min: 0,
      max: 100,
      axisLabel: { color: '#8a8a8a', fontSize: 11, formatter: `{value}${suffix}` },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: 'rgba(80,80,80,0.22)' } },
    },
    yAxis: {
      type: 'category',
      data: series.map((f) => f.label),
      inverse: true,
      axisLabel: { color: '#cfcfcf', fontSize: 12, lineHeight: 16, width: 140, overflow: 'break' },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    series: [
      {
        type: 'bar',
        barWidth: 22,
        barMaxWidth: 28,
        data: series.map((f, i) => ({
          value: f[valueKey],
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
          formatter: `{c}${suffix}`,
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
}

function donutOption(series) {
  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(20,20,20,0.92)',
      borderColor: 'rgba(20,184,166,0.4)',
      textStyle: { color: '#fff', fontFamily: 'inherit', fontSize: 12 },
      formatter: (p) => `<div style="font-weight:600">${p.name}</div>
                         <div style="opacity:0.85">${p.value}% · ${p.data.count} responses</div>`,
    },
    legend: {
      orient: 'vertical',
      right: '4%',
      top: 'middle',
      textStyle: { color: '#cfcfcf', fontFamily: 'inherit', fontSize: 12 },
      icon: 'circle',
      itemGap: 14,
    },
    series: [
      {
        type: 'pie',
        radius: ['45%', '72%'],
        center: ['38%', '50%'],
        avoidLabelOverlap: true,
        itemStyle: {
          borderColor: '#0a0a0a',
          borderWidth: 4,
        },
        label: { show: false },
        labelLine: { show: false },
        emphasis: {
          scale: true,
          scaleSize: 8,
          itemStyle: {
            shadowBlur: 24,
            shadowColor: 'rgba(20,184,166,0.5)',
          },
        },
        data: series.map((s, i) => ({
          name: s.label,
          value: s.percent,
          count: s.count,
          itemStyle: { color: PIE_PALETTE[i % PIE_PALETTE.length] },
        })),
      },
    ],
  };
}

const slides = [
  {
    eyebrow: 'Status quo',
    title: 'Who Lagos rides with today',
    caption:
      'Two thirds of surveyed riders still rely on Danfo. Global ride-hail apps hold a third between them.',
    chartType: 'donut',
    data: survey.mostPopularToday,
  },
  {
    eyebrow: 'Buying triggers',
    title: 'What riders said matters most',
    caption:
      'Price leads, but convenience and safety are close behind. Those three inputs define the first product brief.',
    chartType: 'bar',
    data: survey.demandFactors,
  },
  {
    eyebrow: 'Pain points',
    title: 'What needs to change',
    caption:
      'Wait times lead the list. Driver navigation comes second. Both are solvable with better matching and records.',
    chartType: 'bar',
    data: survey.improvementsWanted,
  },
  {
    eyebrow: 'Demand signal',
    title: 'Are they ready for something new?',
    caption:
      '87% said yes — with or without caveats. Most are already looking for a better option.',
    chartType: 'donut',
    data: survey.interestInNewService,
  },
];

export function LagosResearchCarousel() {
  const chartHeight = 'h-[420px] md:h-[480px]';
  const optionsByIndex = useMemo(
    () =>
      slides.map((s) => (s.chartType === 'donut' ? donutOption(s.data) : barOption(s.data))),
    [],
  );

  return (
    <section className="relative mx-auto max-w-5xl px-6 py-16 md:py-32">
      <div className="mb-12 text-center">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
          Lagos is the proof market
        </p>
        <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-5xl">
          The research behind {survey.totalResponses}+ responses.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-balance text-neutral-400">
          We surveyed riders across Lagos before writing a line of code. The local data gives us a
          sharp first wedge for a problem that repeats anywhere daily ride-hail is too expensive and
          informal sharing already exists.
        </p>
      </div>

      <Swiper
        modules={[Autoplay, Pagination]}
        loop
        autoplay={{ delay: 7000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        grabCursor
        className="lagos-research-cube !overflow-visible"
        style={{ '--swiper-pagination-color': '#14b8a6', '--swiper-pagination-bullet-inactive-color': '#525252' }}
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={slide.title} className="!overflow-visible">
            <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-6 backdrop-blur-sm md:p-10">
              <div className="mb-6 flex flex-col items-center text-center md:flex-row md:items-baseline md:justify-between md:text-left">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
                    {slide.eyebrow}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
                    {slide.title}
                  </h3>
                </div>
                <p className="mt-2 max-w-md text-sm text-neutral-400 md:mt-0">{slide.caption}</p>
              </div>
              <div className={`w-full ${chartHeight}`}>
                <ReactECharts
                  option={optionsByIndex[i]}
                  style={{ height: '100%', width: '100%' }}
                  opts={{ renderer: 'svg' }}
                  notMerge
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <p className="mt-12 text-center text-xs uppercase tracking-[0.2em] text-neutral-500">
        Auto-advancing every 7 seconds · grab to scrub
      </p>
      <div className="mt-6 text-center">
        <Link
          href="/contribute"
          className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary transition hover:bg-primary/15"
        >
          Help us suggest fair prices on your route
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
