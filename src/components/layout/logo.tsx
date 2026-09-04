import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Official lockup: the Resona roundel with the RESONA wordmark beneath it,
 * followed by the company name.
 *
 * Two artworks are supplied by RIF — the full-colour mark for light
 * backgrounds and an all-white negative for dark ones (the footer and the
 * green nav bar), so neither needs a plate behind it.
 */
export function Logo({
  className,
  tone = "dark",
}: {
  className?: string;
  /** "dark" = dark text on a light ground; "light" = on a dark ground. */
  tone?: "dark" | "light";
}) {
  const light = tone === "light";

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Image
        src={light ? "/brand/resona-mark-white.png" : "/brand/resona-mark.png"}
        alt=""
        width={252}
        height={320}
        priority
        className="h-11 w-auto shrink-0"
      />

      <span
        className={cn(
          "text-[19px] font-black leading-tight tracking-tight",
          light ? "text-white" : "text-ink-900",
        )}
      >
        Resona Indonesia Finance
      </span>
    </span>
  );
}
