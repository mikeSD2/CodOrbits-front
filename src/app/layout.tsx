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
import Script from "next/script";

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
    other: {
        "yandex-verification": "112fa41e5b9c2a04",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru" className="overflow-x-hidden">
            <head>
                <script
                    src="https://analytics.ahrefs.com/analytics.js"
                    data-key="a7BBaQB6x2Y0kiKkxwad6A"
                    async
                ></script>
                <Script
                    id="google-analytics"
                    strategy="afterInteractive"
                    src="https://www.googletagmanager.com/gtag/js?id=G-YT5DG6984J"
                />
                <Script
                    id="google-analytics-script"
                    strategy="afterInteractive"
                >
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-YT5DG6984J');  
                `}
                </Script>
            </head>
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
