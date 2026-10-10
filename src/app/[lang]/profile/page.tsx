import type { Metadata } from "next";
import ProfileView from "@/components/profile-view";
import { getDictionary } from "@/i18n/dictionaries";
import { resolveLang } from "@/i18n/server";

export async function generateMetadata({ params }: PageProps<"/[lang]/profile">): Promise<Metadata> {
  return { title: getDictionary(await resolveLang(params)).profile.title };
}

export default function ProfilePage() {
  return (
    <div className="mx-auto w-full max-w-[768px] px-4 py-6">
      <ProfileView />
    </div>
  );
}
