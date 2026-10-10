"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { buttonVariants } from "@heroui/styles";
import { useI18n } from "@/i18n/provider";
import { signIn } from "@/lib/auth-client";
import { safeRedirect } from "@/lib/redirect";
import { useSearchParam } from "@/lib/use-search-param";
import Divider from "./divider";
import FormField from "./form-field";
import SocialButtons from "./social-buttons";

export default function SignInForm() {
  const { lang, dict, href } = useI18n();
  const router = useRouter();
  const callbackUrl = safeRedirect(useSearchParam("callbackUrl"), lang);
  const notice = useSearchParam("notice");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  // protected pages send people here with ?notice=login
  useEffect(() => {
    if (notice === "login") {
      toast.error(dict.auth.loginRequired, { id: "login-required" });
    }
  }, [notice, dict.auth.loginRequired]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");

    const next: typeof errors = {};
    if (!email) next.email = dict.auth.signin.emailRequired;
    if (!password) next.password = dict.auth.signin.passwordRequired;
    setErrors(next);
    if (Object.keys(next).length) return;

    setLoading(true);
    const { error } = await signIn.email({ email, password });
    setLoading(false);

    if (error) {
      toast.error(dict.auth.signin.invalid);
      return;
    }
    toast.success(dict.auth.signin.success);
    router.push(callbackUrl);
    router.refresh();
  }

  const signUpHref =
    callbackUrl === `/${lang}`
      ? href("/signup")
      : `${href("/signup")}?callbackUrl=${encodeURIComponent(callbackUrl)}`;

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
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
        autoComplete="current-password"
        placeholder={dict.auth.passwordPlaceholder}
        error={errors.password}
      />
      <button
        type="submit"
        disabled={loading}
        className={buttonVariants({ variant: "primary", size: "md", fullWidth: true })}
      >
        {loading ? dict.common.pleaseWait : dict.auth.signin.submit}
      </button>
      <Divider label={dict.common.or} />
      <SocialButtons callbackURL={callbackUrl} />
      <p className="text-center text-sm leading-5">
        {dict.auth.signin.noAccount}{" "}
        <Link href={signUpHref} className="text-primary hover:underline">
          {dict.auth.signin.signUpLink}
        </Link>
      </p>
    </form>
  );
}
