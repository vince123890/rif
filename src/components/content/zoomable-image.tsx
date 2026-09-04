"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Maximize2, Minus, Plus, RotateCcw, X } from "lucide-react";

import { cn } from "@/lib/utils";

const MIN = 1;
const MAX = 4;
const STEP = 0.5;

/**
 * FR-AB-08 — organisation chart with a zoom facility.
 * Zoom in/out with buttons, drag to pan, and open fullscreen for detail.
 */
export function ZoomableImage({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) {
  const t = useTranslations("common");
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [fullscreen, setFullscreen] = useState(false);
  const drag = useRef<{ x: number; y: number; ox: number; oy: number } | null>(
    null,
  );

  const clamp = (v: number) => Math.min(MAX, Math.max(MIN, v));

  const zoom = (delta: number) =>
    setScale((s) => {
      const next = clamp(s + delta);
      if (next === 1) setOffset({ x: 0, y: 0 });
      return next;
    });

  const reset = () => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (scale <= 1) return;
    drag.current = { x: e.clientX, y: e.clientY, ox: offset.x, oy: offset.y };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current) return;
    setOffset({
      x: drag.current.ox + (e.clientX - drag.current.x),
      y: drag.current.oy + (e.clientY - drag.current.y),
    });
  };

  const onPointerUp = () => {
    drag.current = null;
  };

  const controls = (
    <div className="flex gap-2">
      <ControlButton onClick={() => zoom(STEP)} label={t("zoomIn")} disabled={scale >= MAX}>
        <Plus className="h-4 w-4" aria-hidden />
      </ControlButton>
      <ControlButton onClick={() => zoom(-STEP)} label={t("zoomOut")} disabled={scale <= MIN}>
        <Minus className="h-4 w-4" aria-hidden />
      </ControlButton>
      <ControlButton onClick={reset} label={t("resetZoom")} disabled={scale === 1}>
        <RotateCcw className="h-4 w-4" aria-hidden />
      </ControlButton>
      <ControlButton
        onClick={() => setFullscreen((v) => !v)}
        label={fullscreen ? t("closeMenu") : t("zoomIn")}
      >
        {fullscreen ? (
          <X className="h-4 w-4" aria-hidden />
        ) : (
          <Maximize2 className="h-4 w-4" aria-hidden />
        )}
      </ControlButton>
    </div>
  );

  const canvas = (
    <div
      className={cn(
        "relative overflow-hidden rounded-[16px] border border-ink-200 bg-white",
        scale > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-default",
      )}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <div
        className="origin-center transition-transform duration-200 ease-out"
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
        }}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="(min-width: 1024px) 1100px, 100vw"
          className="h-auto w-full select-none"
          draggable={false}
          priority
        />
      </div>
    </div>
  );

  if (fullscreen) {
    return (
      <div
        role="dialog"
        aria-modal="true"
        aria-label={alt}
        className="fixed inset-0 z-[80] flex flex-col gap-4 bg-ink-900/95 p-4 md:p-8"
      >
        <div className="flex items-center justify-between">
          <p className="text-[15px] font-medium text-white">{alt}</p>
          {controls}
        </div>
        <div className="min-h-0 flex-1 overflow-auto">{canvas}</div>
      </div>
    );
  }

  return (
    <figure>
      <div className="mb-4 flex items-center justify-between gap-4">
        <figcaption className="text-[14px] text-ink-500">
          {Math.round(scale * 100)}%
        </figcaption>
        {controls}
      </div>
      {canvas}
    </figure>
  );
}

function ControlButton({
  onClick,
  label,
  disabled,
  children,
}: {
  onClick: () => void;
  label: string;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      disabled={disabled}
      className="grid h-9 w-9 place-items-center rounded-[12px] border border-ink-200 bg-white text-ink-700 transition-colors hover:border-brand-600 hover:text-brand-600 disabled:opacity-40 disabled:hover:border-ink-200 disabled:hover:text-ink-700"
    >
      {children}
    </button>
  );
}
