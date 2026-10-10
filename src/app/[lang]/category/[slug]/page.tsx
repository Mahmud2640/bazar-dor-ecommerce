import type { Metadata } from "next";
import { Suspense } from "react";
import CategoryProducts from "@/components/category-products";
import EmptyState from "@/components/empty-state";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { fmt } from "@/i18n/format";
import { categoryName } from "@/i18n/localize";
import { resolveLang } from "@/i18n/server";
import { getCategories, getProducts } from "@/lib/api";
import { localizeDigits } from "@/lib/format";

type Params = PageProps<"/[lang]/category/[slug]">["params"];

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/category/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const lang = await resolveLang(params);
  const category = (await getCategories()).find((c) => c.slug === slug);
  return { title: category ? categoryName(category.slug, category.nameBn, lang) : getDictionary(lang).notFound.title };
}

function CategorySkeleton({ label }: { label: string }) {
  return (
    <div className="flex flex-col gap-6" aria-busy="true" aria-label={label}>
      <div className="h-[94px] animate-pulse rounded-2xl border border-base-300 bg-base-100" />
      <div className="h-[66px] animate-pulse rounded-2xl border border-base-300 bg-base-100" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="h-[138px] animate-pulse rounded-2xl border border-base-300 bg-base-100" />
        ))}
      </div>
    </div>
  );
}

async function CategoryContent({ params, lang }: { params: Params; lang: Locale }) {
  const { slug } = await params;
  const dict = getDictionary(lang);
  const categories = await getCategories();
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    return (
      <EmptyState
        code={dict.notFound.code}
        title={dict.category.notFoundTitle}
        message={dict.category.notFoundMessage}
        backLabel={dict.common.backHomeButton}
        homeHref={`/${lang}`}
      />
    );
  }

  const products = await getProducts(slug);

  return (
    <div className="flex flex-col gap-6">
      <header className="rounded-2xl border border-base-300 bg-base-100 p-5">
        <div className="flex items-center gap-3">
          <span className="text-4xl leading-10">{category.icon}</span>
          <div>
            <h1 className="text-2xl leading-8 font-bold">
              {categoryName(category.slug, category.nameBn, lang)}
            </h1>
            <p className="text-sm leading-5">
              {fmt(dict.category.summary, { n: localizeDigits(products.length, lang) })}
            </p>
          </div>
        </div>
      </header>

      {products.length === 0 ? (
        <EmptyState
          code={dict.notFound.emptyCode}
          title={dict.category.emptyTitle}
          message={dict.category.emptyMessage}
          backLabel={dict.common.backHomeButton}
          homeHref={`/${lang}`}
        />
      ) : (
        <CategoryProducts products={products} />
      )}
    </div>
  );
}

export default async function CategoryPage({ params }: PageProps<"/[lang]/category/[slug]">) {
  const lang = await resolveLang(params);

  return (
    <div className="mx-auto w-full max-w-[1152px] px-4 py-6">
      <Suspense fallback={<CategorySkeleton label={getDictionary(lang).common.loading} />}>
        <CategoryContent params={params} lang={lang} />
      </Suspense>
    </div>
  );
}
