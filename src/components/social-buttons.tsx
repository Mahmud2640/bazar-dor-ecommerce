"use client";

import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { signIn } from "@/lib/auth-client";

const providers = [
  { id: "google", label: "Google দিয়ে চালিয়ে যান", icon: "/icons/google.svg" },
  { id: "github", label: "GitHub দিয়ে চালিয়ে যান", icon: "/icons/github.svg" },
] as const;

export default function SocialButtons({ callbackURL }: { callbackURL: string }) {
  const [loading, setLoading] = useState<string | null>(null);

  async function handleClick(provider: "google" | "github") {
    setLoading(provider);
    const { error } = await signIn.social({ provider, callbackURL });
    // on success the browser is redirected to the provider, so we only handle errors
    if (error) {
      toast.error(error.message ?? "সোশ্যাল লগইন করা যায়নি");
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
          className="flex h-10 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-lg border border-base-300 bg-base-100 px-2 text-sm font-semibold transition-colors hover:bg-base-200 disabled:opacity-60 sm:px-4"
        >
          <Image src={p.icon} alt="" width={14} height={14} />
          <span>{p.label}</span>
        </button>
      ))}
    </div>
  );
}
