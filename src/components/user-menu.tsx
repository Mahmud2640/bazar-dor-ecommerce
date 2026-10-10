"use client";

import { Avatar, Dropdown, Label, buttonVariants } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import type { Lang } from "@/data/texts";
import { texts } from "@/data/texts";
import { authClient } from "@/lib/auth-client";

type Props = {
  user: { name: string; email: string; image?: string | null } | null;
  lang: Lang;
};

export default function UserMenu({ user, lang }: Props) {
  const t = texts[lang];
  const router = useRouter();

  // nobody is signed in: show the Sign in and Sign up buttons
  if (!user) {
    return (
      <div className="flex gap-2">
        <Link href="/signin" className={`${buttonVariants({ variant: "outline" })} h-10`}>
          {t.signIn}
        </Link>
        <Link href="/signup" className={`${buttonVariants({ variant: "primary" })} h-10`}>
          {t.signUp}
        </Link>
      </div>
    );
  }

  async function handleSignOut() {
    await authClient.signOut();
    toast.success(t.signedOut);
    router.push("/");
    router.refresh();
  }

  // called when the user clicks an item of the menu
  function handleAction(key: string | number) {
    if (key === "profile") router.push("/profile");
    if (key === "signout") handleSignOut();
  }

  return (
    <Dropdown>
      <Dropdown.Trigger className="flex h-10 items-center gap-2 rounded-lg px-3">
        <Avatar size="sm">
          {user.image && <Avatar.Image alt={user.name} src={user.image} />}
          <Avatar.Fallback>{user.name.charAt(0).toUpperCase()}</Avatar.Fallback>
        </Avatar>
        <span className="hidden text-sm font-medium sm:inline">{user.name.split(" ")[0]}</span>
        <span className="text-xs opacity-60">▾</span>
      </Dropdown.Trigger>

      <Dropdown.Popover className="min-w-64">
        {/* name and email */}
        <div className="px-3 py-2">
          <p className="truncate text-sm font-semibold">{user.name}</p>
          <p className="truncate text-xs opacity-70">{user.email}</p>
        </div>

        <Dropdown.Menu onAction={handleAction}>
          <Dropdown.Item id="profile" textValue={t.myProfile}>
            <Label>👤 {t.myProfile}</Label>
          </Dropdown.Item>
          <Dropdown.Item id="signout" textValue={t.signOut} variant="danger">
            <Label>↩ {t.signOut}</Label>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}
