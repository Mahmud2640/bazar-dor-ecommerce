import type { Metadata } from "next";
import AuthCard from "@/components/auth-card";
import SignUpForm from "@/components/sign-up-form";
import { getDictionary } from "@/i18n/dictionaries";
import { resolveLang } from "@/i18n/server";

export async function generateMetadata({ params }: PageProps<"/[lang]/signup">): Promise<Metadata> {
  return { title: getDictionary(await resolveLang(params)).auth.signup.title };
}

export default async function SignUpPage({ params }: PageProps<"/[lang]/signup">) {
  const lang = await resolveLang(params);
  const dict = getDictionary(lang);

  return (
    <AuthCard
      title={dict.auth.signup.title}
      subtitle={dict.auth.signup.subtitle}
      backLabel={dict.common.backHome}
      homeHref={`/${lang}`}
    >
      <SignUpForm />
    </AuthCard>
  );
}
