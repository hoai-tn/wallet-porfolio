"use client";
import NavBar from "@/app/components/NavBar";
import "./globals.css";
import { Inter } from "next/font/google";
import SideBarDesktop from "@/app/components/Sidebar/SidebarDesktop";
import SidebarMobile from "@/app/components/Sidebar/SidebarMobile";
import Providers from "./ThemeProviders";
import { GlobalContextProvider } from "./Context/store";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
        />
      </head>
      <body className={inter.className}>
        <GlobalContextProvider>
          <Providers>
            <div className="block md:flex relative">
              <SideBarDesktop />
              <SidebarMobile />
              <div className="w-full p-[30px]">
                <NavBar />
                {children}
              </div>
            </div>
          </Providers>
        </GlobalContextProvider>
      </body>
    </html>
  );
}
