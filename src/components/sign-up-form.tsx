"use client";

import { Button, FieldError, Input, Label, TextField } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import type { Lang } from "@/data/texts";
import { texts } from "@/data/texts";
import { authClient } from "@/lib/auth-client";
import SocialButtons from "./social-buttons";

type Props = {
  lang: Lang;
  callbackUrl: string; // the page to open after signing up
};

export default function SignUpForm({ lang, callbackUrl }: Props) {
  const t = texts[lang];
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // one text for each field, "" means no error
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // 1) check the fields
    const newNameError = name ? "" : t.nameRequired;
    const newEmailError = email ? "" : t.emailRequired;
    const newPasswordError = password.length >= 8 ? "" : t.passwordShort;
    const newConfirmError = confirmPassword === password ? "" : t.passwordMismatch;
    setNameError(newNameError);
    setEmailError(newEmailError);
    setPasswordError(newPasswordError);
    setConfirmError(newConfirmError);
    if (newNameError || newEmailError || newPasswordError || newConfirmError) return;

    // 2) create the account with Better Auth
    setLoading(true);
    const { error } = await authClient.signUp.email({ name, email, password });
    setLoading(false);

    if (error) {
      // 422 means this email is already used
      toast.error(error.status === 422 ? t.emailExists : t.signUpFailed);
      return;
    }

    // 3) the new user is signed in already, go to the next page
    toast.success(t.signUpSuccess);
    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <TextField value={name} onChange={setName} isInvalid={nameError !== ""}>
        <Label className="leading-[21px]">{t.nameLabel}</Label>
        <Input className="h-10" placeholder={t.namePlaceholder} />
        <FieldError>{nameError}</FieldError>
      </TextField>

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

      <TextField
        type="password"
        value={confirmPassword}
        onChange={setConfirmPassword}
        isInvalid={confirmError !== ""}
      >
        <Label className="leading-[21px]">{t.confirmPassword}</Label>
        <Input className="h-10" placeholder={t.confirmPlaceholder} />
        <FieldError>{confirmError}</FieldError>
      </TextField>

      <Button type="submit" fullWidth isDisabled={loading} className="h-10">
        {loading ? t.pleaseWait : t.signUpTitle}
      </Button>

      <p className="text-center text-xs">{t.or}</p>

      <SocialButtons lang={lang} callbackUrl={callbackUrl} />

      <p className="text-center text-sm">
        {t.haveAccount}{" "}
        <Link href="/signin" className="text-accent hover:underline">
          {t.goSignIn}
        </Link>
      </p>
    </form>
  );
}
