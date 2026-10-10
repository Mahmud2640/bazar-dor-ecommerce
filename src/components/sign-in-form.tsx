"use client";

import { Button, FieldError, Input, Label, TextField } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import type { Lang } from "@/data/texts";
import { texts } from "@/data/texts";
import { authClient } from "@/lib/auth-client";
import SocialButtons from "./social-buttons";

type Props = {
  lang: Lang;
  message?: string; // "login" when a protected page sent the visitor here
  callbackUrl: string; // the page to open after signing in
};

export default function SignInForm({ lang, message, callbackUrl }: Props) {
  const t = texts[lang];
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  // the visitor tried to open a page that needs login, so tell them
  useEffect(() => {
    if (message === "login") {
      toast.error(t.loginRequired, { id: "login-required" });
    }
  }, [message, t.loginRequired]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // 1) check the fields
    const newEmailError = email ? "" : t.emailRequired;
    const newPasswordError = password ? "" : t.passwordRequired;
    setEmailError(newEmailError);
    setPasswordError(newPasswordError);
    if (newEmailError || newPasswordError) return;

    // 2) sign in with Better Auth
    setLoading(true);
    const { error } = await authClient.signIn.email({ email, password });
    setLoading(false);

    if (error) {
      toast.error(t.wrongLogin);
      return;
    }

    // 3) go to the next page
    toast.success(t.signInSuccess);
    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <TextField type="email" value={email} onChange={setEmail} isInvalid={emailError !== ""}>
        <Label className="leading-[21px]">{t.email}</Label>
        <Input className="h-10" placeholder="you@example.com" />
        <FieldError>{emailError}</FieldError>
      </TextField>

      <TextField type="password" value={password} onChange={setPassword} isInvalid={passwordError !== ""}>
        <Label className="leading-[21px]">{t.password}</Label>
        <Input className="h-10" placeholder={t.passwordPlaceholder} />
        <FieldError>{passwordError}</FieldError>
      </TextField>

      <Button type="submit" fullWidth isDisabled={loading} className="h-10">
        {loading ? t.pleaseWait : t.signInTitle}
      </Button>

      <p className="text-center text-xs">{t.or}</p>

      <SocialButtons lang={lang} callbackUrl={callbackUrl} />

      <p className="text-center text-sm">
        {t.noAccount}{" "}
        <Link href="/signup" className="text-accent hover:underline">
          {t.goSignUp}
        </Link>
      </p>
    </form>
  );
}
