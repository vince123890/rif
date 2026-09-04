import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Official lockup, matching the existing RIF site: the green Resona roundel
 * with the orange "RESONA" wordmark beneath it, followed by the company name.
 *
 * The mark is slightly taller than it is wide because the RESONA wordmark
 * sits under the roundel — keep the aspect ratio intact when resizing.
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
      <Image
        src="/brand/resona-mark.png"
        alt=""
        width={252}
        height={320}
        priority
        className={cn(
          "h-11 w-auto shrink-0",
          // On the dark green header the orange wordmark still reads, but the
          // green roundel needs a light disc behind it.
          tone === "light" && "rounded-sm bg-white p-1",
        )}
      />

      <span
        className={cn(
          "text-[19px] font-black leading-tight tracking-tight",
          tone === "dark" ? "text-ink-900" : "text-white",
        )}
      >
        Resona Indonesia Finance
      </span>
    </span>
  );
}
