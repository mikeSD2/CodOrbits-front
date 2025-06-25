import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import "./styles/gutenberg-style.min.css";
import "./styles/wp-custom.css";
import { GoogleAnalytics } from "@next/third-parties/google";

// Импортируйте Jura шрифт3
import { Jura } from "next/font/google";

// Импортируйте Damion шрифт3
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
        icon: "/images/favicon.png",
    },
    other: {
        "yandex-verification": "112fa41e5b9c2a04",
    },
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru">
            <head>
                <link rel="icon" href="/images/favicon.ico" />

                <meta name="yandex-verification" content="3614f4e633fb4b3b" />

                {/* Ahrefs Analytics */}
                <script
                    src="https://analytics.ahrefs.com/analytics.js"
                    data-key="a7BBaQB6x2Y0kiKkxwad6A"
                    async
                />

                {/* Top100 (Kraken) Counter */}
                <Script id="top100-counter" strategy="afterInteractive">
                    {`
                    (function (w, d, c) {
                        (w[c] = w[c] || []).push(function() {
                            var options = {
                                project: 7747631,
                            };
                            try {
                                w.top100Counter = new top100(options);
                            } catch(e) { }
                        });
                        var n = d.getElementsByTagName("script")[0],
                        s = d.createElement("script"),
                        f = function () { n.parentNode.insertBefore(s, n); };
                        s.type = "text/javascript";
                        s.async = true;
                        s.src =
                        (d.location.protocol == "https:" ? "https:" : "http:") +
                        "//st.top100.ru/top100/top100.js";

                        if (w.opera == "[object Opera]") {
                            d.addEventListener("DOMContentLoaded", f, false);
                        } else { f(); }
                    })(window, document, "_top100q");
                    `}
                </Script>
                <noscript>
                    <img
                        src="//counter.rambler.ru/top100.cnt?pid=7747631"
                        alt="Топ-100"
                    />
                </noscript>
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
            <GoogleAnalytics gaId="GT-5D9JZ73R" />
        </html>
    );
}
