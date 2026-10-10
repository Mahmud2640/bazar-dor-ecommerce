import { notFound } from "next/navigation";

// Any unknown URL under /bn or /en lands here, so it gets the translated 404 page inside the layout.
export default function CatchAll() {
  notFound();
}
