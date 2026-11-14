import type { ReactNode } from "react";
import { PT_Serif } from "next/font/google";
import "./globals.css";

const ptSerif = PT_Serif({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export default function RoorLayout({
  children
}: {
  children: ReactNode
}) {
  return(
      <html lang="en">
          <body className={ptSerif.className}>
              {children}
          </body>
      </html>
  );
}