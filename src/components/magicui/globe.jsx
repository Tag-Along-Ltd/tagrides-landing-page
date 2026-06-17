'use client';

import { useEffect, useRef } from 'react';
import createGlobe from 'cobe';
import { useMotionValue, useSpring } from 'motion/react';

import { cn } from '@/lib/utils';

const MOVEMENT_DAMPING = 1400;

const GLOBE_CONFIG = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 1,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [20 / 255, 184 / 255, 166 / 255],
  glowColor: [1, 1, 1],
  markers: [
    { location: [6.5244, 3.3792], size: 0.12 }, // Lagos — headline marker
    { location: [9.0579, 7.4951], size: 0.06 }, // Abuja
    { location: [4.8156, 7.0498], size: 0.05 }, // Port Harcourt
    { location: [5.6037, -0.187], size: 0.06 }, // Accra
    { location: [-1.2921, 36.8219], size: 0.06 }, // Nairobi
    { location: [30.0444, 31.2357], size: 0.06 }, // Cairo
    { location: [-26.2041, 28.0473], size: 0.06 }, // Johannesburg
    { location: [33.5731, -7.5898], size: 0.05 }, // Casablanca
  ],
};

export function Globe({ className, config = GLOBE_CONFIG }) {
  const canvasRef = useRef(null);
  const phiRef = useRef(0);
  const widthRef = useRef(0);
  const pointerInteracting = useRef(null);
  const pointerInteractionMovement = useRef(0);

  const r = useMotionValue(0);
  const rs = useSpring(r, {
    mass: 1,
    damping: 30,
    stiffness: 100,
  });

  const updatePointerInteraction = (value) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? 'grabbing' : 'grab';
    }
  };

  const updateMovement = (clientX) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      r.set(r.get() + delta / MOVEMENT_DAMPING);
    }
  };

  useEffect(() => {
    const onResize = () => {
      if (canvasRef.current) {
        widthRef.current = canvasRef.current.offsetWidth;
      }
    };

    window.addEventListener('resize', onResize);
    onResize();

    const globe = createGlobe(canvasRef.current, {
      ...config,
      width: widthRef.current * 2,
      height: widthRef.current * 2,
      onRender: (state) => {
        if (!pointerInteracting.current) phiRef.current += 0.005;
        state.phi = phiRef.current + rs.get();
        state.width = widthRef.current * 2;
        state.height = widthRef.current * 2;
      },
    });

    setTimeout(() => (canvasRef.current.style.opacity = '1'), 0);
    return () => {
      globe.destroy();
      window.removeEventListener('resize', onResize);
    };
  }, [rs, config]);

  return (
    <div className={cn('absolute inset-0 mx-auto aspect-square w-full max-w-150', className)}>
      <canvas
        className={cn(
          'size-full opacity-0 transition-opacity duration-500 contain-[layout_paint_size]',
        )}
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX;
          updatePointerInteraction(e.clientX);
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) => e.touches[0] && updateMovement(e.touches[0].clientX)}
      />
    </div>
  );
}
