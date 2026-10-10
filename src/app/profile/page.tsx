import type { Metadata } from "next";
import ProfileView from "@/components/profile-view";

export const metadata: Metadata = { title: "আমার প্রোফাইল | বাজার দর" };

export default function ProfilePage() {
  return (
    <div className="mx-auto w-full max-w-[768px] px-4 py-6">
      <ProfileView />
    </div>
  );
}
