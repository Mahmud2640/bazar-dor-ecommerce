"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { buttonVariants } from "@heroui/styles";
import { useI18n } from "@/i18n/provider";
import { signUp } from "@/lib/auth-client";
import { safeRedirect } from "@/lib/redirect";
import { useSearchParam } from "@/lib/use-search-param";
import Divider from "./divider";
import FormField from "./form-field";
import SocialButtons from "./social-buttons";

type Errors = Partial<Record<"name" | "email" | "password" | "confirm", string>>;

export default function SignUpForm() {
  const { lang, dict, href } = useI18n();
  const t = dict.auth.signup;
  const router = useRouter();
  const callbackUrl = safeRedirect(useSearchParam("callbackUrl"), lang);
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
    if (!name) next.name = t.nameRequired;
    if (!email) next.email = t.emailRequired;
    if (password.length < 8) next.password = t.passwordShort;
    if (confirm !== password) next.confirm = t.passwordMismatch;
    setErrors(next);
    if (Object.keys(next).length) return;

    setLoading(true);
    const { error } = await signUp.email({ name, email, password });
    setLoading(false);

    if (error) {
      toast.error(
        error.code === "USER_ALREADY_EXISTS" || error.status === 422 ? t.exists : t.failed,
      );
      return;
    }
    toast.success(t.success);
    router.push(callbackUrl);
    router.refresh();
  }

  const signInHref =
    callbackUrl === `/${lang}`
      ? href("/signin")
      : `${href("/signin")}?callbackUrl=${encodeURIComponent(callbackUrl)}`;

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <FormField
        label={t.name}
        name="name"
        autoComplete="name"
        placeholder={t.namePlaceholder}
        error={errors.name}
      />
      <FormField
        label={dict.auth.email}
        name="email"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        error={errors.email}
      />
      <FormField
        label={dict.auth.password}
        name="password"
        type="password"
        autoComplete="new-password"
        placeholder={dict.auth.passwordPlaceholder}
        error={errors.password}
      />
      <FormField
        label={t.confirm}
        name="confirm"
        type="password"
        autoComplete="new-password"
        placeholder={t.confirmPlaceholder}
        error={errors.confirm}
      />
      <button
        type="submit"
        disabled={loading}
        className={buttonVariants({ variant: "primary", size: "md", fullWidth: true })}
      >
        {loading ? dict.common.pleaseWait : t.submit}
      </button>
      <Divider label={dict.common.or} />
      <SocialButtons callbackURL={callbackUrl} />
      <p className="text-center text-sm leading-5">
        {t.haveAccount}{" "}
        <Link href={signInHref} className="text-primary hover:underline">
          {t.signInLink}
        </Link>
      </p>
    </form>
  );
}
