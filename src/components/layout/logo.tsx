import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Official Resona mark (docs/rif logo.png) paired with the company wordmark.
 * The mark is the green "R" roundel; on dark surfaces it sits on a white
 * disc so the green keeps its contrast.
 */
export function Logo({
  className,
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <span
        className={cn(
          "grid shrink-0 place-items-center rounded-full",
          tone === "light" ? "h-10 w-10 bg-white p-1" : "h-10 w-10",
        )}
      >
        <Image
          src="/brand/resona-mark.png"
          alt=""
          width={40}
          height={40}
          priority
          className="h-full w-full object-contain"
        />
      </span>

      <span className="leading-none">
        <span
          className={cn(
            "block text-[16px] font-black tracking-tight",
            tone === "dark" ? "text-ink-900" : "text-white",
          )}
        >
          Resona Indonesia Finance
        </span>
        <span
          className={cn(
            "mt-0.5 block text-[10px] font-bold uppercase tracking-[0.18em]",
            tone === "dark" ? "text-accent-400" : "text-accent-300",
          )}
        >
          Resona Group
        </span>
      </span>
    </span>
  );
}
