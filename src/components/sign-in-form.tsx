"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { buttonVariants } from "@heroui/styles";
import { signIn } from "@/lib/auth-client";
import { safeRedirect } from "@/lib/redirect";
import { useSearchParam } from "@/lib/use-search-param";
import Divider from "./divider";
import FormField from "./form-field";
import SocialButtons from "./social-buttons";

export default function SignInForm() {
  const router = useRouter();
  const callbackUrl = safeRedirect(useSearchParam("callbackUrl"));
  const notice = useSearchParam("notice");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  // protected pages send people here with ?notice=login
  useEffect(() => {
    if (notice === "login") {
      toast.error("এই পেজ দেখতে আগে সাইন ইন করুন", { id: "login-required" });
    }
  }, [notice]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");

    const next: typeof errors = {};
    if (!email) next.email = "ইমেইল দিন";
    if (!password) next.password = "পাসওয়ার্ড দিন";
    setErrors(next);
    if (Object.keys(next).length) return;

    setLoading(true);
    const { error } = await signIn.email({ email, password });
    setLoading(false);

    if (error) {
      toast.error("ইমেইল বা পাসওয়ার্ড ঠিক নয়");
      return;
    }
    toast.success("সাইন ইন সফল হয়েছে");
    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <FormField
        label="ইমেইল"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        error={errors.email}
      />
      <FormField
        label="পাসওয়ার্ড"
        name="password"
        type="password"
        autoComplete="current-password"
        placeholder="কমপক্ষে ৮ অক্ষর"
        error={errors.password}
      />
      <button
        type="submit"
        disabled={loading}
        className={`${buttonVariants({ variant: "primary", size: "md", fullWidth: true })}`}
      >
        {loading ? "অপেক্ষা করুন…" : "সাইন ইন"}
      </button>
      <Divider label="অথবা" />
      <SocialButtons callbackURL={callbackUrl} />
      <p className="text-center text-sm leading-5">
        অ্যাকাউন্ট নেই?{" "}
        <Link
          href={callbackUrl === "/" ? "/signup" : `/signup?callbackUrl=${encodeURIComponent(callbackUrl)}`}
          className="text-primary hover:underline"
        >
          সাইন আপ করুন
        </Link>
      </p>
    </form>
  );
}
