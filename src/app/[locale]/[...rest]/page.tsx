import { notFound } from "next/navigation";

/** Forces the locale `not-found` UI for unknown paths like `/en/missing`. */
export default function CatchAllPage() {
  notFound();
}
