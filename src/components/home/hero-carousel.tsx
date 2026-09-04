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

/**
 * FR-HM-01 — hero banner slider.
 *
 * Layout from the fig: a full-bleed 1440×800 photo, headline at 84px Bold
 * with the second line in accent orange, and a small italic tagline
 * ("• Our Story of Growth and Excellence •") beneath.
 */
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
      className="relative isolate overflow-hidden bg-ink-900"
    >
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

      {/*
       * Legibility scrim. The fig sets dark type on a bright photo, so the
       * wash is strongest behind the headline column and clears to the right
       * to let the image show through.
       */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-white/92 via-white/70 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-transparent"
      />

      <div className="container-rif relative flex min-h-[560px] flex-col justify-center py-24 md:min-h-[700px] lg:min-h-[800px]">
        <div key={slide.id} className="max-w-3xl animate-fade-up">
          <p className="text-[13px] font-bold uppercase tracking-[0.18em] text-brand-600">
            {pick(slide.kicker, locale)}
          </p>

          {/* fig: 84px Bold, second line in #F58220 */}
          <h1 className="mt-6 text-[42px] font-bold leading-[1.05] tracking-[-0.02em] text-ink-900 md:text-[64px] lg:text-[84px]">
            {pick(slide.title, locale)}
            {slide.titleAccent ? (
              <>
                <br />
                <span className="text-accent-400">
                  {pick(slide.titleAccent, locale)}
                </span>
              </>
            ) : null}
          </h1>

          {/* fig: 20px italic, bullet-wrapped tagline */}
          <p className="mt-6 text-[16px] italic text-ink-700 md:text-[20px]">
            • {pick(slide.lead, locale)} •
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <ButtonLink href="/products" size="lg">
              {t("heroCtaProducts")}
            </ButtonLink>
            <ButtonLink href="/contact" variant="accent" size="lg">
              {t("heroCtaContact")}
            </ButtonLink>
          </div>
        </div>
      </div>

      {slides.length > 1 && (
        <div className="container-rif relative pb-10">
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => go(index - 1)}
                aria-label="Previous slide"
                className="grid h-12 w-12 place-items-center rounded-full border border-ink-200 bg-white/70 text-ink-700 backdrop-blur transition-colors hover:bg-brand-600 hover:text-white"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => go(index + 1)}
                aria-label="Next slide"
                className="grid h-12 w-12 place-items-center rounded-full border border-ink-200 bg-white/70 text-ink-700 backdrop-blur transition-colors hover:bg-brand-600 hover:text-white"
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
                    i === index
                      ? "w-10 bg-accent-400"
                      : "w-5 bg-ink-400/60 hover:bg-ink-500",
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
