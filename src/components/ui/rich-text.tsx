import { cn } from "@/lib/utils";

/**
 * Renders CMS rich text.
 *
 * Content originates from the authenticated Strapi editor (a trusted source),
 * so the HTML is rendered as-is. If untrusted input is ever introduced, add
 * server-side sanitisation here — this is the single choke point.
 */
export function RichText({
  html,
  className,
}: {
  html: string;
  className?: string;
}) {
  return (
    <div
      className={cn("prose-rif", className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
