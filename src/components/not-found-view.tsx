"use client";

import { useI18n } from "@/i18n/provider";
import EmptyState from "./empty-state";

// not-found pages do not receive route params, so this reads the language from context
export default function NotFoundView() {
  const { dict, href } = useI18n();

  return (
    <EmptyState
      code={dict.notFound.code}
      title={dict.notFound.title}
      message={dict.notFound.message}
      backLabel={dict.common.backHomeButton}
      homeHref={href("/")}
    />
  );
}
