import type { ReactNode } from "react";
import "./globals.css";

/**
 * The locale layout below (`app/[locale]/layout.tsx`) renders <html>/<body>,
 * so this root layout only needs to pass children through.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
