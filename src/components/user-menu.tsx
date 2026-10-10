"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { buttonVariants } from "@heroui/styles";
import { useI18n } from "@/i18n/provider";
import { signOut, useSession } from "@/lib/auth-client";

export default function UserMenu() {
  const { dict, href } = useI18n();
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // close the dropdown when clicking anywhere else
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  if (isPending) {
    return <div className="h-10 w-24 animate-pulse rounded-lg bg-base-200 sm:w-28" />;
  }

  if (!session) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href={href("/signin")}
          className={`${buttonVariants({ variant: "outline", size: "md" })} h-10 max-sm:h-8 max-sm:px-3 max-sm:text-xs`}
        >
          {dict.nav.signIn}
        </Link>
        <Link
          href={href("/signup")}
          className={`${buttonVariants({ variant: "primary", size: "md" })} h-10 max-sm:h-8 max-sm:px-3 max-sm:text-xs`}
        >
          {dict.nav.signUp}
        </Link>
      </div>
    );
  }

  const { name, email, image } = session.user;

  async function handleSignOut() {
    await signOut();
    setOpen(false);
    toast.success(dict.nav.signedOut);
    router.push(href("/"));
    router.refresh();
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex h-10 items-center gap-2 rounded-lg px-[17px] hover:bg-base-200"
      >
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt="" className="size-9 rounded-[10px] object-cover" />
        ) : (
          <span className="flex size-9 items-center justify-center rounded-[10px] bg-primary font-semibold text-primary-content">
            {name.charAt(0).toUpperCase()}
          </span>
        )}
        <span className="hidden text-sm font-medium sm:inline">{name.split(" ")[0]}</span>
        <span className="text-xs opacity-60">▾</span>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-64 max-w-[calc(100vw-2rem)] rounded-2xl border border-base-300 bg-base-100 p-2 shadow-xl"
        >
          <div className="overflow-hidden px-3 py-2">
            <p className="truncate text-sm leading-[21px] font-semibold">{name}</p>
            <p className="truncate text-xs leading-4 opacity-70">{email}</p>
          </div>
          <Link
            href={href("/profile")}
            role="menuitem"
            onClick={() => setOpen(false)}
            className="flex h-[33px] items-center rounded-lg px-3 text-sm leading-[21px] hover:bg-base-200"
          >
            👤 {dict.meta.profile}
          </Link>
          <button
            type="button"
            role="menuitem"
            onClick={handleSignOut}
            className="flex h-[33px] w-full items-center rounded-lg px-3 text-left text-sm leading-[21px] text-error hover:bg-base-200"
          >
            ↩ {dict.nav.signOut}
          </button>
        </div>
      )}
    </div>
  );
}
