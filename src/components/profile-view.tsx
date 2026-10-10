"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent, type RefObject } from "react";
import toast from "react-hot-toast";
import { buttonVariants } from "@heroui/styles";
import { signOut, updateUser, useSession } from "@/lib/auth-client";
import FormField from "./form-field";

type User = { name: string; email: string; image?: string | null };

function ProfileSkeleton() {
  return (
    <div className="flex flex-col gap-6" aria-busy="true" aria-label="লোড হচ্ছে">
      <div className="h-[120px] animate-pulse rounded-2xl border border-base-300 bg-base-100" />
      <div className="h-[251px] animate-pulse rounded-2xl border border-base-300 bg-base-100" />
    </div>
  );
}

function ProfileContent({ user, signingOutRef }: { user: User; signingOutRef: RefObject<boolean> }) {
  const router = useRouter();
  // starts with the saved name; the parent only renders this once the user is loaded
  const [name, setName] = useState(user.name);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleUpdate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError("নাম দিন");
      return;
    }
    setError("");
    setSaving(true);
    const { error: updateError } = await updateUser({ name: trimmed });
    setSaving(false);

    if (updateError) {
      toast.error(updateError.message ?? "আপডেট করা যায়নি");
      return;
    }
    toast.success("প্রোফাইল আপডেট হয়েছে");
    router.refresh();
  }

  async function handleSignOut() {
    signingOutRef.current = true; // stops the "login required" redirect below from racing with us
    await signOut();
    toast.success("সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl leading-8 font-bold">আমার প্রোফাইল</h1>
        <p className="text-sm leading-5">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
      </div>

      <div className="flex flex-col gap-4 rounded-2xl border border-base-300 bg-base-100 p-[25px] sm:flex-row sm:items-center">
        {user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={user.image} alt="" className="h-[70px] w-20 rounded-2xl object-cover" />
        ) : (
          <span className="flex h-[70px] w-20 items-center justify-center rounded-2xl bg-primary text-3xl font-semibold text-primary-content">
            {user.name.charAt(0).toUpperCase()}
          </span>
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate text-xl leading-7 font-semibold">{user.name}</p>
          <p className="truncate text-base leading-6">{user.email}</p>
        </div>
        <button
          type="button"
          onClick={handleSignOut}
          className={`${buttonVariants({ variant: "danger-soft", size: "md" })} border border-error bg-transparent text-error`}
        >
          ↩ সাইন আউট
        </button>
      </div>

      <section className="flex flex-col gap-3 rounded-2xl border border-base-300 bg-base-100 p-[21px]">
        <h2 className="text-lg leading-7 font-semibold">তথ্য</h2>
        <form onSubmit={handleUpdate} noValidate className="flex flex-col gap-4 p-0 sm:p-6">
          <FormField
            label="নাম"
            name="name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={error}
          />
          <button
            type="submit"
            disabled={saving}
            className={buttonVariants({ variant: "primary", size: "md", fullWidth: true })}
          >
            {saving ? "অপেক্ষা করুন…" : "আপডেট"}
          </button>
        </form>
      </section>
    </div>
  );
}

export default function ProfileView() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const signingOut = useRef(false);

  // protected page: send signed-out visitors to sign in
  useEffect(() => {
    if (!isPending && !session && !signingOut.current) {
      router.replace("/signin?notice=login&callbackUrl=%2Fprofile");
    }
  }, [isPending, session, router]);

  if (isPending || !session) return <ProfileSkeleton />;

  // key resets the form if a different user signs in
  return <ProfileContent key={session.user.id} user={session.user} signingOutRef={signingOut} />;
}
