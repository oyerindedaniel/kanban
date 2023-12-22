import "@/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import DashboardLayout from "@/components/DashboardLayout";

import { TRPCReactProvider } from "@/trpc/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "",
  description: "",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider cookies={cookies().toString()}>
          <DashboardLayout>{children}</DashboardLayout>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
