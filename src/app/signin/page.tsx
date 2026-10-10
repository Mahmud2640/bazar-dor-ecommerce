import type { Metadata } from "next";
import AuthCard from "@/components/auth-card";
import SignInForm from "@/components/sign-in-form";

export const metadata: Metadata = { title: "সাইন ইন | বাজার দর" };

export default function SignInPage() {
  return (
    <AuthCard
      title="সাইন ইন"
      subtitle="বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।"
    >
      <SignInForm />
    </AuthCard>
  );
}
