import type { ReactNode } from "react";

import { PageHero, type Crumb } from "./page-hero";
import { NextPageLink } from "./next-page-link";

/**
 * Standard inner-page shell: photo banner → content → "next page" band.
 */
export function ContentPage({
  title,
  titleAccent,
  subtitle,
  crumbs,
  icon,
  image,
  route,
  children,
  wide = false,
}: {
  title: string;
  titleAccent?: string;
  subtitle?: string;
  crumbs?: Crumb[];
  icon?: ReactNode;
  image?: string;
  route: string;
  children: ReactNode;
  /** Use the full content width instead of the narrower reading measure. */
  wide?: boolean;
}) {
  return (
    <>
      <PageHero
        title={title}
        titleAccent={titleAccent}
        subtitle={subtitle}
        crumbs={crumbs}
        icon={icon}
        image={image}
      />
      <div className="bg-canvas py-16 md:py-20">
        <div className="container-rif">
          <div
            className={
              wide
                ? "rounded-[16px] bg-white p-6 md:p-10"
                : "mx-auto max-w-[920px] rounded-[16px] bg-white p-6 md:p-10 lg:p-12"
            }
          >
            {children}
          </div>
        </div>
      </div>
      <NextPageLink current={route} />
    </>
  );
}
