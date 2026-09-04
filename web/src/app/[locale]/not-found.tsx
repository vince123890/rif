import { getTranslations } from "next-intl/server";

import { ButtonLink } from "@/components/ui/button";

export default async function NotFound() {
  const t = await getTranslations("error");

  return (
    <div className="container-rif flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="text-[80px] font-black leading-none text-brand-100 md:text-[120px]">
        404
      </p>
      <h1 className="mt-2 text-[28px] font-normal text-ink-900 md:text-[36px]">
        {t("notFoundTitle")}
      </h1>
      <p className="mt-3 max-w-md text-[16px] text-ink-500">{t("notFoundLead")}</p>
      <div className="mt-9">
        <ButtonLink href="/" variant="accent" size="lg">
          {t("backHome")}
        </ButtonLink>
      </div>
    </div>
  );
}
