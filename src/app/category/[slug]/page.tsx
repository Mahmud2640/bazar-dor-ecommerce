import { Card } from "@heroui/react";
import CategoryProducts from "@/components/category-products";
import EmptyState from "@/components/empty-state";
import { texts } from "@/data/texts";
import { getCategories, getProducts } from "@/lib/api";
import { showNumber } from "@/lib/format";
import { getLang } from "@/lib/language";
import { getCategoryName } from "@/lib/names";

type Props = {
  // slug is the last part of the address, for example "chal" in /category/chal
  params: Promise<{ slug: string }>;
};

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const lang = await getLang();
  const t = texts[lang];

  // find this category in the list of all categories
  const categories = await getCategories();
  const category = categories.find((item) => item.slug === slug);

  // the address has a wrong category name
  if (!category) {
    return (
      <div className="mx-auto max-w-[1152px] px-4 py-6">
        <EmptyState
          code={t.notFoundCode}
          title={t.categoryNotFoundTitle}
          text={t.categoryNotFoundText}
          lang={lang}
        />
      </div>
    );
  }

  // get only the products of this category
  const products = await getProducts(slug);

  return (
    <div className="mx-auto flex max-w-[1152px] flex-col gap-6 px-4 py-6">
      {/* category icon and name */}
      <Card className="rounded-2xl border border-border p-5 shadow-none">
        <div className="flex items-center gap-3">
          <span className="text-4xl leading-10">{category.icon}</span>
          <div>
            <h1 className="text-2xl leading-8 font-bold">{getCategoryName(category, lang)}</h1>
            <p className="text-sm leading-5">{t.categorySummary(showNumber(products.length, lang))}</p>
          </div>
        </div>
      </Card>

      {/* the category has no products */}
      {products.length === 0 ? (
        <EmptyState code="0" title={t.noProductTitle} text={t.categoryEmptyText} lang={lang} />
      ) : (
        <CategoryProducts products={products} lang={lang} />
      )}
    </div>
  );
}
