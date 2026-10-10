"use client";

import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import type { Lang } from "@/data/texts";

// save the chosen language in a cookie (the server reads it in getLang)
function saveLanguage(lang: Lang) {
  document.cookie = `lang=${lang}; path=/; max-age=31536000`;
}

export default function LanguageToggle({ lang }: { lang: Lang }) {
  const router = useRouter();

  function changeLanguage(newLang: Lang) {
    saveLanguage(newLang);
    router.refresh(); // load the page again with the new language
  }

  return (
    <div className="flex gap-1">
      <Button size="sm" variant={lang === "bn" ? "primary" : "ghost"} onPress={() => changeLanguage("bn")}>
        বাংলা
      </Button>
      <Button size="sm" variant={lang === "en" ? "primary" : "ghost"} onPress={() => changeLanguage("en")}>
        EN
      </Button>
    </div>
  );
}
