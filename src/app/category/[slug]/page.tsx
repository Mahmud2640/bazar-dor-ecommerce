import { Suspense } from "react";
import CategoryProducts from "@/components/category-products";
import EmptyState from "@/components/empty-state";
import { getCategories, getProducts } from "@/lib/api";
import { toBn } from "@/lib/format";

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/category/[slug]">) {
  const { slug } = await params;
  const category = (await getCategories()).find((c) => c.slug === slug);
  return { title: category ? `${category.nameBn} | বাজার দর` : "পাওয়া যায়নি | বাজার দর" };
}

function CategorySkeleton() {
  return (
    <div className="flex flex-col gap-6" aria-busy="true" aria-label="লোড হচ্ছে">
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

async function CategoryContent({ params }: { params: PageProps<"/category/[slug]">["params"] }) {
  const { slug } = await params;
  const categories = await getCategories();
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    return (
      <EmptyState
        title="ক্যাটাগরি পাওয়া যায়নি"
        message="আপনি যে ক্যাটাগরিটি খুঁজছেন তা নেই বা সরিয়ে ফেলা হয়েছে।"
      />
    );
  }

  const products = await getProducts(slug);

  return (
    <div className="flex flex-col gap-6">
      <header className="rounded-2xl border border-base-300 bg-base-100 p-[21px]">
        <div className="flex items-center gap-3">
          <span className="text-4xl leading-10">{category.icon}</span>
          <div>
            <h1 className="text-2xl leading-8 font-bold">{category.nameBn}</h1>
            <p className="text-sm leading-5">
              {toBn(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>
      </header>

      {products.length === 0 ? (
        <EmptyState
          code="০"
          title="কোনো পণ্য পাওয়া যায়নি"
          message="এই ক্যাটাগরিতে এখন কোনো পণ্য নেই।"
        />
      ) : (
        <CategoryProducts products={products} />
      )}
    </div>
  );
}

export default function CategoryPage({ params }: PageProps<"/category/[slug]">) {
  return (
    <div className="mx-auto w-full max-w-[1152px] px-4 py-6">
      <Suspense fallback={<CategorySkeleton />}>
        <CategoryContent params={params} />
      </Suspense>
    </div>
  );
}
