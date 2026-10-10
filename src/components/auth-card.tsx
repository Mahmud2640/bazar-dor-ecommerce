import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  title: string;
  subtitle: string;
  backLabel: string;
  homeHref: string;
  children: ReactNode;
};

export default function AuthCard({ title, subtitle, backLabel, homeHref, children }: Props) {
  return (
    <div className="mx-auto flex w-full max-w-[448px] flex-col gap-6 px-4 py-10">
      <div className="flex flex-col items-center gap-1 text-center">
        <h1 className="text-2xl leading-8 font-bold">{title}</h1>
        <p className="text-sm leading-5">{subtitle}</p>
      </div>
      <div className="rounded-2xl border border-base-300 bg-base-100 p-6">{children}</div>
      <Link href={homeHref} className="text-center text-sm leading-5 hover:text-primary">
        {backLabel}
      </Link>
    </div>
  );
}
