import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ProfileDetails from "@/components/profile-details";
import { texts } from "@/data/texts";
import { auth } from "@/lib/auth";
import { getLang } from "@/lib/language";

export default async function ProfilePage() {
  const lang = await getLang();
  const t = texts[lang];

  // this page is only for signed in users
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin?message=login&callbackUrl=/profile");

  return (
    <div className="mx-auto flex max-w-[768px] flex-col gap-6 px-4 py-6">
      <div>
        <h1 className="text-2xl leading-8 font-bold">{t.myProfile}</h1>
        <p className="text-sm leading-5">{t.profileSubtitle}</p>
      </div>

      <ProfileDetails
        lang={lang}
        user={{ name: session.user.name, email: session.user.email, image: session.user.image }}
      />
    </div>
  );
}
