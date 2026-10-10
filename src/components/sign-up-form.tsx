"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { buttonVariants } from "@heroui/styles";
import { signUp } from "@/lib/auth-client";
import { safeRedirect } from "@/lib/redirect";
import { useSearchParam } from "@/lib/use-search-param";
import Divider from "./divider";
import FormField from "./form-field";
import SocialButtons from "./social-buttons";

type Errors = Partial<Record<"name" | "email" | "password" | "confirm", string>>;

export default function SignUpForm() {
  const router = useRouter();
  const callbackUrl = safeRedirect(useSearchParam("callbackUrl"));
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");
    const confirm = String(form.get("confirm") ?? "");

    const next: Errors = {};
    if (!name) next.name = "নাম দিন";
    if (!email) next.email = "ইমেইল দিন";
    if (password.length < 8) next.password = "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে";
    if (confirm !== password) next.confirm = "পাসওয়ার্ড মিলছে না";
    setErrors(next);
    if (Object.keys(next).length) return;

    setLoading(true);
    const { error } = await signUp.email({ name, email, password });
    setLoading(false);

    if (error) {
      toast.error(
        error.code === "USER_ALREADY_EXISTS" || error.status === 422
          ? "এই ইমেইল দিয়ে আগেই অ্যাকাউন্ট আছে"
          : (error.message ?? "অ্যাকাউন্ট তৈরি করা যায়নি"),
      );
      return;
    }
    toast.success("অ্যাকাউন্ট তৈরি হয়েছে");
    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <FormField
        label="নাম"
        name="name"
        autoComplete="name"
        placeholder="যেমন: রহিম উদ্দিন"
        error={errors.name}
      />
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
        autoComplete="new-password"
        placeholder="কমপক্ষে ৮ অক্ষর"
        error={errors.password}
      />
      <FormField
        label="পাসওয়ার্ড নিশ্চিত করুন"
        name="confirm"
        type="password"
        autoComplete="new-password"
        placeholder="আবার লিখুন"
        error={errors.confirm}
      />
      <button
        type="submit"
        disabled={loading}
        className={buttonVariants({ variant: "primary", size: "md", fullWidth: true })}
      >
        {loading ? "অপেক্ষা করুন…" : "অ্যাকাউন্ট তৈরি করুন"}
      </button>
      <Divider label="অথবা" />
      <SocialButtons callbackURL={callbackUrl} />
      <p className="text-center text-sm leading-5">
        অ্যাকাউন্ট আছে?{" "}
        <Link
          href={callbackUrl === "/" ? "/signin" : `/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`}
          className="text-primary hover:underline"
        >
          সাইন ইন করুন
        </Link>
      </p>
    </form>
  );
}
