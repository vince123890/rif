import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { User } from "lucide-react";

import { getManagement, pick } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { ContentPage } from "@/components/layout/content-page";
import { PeopleIcon } from "@/components/ui/page-icons";

const ROUTE = "/about/company-profile/management";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata({ locale, titleKey: "management", path: ROUTE });
}

/** FR-AB-07 — Board of Commissioners and Board of Directors. */
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [tNav, people] = await Promise.all([
    getTranslations("nav"),
    getManagement(),
  ]);

  const boards = [
    {
      key: "commissioners" as const,
      title: locale === "id" ? "Dewan Komisaris" : "Board of Commissioners",
    },
    {
      key: "directors" as const,
      title: locale === "id" ? "Dewan Direksi" : "Board of Directors",
    },
  ];

  return (
    <ContentPage
      title={tNav("management")}
      route={ROUTE}
      icon={<PeopleIcon />}
      wide
      crumbs={[
        { label: tNav("about"), href: "/about/management-message" },
        {
          label: tNav("company-profile"),
          href: "/about/company-profile/vision-mission",
        },
      ]}
    >
      <div className="space-y-14">
        {boards.map((board) => {
          const members = people.filter((p) => p.board === board.key);
          if (!members.length) return null;

          return (
            <section key={board.key}>
              <h2 className="text-[24px] font-normal text-brand-600 md:text-[28px]">
                {board.title}
              </h2>
              <div className="mt-6 grid gap-6 border-t border-brand-200 pt-8 sm:grid-cols-2 lg:grid-cols-4">
                {members.map((p) => (
                  <article key={p.id} className="text-center sm:text-left">
                    <div className="relative mx-auto aspect-square w-full max-w-[220px] overflow-hidden rounded-lg bg-ink-100 sm:mx-0">
                      {p.photo ? (
                        <Image
                          src={p.photo}
                          alt={p.name}
                          fill
                          sizes="220px"
                          className="object-cover"
                        />
                      ) : (
                        <span className="grid h-full w-full place-items-center text-ink-300">
                          <User className="h-14 w-14" aria-hidden />
                        </span>
                      )}
                    </div>
                    <h3 className="mt-4 text-[17px] font-bold text-ink-900">
                      {p.name}
                    </h3>
                    <p className="mt-0.5 text-[14px] text-ink-500">
                      {pick(p.position, locale)}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </ContentPage>
  );
}
