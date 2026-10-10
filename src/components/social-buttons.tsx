"use client";

import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { useI18n } from "@/i18n/provider";
import { signIn } from "@/lib/auth-client";

export default function SocialButtons({ callbackURL }: { callbackURL: string }) {
  const { dict } = useI18n();
  const [loading, setLoading] = useState<string | null>(null);

  const providers = [
    { id: "google", label: dict.auth.google, icon: "/icons/google.svg" },
    { id: "github", label: dict.auth.github, icon: "/icons/github.svg" },
  ] as const;

  async function handleClick(provider: "google" | "github") {
    setLoading(provider);
    const { error } = await signIn.social({ provider, callbackURL });
    // on success the browser is redirected to the provider, so we only handle errors
    if (error) {
      toast.error(dict.auth.socialError);
      setLoading(null);
    }
  }

  return (
    <div className="flex flex-col gap-2 sm:flex-row">
      {providers.map((p) => (
        <button
          key={p.id}
          type="button"
          disabled={loading !== null}
          onClick={() => handleClick(p.id)}
          className="flex h-10 min-w-0 shrink-0 items-center sm:flex-1 sm:shrink justify-center gap-1.5 rounded-lg border border-base-300 bg-base-100 px-2 text-sm font-semibold transition-colors hover:bg-base-200 disabled:opacity-60 sm:px-4"
        >
          <Image src={p.icon} alt="" width={14} height={14} />
          <span>{p.label}</span>
        </button>
      ))}
    </div>
  );
}
