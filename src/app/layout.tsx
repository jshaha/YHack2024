import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CustomLayout from "./customLayout";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <Head> */}
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <title>{"Lecture-Agent"}</title>
      <meta name="description" content={"Lecture-Agent"} />
      {/* </Head> */}
      <body className={inter.className}>
        <CustomLayout>{children}</CustomLayout>
      </body>
    </html>
  );
}
