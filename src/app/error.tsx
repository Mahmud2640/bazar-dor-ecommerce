"use client";

import { Button } from "@heroui/react";

// Next.js shows this page when something fails, for example when the API does not answer
export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="mx-auto flex max-w-[1152px] flex-col items-center gap-3 px-4 py-20 text-center">
      <h1 className="text-2xl font-bold">কিছু একটা ভুল হয়েছে / Something went wrong</h1>
      <p className="text-sm">দাম লোড করা যায়নি। Could not load the prices.</p>

      {/* reset() tries to load the page again */}
      <Button onPress={reset} className="h-10">
        আবার চেষ্টা করুন / Try again
      </Button>
    </div>
  );
}
