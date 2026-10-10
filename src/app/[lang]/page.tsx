import { Suspense } from "react";
import Hero from "@/components/hero";
import HomeProducts from "@/components/home-products";
import ProductsSkeleton from "@/components/products-skeleton";
import { getDictionary } from "@/i18n/dictionaries";
import { resolveLang } from "@/i18n/server";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const lang = await resolveLang(params);
  const dict = getDictionary(lang);

  return (
    <div className="mx-auto flex w-full max-w-[1152px] flex-col gap-10 px-4 py-6">
      <Hero lang={lang} />
      <Suspense fallback={<ProductsSkeleton label={dict.common.loading} />}>
        <HomeProducts lang={lang} />
      </Suspense>
    </div>
  );
}
