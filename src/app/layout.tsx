import type { ReactNode } from "react";
import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
