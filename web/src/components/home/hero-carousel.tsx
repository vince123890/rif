"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight } from "lucide-react";

import type { HeroSlide } from "@/lib/content";
import { pick } from "@/lib/content";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const INTERVAL = 7000;

/** FR-HM-01 — hero banner slider, CMS-managed. */
export function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const t = useTranslations("home");
  const locale = useLocale();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback(
    (next: number) => setIndex((next + slides.length) % slides.length),
    [slides.length],
  );

  useEffect(() => {
    if (paused || slides.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    timer.current = setInterval(() => go(index + 1), INTERVAL);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [index, paused, go, slides.length]);

  if (!slides.length) return null;
  const slide = slides[index];

  return (
    <section
      aria-roledescription="carousel"
      aria-label={t("heroTitle")}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      className="relative isolate overflow-hidden bg-brand-800"
    >
      {/* Slides */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          aria-hidden={i !== index}
          className={cn(
            "absolute inset-0 transition-opacity duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
            i === index ? "opacity-100" : "opacity-0",
          )}
        >
          <Image
            src={s.image}
            alt=""
            fill
            priority={i === 0}
            sizes="100vw"
            className={cn(
              "object-cover transition-transform duration-[9000ms] ease-out",
              i === index ? "scale-105" : "scale-100",
            )}
          />
        </div>
      ))}

      {/* Legibility scrim */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-brand-900/90 via-brand-800/70 to-brand-700/30"
      />

      <div className="container-rif relative flex min-h-[520px] items-center py-20 md:min-h-[620px] lg:min-h-[660px]">
        <div key={slide.id} className="max-w-3xl animate-fade-up">
          <p className="text-[13px] font-bold uppercase tracking-[0.18em] text-accent-300">
            {pick(slide.kicker, locale)}
          </p>

          <h1 className="mt-4 text-[38px] font-light leading-[1.1] text-white md:text-[56px] lg:text-[64px]">
            {pick(slide.title, locale)}
            {slide.titleAccent ? (
              <>
                <br />
                <span className="font-normal">{pick(slide.titleAccent, locale)}</span>
              </>
            ) : null}
          </h1>

          <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-white/85 md:text-[18px]">
            {pick(slide.lead, locale)}
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <ButtonLink href="/products" variant="accent" size="lg">
              {t("heroCtaProducts")}
            </ButtonLink>
            <ButtonLink href="/contact" variant="onDark" size="lg">
              {t("heroCtaContact")}
            </ButtonLink>
          </div>
        </div>
      </div>

      {/* Controls */}
      {slides.length > 1 && (
        <div className="container-rif relative pb-10">
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => go(index - 1)}
                aria-label="Previous slide"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/35 text-white transition-colors hover:bg-white hover:text-brand-700"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => go(index + 1)}
                aria-label="Next slide"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/35 text-white transition-colors hover:bg-white hover:text-brand-700"
              >
                <ChevronRight className="h-5 w-5" aria-hidden />
              </button>
            </div>

            <div className="flex gap-2">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Slide ${i + 1}`}
                  aria-current={i === index}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    i === index ? "w-10 bg-accent-400" : "w-5 bg-white/40 hover:bg-white/70",
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
