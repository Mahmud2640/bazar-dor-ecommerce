import type { Metadata } from "next";
import AuthCard from "@/components/auth-card";
import SignUpForm from "@/components/sign-up-form";

export const metadata: Metadata = { title: "সাইন আপ | বাজার দর" };

export default function SignUpPage() {
  return (
    <AuthCard
      title="অ্যাকাউন্ট তৈরি করুন"
      subtitle="বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।"
    >
      <SignUpForm />
    </AuthCard>
  );
}
