import { redirect } from "@/i18n/routing";

/** Section landing — no page of its own; go to the first child (BRD §5). */
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect({ href: "/gcg/anti-fraud", locale });
}
