'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { Play } from 'lucide-react';
import { storyFilm } from '@/data/story-film';

// Self-hosted story film. Poster first: the video file only downloads when the
// visitor presses play. Reused on About and Support (replaces the founder pitch).
export function StoryFilm({ showSupportLink = false }) {
  const [playing, setPlaying] = useState(false);
  const video = useRef(null);

  function start() {
    setPlaying(true);
    requestAnimationFrame(() => {
      video.current?.play().catch(() => {});
      video.current?.focus();
    });
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-surface">
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 sm:px-7">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
          The TagRides story · {storyFilm.duration}
        </p>
      </div>
      <div className="relative aspect-video bg-background">
        {playing ? (
          <video
            ref={video}
            src={storyFilm.src}
            poster={storyFilm.poster}
            controls
            playsInline
            preload="auto"
            className="absolute inset-0 size-full bg-black object-contain"
            aria-label={storyFilm.title}
          >
            <track kind="captions" src={storyFilm.captions} srcLang="en" label="English" />
          </video>
        ) : (
          <button
            type="button"
            onClick={start}
            aria-label={`Watch ${storyFilm.title}`}
            className="group absolute inset-0 size-full overflow-hidden focus-visible:outline-4 focus-visible:outline-offset-[-4px] focus-visible:outline-accent"
          >
            <Image
              src={storyFilm.poster}
              alt="TagRides story film: a rider matched with a neighbour driving the same way"
              fill
              unoptimized
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
            <span className="absolute inset-0 bg-black/20 transition group-hover:bg-black/5" aria-hidden="true" />
            <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
              <span className="flex size-16 items-center justify-center rounded-full border border-white/30 bg-primary text-white shadow-xl transition group-hover:scale-105 sm:size-20">
                <Play className="ml-1 size-7 fill-current" />
              </span>
            </span>
          </button>
        )}
      </div>
      <div className="px-5 py-5 sm:px-7">
        <p className="max-w-3xl text-sm leading-relaxed text-foreground-muted">{storyFilm.description}</p>
        {showSupportLink && (
          <div className="mt-4 text-sm font-semibold">
            <Link href="/support" className="text-primary-soft underline underline-offset-4">
              Help put the first route to work
            </Link>
          </div>
        )}
        <p className="mt-4 text-xs leading-relaxed text-foreground-muted">
          Figures shown in the film are sourced on screen. Map scenes are illustrative; phone footage is from a
          real road test. {storyFilm.credits}
        </p>
      </div>
    </div>
  );
}
