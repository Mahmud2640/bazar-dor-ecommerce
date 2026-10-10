import Hero from "@/components/hero";

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-[1152px] px-4 py-6">
      <Hero />
      <section id="all-products" className="scroll-mt-4 pt-10">
        <h2 className="text-xl font-bold">সব পণ্য</h2>
      </section>
    </div>
  );
}
