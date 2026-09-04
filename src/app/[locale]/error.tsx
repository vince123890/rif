"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("error");

  useEffect(() => {
    // NFR-SC-03 — forward to Sentry once the DSN is configured.
    console.error(error);
  }, [error]);

  return (
    <div className="container-rif flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <h1 className="text-[28px] font-normal text-ink-900 md:text-[36px]">
        {t("genericTitle")}
      </h1>
      <p className="mt-3 max-w-md text-[16px] text-ink-500">{t("genericLead")}</p>
      <div className="mt-9">
        <Button variant="accent" size="lg" onClick={reset}>
          {t("retry")}
        </Button>
      </div>
    </div>
  );
}
