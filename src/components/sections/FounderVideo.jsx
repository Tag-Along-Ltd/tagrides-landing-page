'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { Play, ArrowUpRight, X } from 'lucide-react';
import { founderVideo } from '@/data/founder-video';

// Local poster first: no YouTube player, cookies or player bandwidth until the
// visitor explicitly chooses to watch. Reused on About and Support.
export function FounderVideo({ showSupportLink = false }) {
  const [playing, setPlaying] = useState(false);
  const playButton = useRef(null);
  const player = useRef(null);

  function closeVideo() {
    setPlaying(false);
    requestAnimationFrame(() => playButton.current?.focus());
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-surface">
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 sm:px-7">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
          Meet the founder · {founderVideo.duration}
        </p>
        {playing && (
          <button
            type="button"
            onClick={closeVideo}
            className="inline-flex min-h-9 items-center gap-2 rounded-full border border-border px-3 text-xs text-foreground hover:bg-elevated"
          >
            <X className="size-3.5" aria-hidden="true" /> Close video
          </button>
        )}
      </div>
      <div className="relative aspect-video bg-background">
        {playing ? (
          <iframe
            ref={player}
            src={founderVideo.embedUrl}
            title={founderVideo.title}
            className="absolute inset-0 size-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            onLoad={() => player.current?.focus()}
          />
        ) : (
          <button
            ref={playButton}
            type="button"
            onClick={() => setPlaying(true)}
            aria-label="Watch Oniya’s TagRides founder pitch"
            className="group absolute inset-0 size-full overflow-hidden focus-visible:outline-4 focus-visible:outline-offset-[-4px] focus-visible:outline-accent"
          >
            <Image
              src={founderVideo.poster}
              alt="Oniya Olaiya introducing TagRides"
              fill
              unoptimized
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
            <span
              className="absolute inset-0 bg-black/15 transition group-hover:bg-black/5"
              aria-hidden="true"
            />
            <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
              <span className="flex size-16 items-center justify-center rounded-full border border-white/30 bg-primary text-white shadow-xl transition group-hover:scale-105 sm:size-20">
                <Play className="ml-1 size-7 fill-current" />
              </span>
            </span>
          </button>
        )}
      </div>
      <div className="px-5 py-5 sm:px-7">
        <p className="max-w-3xl text-sm leading-relaxed text-foreground-muted">
          {founderVideo.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
          <a
            href={founderVideo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-primary-soft underline underline-offset-4"
          >
            Watch on YouTube <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
          {showSupportLink && (
            <Link href="/support" className="text-primary-soft underline underline-offset-4">
              Help put the first route to work
            </Link>
          )}
        </div>
        <p className="mt-4 text-xs leading-relaxed text-foreground-muted">
          Founder pitch · goals discussed are ambitions. The MVP is in internal testing as we
          prepare the Lagos pilot. YouTube loads when you press play.
        </p>
      </div>
    </div>
  );
}
