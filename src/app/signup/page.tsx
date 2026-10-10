import { headers } from "next/headers";
import { redirect } from "next/navigation";
import AuthCard from "@/components/auth-card";
import SignUpForm from "@/components/sign-up-form";
import { texts } from "@/data/texts";
import { auth } from "@/lib/auth";
import { getLang } from "@/lib/language";

export default async function SignUpPage() {
  const lang = await getLang();
  const t = texts[lang];

  // a signed in user does not need this page
  const session = await auth.api.getSession({ headers: await headers() });
  if (session) redirect("/");

  return (
    <AuthCard title={t.signUpTitle} subtitle={t.signUpSubtitle} lang={lang}>
      <SignUpForm lang={lang} callbackUrl="/" />
    </AuthCard>
  );
}
