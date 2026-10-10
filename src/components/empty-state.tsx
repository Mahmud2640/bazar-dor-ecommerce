import Link from "next/link";
import { buttonVariants } from "@heroui/styles";

type Props = {
  title: string;
  message: string;
  code?: string;
};

// 404-style block with a link back to the home page
export default function EmptyState({ title, message, code = "৪০৪" }: Props) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-base-300 bg-base-100 px-4 py-16 text-center">
      <p className="text-6xl font-bold text-primary">{code}</p>
      <h1 className="text-2xl leading-8 font-bold">{title}</h1>
      <p className="text-sm">{message}</p>
      <Link href="/" className={`${buttonVariants({ variant: "primary", size: "md" })} mt-2`}>
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
