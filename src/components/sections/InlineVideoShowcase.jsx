'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'motion/react';
import { Play, Volume2, VolumeX, X, Clock } from 'lucide-react';

import { cn } from '@/lib/utils';

// Pristine inline video showcase:
//   • Auto-plays muted when scrolled into view
//   • Teal play button overlay signals "video — click to watch with sound"
//   • Click opens the full YouTube embed in a centered modal with audio
//   • Outer frame matches the rest of the design system (rounded-3xl, border, elevated)
export function InlineVideoShowcase({
  className,
  // MP4 source for the inline muted auto-preview. Operator can swap with a
  // real TagRides demo clip when it's recorded. Pexels stock placeholder for now.
  previewSrc = 'https://videos.pexels.com/video-files/2103099/2103099-uhd_2560_1440_30fps.mp4',
  // Full-fidelity source — usually YouTube — that plays in the modal with sound.
  youtubeSrc = 'https://www.youtube.com/embed/qh3NGpYRG3I',
  poster = '/assets/img/banner/1.jpg',
  duration = '0:45',
  label = 'TagRides Demo',
  caption,
}) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const inView = useInView(containerRef, { margin: '-100px' });
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Auto-play / pause based on viewport intersection
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (inView) v.play().catch(() => {});
    else v.pause();
  }, [inView]);

  // Mute state mirrors actual <video> element so the inline preview can be unmuted
  // in-place without opening the modal — though clicking the play button still opens.
  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = isMuted;
  }, [isMuted]);

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      {/* Outer "bezel" frame */}
      <div className="rounded-[28px] border border-border bg-elevated p-3 shadow-[0_30px_80px_-30px_rgba(0,128,128,0.35)] md:p-4">
        {/* Top chip row */}
        <div className="flex items-center justify-between gap-3 px-2 pb-3 pt-1">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-medium text-foreground-muted">
            <Clock className="size-3" />
            <span className="font-mono">{duration}</span>
            <span className="text-foreground-disabled">·</span>
            <span className="uppercase tracking-[0.14em]">Watch</span>
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-medium text-foreground-muted">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/70" />
              <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
            </span>
            <span className="uppercase tracking-[0.14em]">{label}</span>
          </span>
        </div>

        {/* Video canvas — div w/ role=button so the inner mute toggle can be
            a real <button> without nesting (invalid HTML, crashes hydration). */}
        <div
          role="button"
          tabIndex={0}
          aria-label="Watch the Tag Rides demo with sound"
          onClick={() => setIsOpen(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setIsOpen(true);
            }
          }}
          className="group relative block aspect-video w-full cursor-pointer overflow-hidden rounded-2xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40"
        >
          <video
            ref={videoRef}
            src={previewSrc}
            poster={poster}
            muted={isMuted}
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 size-full object-cover"
          />

          {/* Subtle dark gradient so play button stands out */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(180deg, rgba(10,10,10,0.0) 30%, rgba(10,10,10,0.25) 65%, rgba(10,10,10,0.7) 100%)',
            }}
            aria-hidden="true"
          />

          {/* Center play button — teal, with the same nested-disc treatment as the
              MagicUI HeroVideoDialog so the visual language is consistent. */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="flex size-24 items-center justify-center rounded-full bg-primary/15 backdrop-blur-md transition group-hover:scale-105 md:size-28">
              <div className="from-primary/30 to-primary flex size-16 items-center justify-center rounded-full bg-linear-to-b shadow-[0_12px_30px_-8px_rgba(0,128,128,0.6)] transition group-hover:scale-110 md:size-20">
                <Play
                  className="ml-0.5 size-7 fill-white text-white md:size-8"
                  style={{
                    filter:
                      'drop-shadow(0 4px 3px rgb(0 0 0 / 0.2)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.18))',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Bottom-row affordances */}
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
            <span className="rounded-full bg-background/80 px-3 py-1.5 text-xs font-medium text-foreground backdrop-blur-md ring-1 ring-border">
              Tap to watch with sound
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsMuted((m) => !m);
              }}
              aria-label={isMuted ? 'Unmute preview' : 'Mute preview'}
              className="inline-flex size-9 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur-md ring-1 ring-border transition hover:bg-elevated"
            >
              {isMuted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
            </button>
          </div>
        </div>

        {/* Caption strip */}
        {caption && (
          <p className="px-2 pb-1 pt-3 text-xs leading-relaxed text-foreground-muted">{caption}</p>
        )}
      </div>

      {/* Modal — full YouTube embed with sound */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsOpen(false)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') setIsOpen(false);
            }}
            tabIndex={0}
            role="button"
            aria-label="Close video"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="relative mx-4 aspect-video w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close video"
                className="absolute -top-12 right-0 inline-flex size-9 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur-md ring-1 ring-border"
              >
                <X className="size-4" />
              </button>
              <div className="relative size-full overflow-hidden rounded-2xl border border-border bg-background">
                <iframe
                  src={`${youtubeSrc}${youtubeSrc.includes('?') ? '&' : '?'}autoplay=1`}
                  title="Tag Rides demo"
                  className="size-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
