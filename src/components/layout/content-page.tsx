import type { ReactNode } from "react";

import { PageHero, type Crumb } from "./page-hero";
import { NextPageLink } from "./next-page-link";

/**
 * Standard inner-page shell: green banner → content → "next page" band.
 * Every non-home route composes this so the rhythm stays identical sitewide.
 */
export function ContentPage({
  title,
  crumbs,
  icon,
  route,
  children,
  wide = false,
}: {
  title: string;
  crumbs?: Crumb[];
  icon?: ReactNode;
  route: string;
  children: ReactNode;
  /** Use the full content width instead of the narrower reading measure. */
  wide?: boolean;
}) {
  return (
    <>
      <PageHero title={title} crumbs={crumbs} icon={icon} />
      <div className="bg-white py-16 md:py-20">
        <div className="container-rif">
          <div className={wide ? undefined : "max-w-[880px]"}>{children}</div>
        </div>
      </div>
      <NextPageLink current={route} />
    </>
  );
}
