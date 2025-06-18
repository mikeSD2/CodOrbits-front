import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./styles/gutenberg-style.min.css";
import "./styles/wp-custom.css";

// Импортируйте Jura шрифт
import { Jura } from "next/font/google";

// Импортируйте Damion шрифтs
import { Damion } from "next/font/google";

const jura = Jura({
    subsets: ["latin"],
    variable: "--font-jura",
});

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const damion = Damion({
    subsets: ["latin"],
    variable: "--font-damion",
    weight: ["400"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "Java Coding Website",
    description: "Learn Java coding with our tutorials",
    icons: {
        icon: "/favicon.svg",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru" className="overflow-x-hidden">
            <body
                className={`${geistSans.variable} ${geistMono.variable} ${jura.variable} ${damion.variable} antialiased overflow-x-hidden`}
            >
                <div className="w-[92%] sm:w-[88%] max-w-[var(--container-width)] mx-auto">
                    <Header />
                    {children}
                    <Footer />
                </div>
            </body>
        </html>
    );
}
