import type { Metadata } from "next";
import AuthCard from "@/components/auth-card";
import SignInForm from "@/components/sign-in-form";
import { getDictionary } from "@/i18n/dictionaries";
import { resolveLang } from "@/i18n/server";

export async function generateMetadata({ params }: PageProps<"/[lang]/signin">): Promise<Metadata> {
  return { title: getDictionary(await resolveLang(params)).auth.signin.title };
}

export default async function SignInPage({ params }: PageProps<"/[lang]/signin">) {
  const lang = await resolveLang(params);
  const dict = getDictionary(lang);

  return (
    <AuthCard
      title={dict.auth.signin.title}
      subtitle={dict.auth.signin.subtitle}
      backLabel={dict.common.backHome}
      homeHref={`/${lang}`}
    >
      <SignInForm />
    </AuthCard>
  );
}
