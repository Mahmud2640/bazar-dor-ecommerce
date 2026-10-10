import { headers } from "next/headers";
import { redirect } from "next/navigation";
import AuthCard from "@/components/auth-card";
import SignInForm from "@/components/sign-in-form";
import { texts } from "@/data/texts";
import { auth } from "@/lib/auth";
import { getLang } from "@/lib/language";

type Props = {
  // the words after ? in the address, for example /signin?message=login
  searchParams: Promise<{ message?: string; callbackUrl?: string }>;
};

export default async function SignInPage({ searchParams }: Props) {
  const lang = await getLang();
  const t = texts[lang];
  const { message, callbackUrl } = await searchParams;

  // a signed in user does not need this page
  const session = await auth.api.getSession({ headers: await headers() });
  if (session) redirect("/");

  // go back to the page the visitor wanted. It must start with a single "/" (our own website)
  const nextPage = callbackUrl && callbackUrl.startsWith("/") && !callbackUrl.startsWith("//") ? callbackUrl : "/";

  return (
    <AuthCard title={t.signInTitle} subtitle={t.signInSubtitle} lang={lang}>
      <SignInForm lang={lang} message={message} callbackUrl={nextPage} />
    </AuthCard>
  );
}
