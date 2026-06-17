'use client';

import { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import 'echarts-gl';

import survey from '@/data/lagos-rider-survey.json';

export function RiderDemandChart() {
  const option = useMemo(() => {
    const factors = survey.demandFactors;
    return {
      backgroundColor: 'transparent',
      tooltip: {
        backgroundColor: 'rgba(20,20,20,0.92)',
        borderColor: 'rgba(20,184,166,0.4)',
        textStyle: { color: '#fff', fontFamily: 'inherit' },
        formatter: (params) => {
          const f = factors[params.value[0]];
          return `<div style="font-weight:600;margin-bottom:4px">${f.label}</div>
                  <div style="opacity:0.85">${f.percent}% of riders · ${f.count} responses</div>`;
        },
      },
      visualMap: {
        show: false,
        min: 0,
        max: 100,
        inRange: {
          color: ['#134e4a', '#0d9488', '#14b8a6', '#67e8f9'],
        },
      },
      xAxis3D: {
        type: 'category',
        data: factors.map((f) => f.label),
        axisLabel: {
          color: '#cfcfcf',
          fontSize: 12,
          interval: 0,
          rotate: 0,
          margin: 14,
        },
        axisLine: { lineStyle: { color: '#3f3f3f' } },
      },
      yAxis3D: {
        type: 'category',
        data: ['Demand'],
        axisLabel: { show: false },
        axisLine: { lineStyle: { color: '#3f3f3f' } },
      },
      zAxis3D: {
        type: 'value',
        min: 0,
        max: 100,
        axisLabel: {
          color: '#8a8a8a',
          fontSize: 11,
          formatter: '{value}%',
        },
        axisLine: { lineStyle: { color: '#3f3f3f' } },
        splitLine: { lineStyle: { color: 'rgba(80,80,80,0.3)' } },
      },
      grid3D: {
        boxWidth: 200,
        boxDepth: 40,
        boxHeight: 90,
        environment: '#0a0a0a',
        light: {
          main: { intensity: 1.4, shadow: true, alpha: 35, beta: 30 },
          ambient: { intensity: 0.4 },
        },
        postEffect: {
          enable: true,
          bloom: { enable: true, intensity: 0.15 },
          SSAO: { enable: true, radius: 2, intensity: 1.2 },
        },
        viewControl: {
          autoRotate: true,
          autoRotateSpeed: 6,
          alpha: 18,
          beta: 30,
          distance: 240,
        },
      },
      series: [
        {
          type: 'bar3D',
          shading: 'realistic',
          realisticMaterial: { roughness: 0.4, metalness: 0.2 },
          bevelSize: 0.2,
          bevelSmoothness: 4,
          data: factors.map((f, i) => ({
            value: [i, 0, f.percent],
            itemStyle: { opacity: 1 },
          })),
          emphasis: {
            label: { show: false },
            itemStyle: { color: '#67e8f9' },
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
          opts={{ renderer: 'canvas' }}
        />
      </div>
    </section>
  );
}
