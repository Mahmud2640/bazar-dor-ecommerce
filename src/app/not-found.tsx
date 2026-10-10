import EmptyState from "@/components/empty-state";

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-[1152px] px-4 py-10">
      <EmptyState
        title="পেজটি পাওয়া যায়নি"
        message="আপনি যে পেজটি খুঁজছেন সেটি নেই বা সরিয়ে ফেলা হয়েছে।"
      />
    </div>
  );
}
