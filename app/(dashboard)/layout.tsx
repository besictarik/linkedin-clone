import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Linkedin Clone",
    description: "Linkedin Clone coded in a Weekend",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body className={`${inter.className} flex min-h-screen flex-col`}>
                <Toaster position={"bottom-left"} />
                <header className={"sticky top-0 z-50 border-b bg-white"}>
                    <Header />
                </header>
                <div className={"w-full flex-1 bg-[#F4F2ED]"}>
                    <main className={"mx-auto max-w-6xl"}>{children}</main>
                </div>
            </body>
        </html>
    );
}
