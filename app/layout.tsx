import "./globals.css";
import {Inter} from "next/font/google"

export const metadata = {
  title: "ChatZilla",
  description: "Powerful, fast, dynamic messaging platform for seamless communication.",
};

const inter = Inter({subsets : ["latin"]})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
