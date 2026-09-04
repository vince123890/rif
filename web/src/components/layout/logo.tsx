import { cn } from "@/lib/utils";

/**
 * Wordmark + Resona "double ring" mark.
 * Placeholder until RIF supplies the official vector logo (BRD §4.3, Aset Brand).
 */
export function Logo({
  className,
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        viewBox="0 0 40 40"
        aria-hidden="true"
        className="h-8 w-8 shrink-0"
        fill="none"
      >
        <circle
          cx="20"
          cy="20"
          r="18"
          className={tone === "dark" ? "fill-brand-600" : "fill-white"}
        />
        <path
          d="M13 27V13.5c0-.3.2-.5.5-.5H21a5.2 5.2 0 0 1 1.9 10.1L27 27h-4.3l-3.6-3.9H16V27h-3Zm3-7.2h4.6a2.4 2.4 0 0 0 0-4.8H16v4.8Z"
          className={tone === "dark" ? "fill-white" : "fill-brand-600"}
        />
      </svg>
      <span
        className={cn(
          "text-[17px] font-black leading-tight tracking-tight",
          tone === "dark" ? "text-ink-900" : "text-white",
        )}
      >
        Resona Indonesia Finance
      </span>
    </span>
  );
}
