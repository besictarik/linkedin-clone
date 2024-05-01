import "../../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Linkedin Clone | Sign In",
    description: "Linkedin Clone coded in a Weekend",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body
                className={`${inter.className} flex min-h-screen w-full items-center justify-center`}>
                {children}
            </body>
        </html>
    );
}
