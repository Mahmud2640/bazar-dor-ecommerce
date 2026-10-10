"use client";

import { Button } from "@heroui/react";
import Image from "next/image";
import toast from "react-hot-toast";
import type { Lang } from "@/data/texts";
import { texts } from "@/data/texts";
import { authClient } from "@/lib/auth-client";

type Props = {
  lang: Lang;
  callbackUrl: string; // the page to open after signing in
};

// "Continue with Google" and "Continue with GitHub" buttons
export default function SocialButtons({ lang, callbackUrl }: Props) {
  const t = texts[lang];

  async function handleSocialSignIn(provider: "google" | "github") {
    // if everything is fine the browser goes to Google/GitHub, so we only check the error
    const { error } = await authClient.signIn.social({ provider, callbackURL: callbackUrl });
    if (error) toast.error(t.socialError);
  }

  return (
    <div className="flex flex-col gap-2 sm:flex-row">
      <Button variant="outline" className="h-10 flex-1" onPress={() => handleSocialSignIn("google")}>
        <Image src="/icons/google.svg" alt="" width={14} height={14} />
        {t.googleButton}
      </Button>
      <Button variant="outline" className="h-10 flex-1" onPress={() => handleSocialSignIn("github")}>
        <Image src="/icons/github.svg" alt="" width={14} height={14} />
        {t.githubButton}
      </Button>
    </div>
  );
}
