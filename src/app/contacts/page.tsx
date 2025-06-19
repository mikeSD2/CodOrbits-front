import { Metadata } from "next";
import ContactForm from "@/app/components/ContactForm";
import Image from "next/image";
import { getPageBySlug } from "@/lib/api/wordpress";

export async function generateMetadata(): Promise<Metadata> {
    try {
        const page = await getPageBySlug("contact");

        if (!page) {
            return {
                title: "Связаться с нами | CodOrbits",
                description:
                    "Отправьте нам сообщение через форму обратной связи. Мы рады помочь вам с вопросами по Java-разработке.",
                alternates: {
                    canonical: "https://www.codorbits.com/contacts/",
                },
            };
        }

        if (page.yoastSEO) {
            const { yoastSEO } = page;

            return {
                title: yoastSEO.title || "Связаться с нами | CodOrbits",
                description:
                    yoastSEO.description ||
                    "Отправьте нам сообщение через форму обратной связи. Мы рады помочь вам с вопросами по Java-разработке.",
                openGraph: {
                    title:
                        yoastSEO.og_title ||
                        yoastSEO.title ||
                        "Связаться с нами | CodOrbits",
                    description:
                        yoastSEO.og_description ||
                        yoastSEO.description ||
                        "Отправьте нам сообщение через форму обратной связи. Мы рады помочь вам с вопросами по Java-разработке.",
                    url: "https://www.codorbits.com/contacts/",
                    siteName: yoastSEO.og_site_name,
                    images:
                        yoastSEO.og_image?.map((img) => ({
                            url: img.url,
                            width: img.width,
                            height: img.height,
                        })) || [],
                    locale: yoastSEO.og_locale,
                    type:
                        (yoastSEO.og_type as
                            | "website"
                            | "article"
                            | "book"
                            | "profile") || "website",
                },
                twitter: {
                    card: yoastSEO.twitter_card as
                        | "summary"
                        | "summary_large_image"
                        | "app"
                        | "player",
                    title:
                        yoastSEO.twitter_title ||
                        yoastSEO.title ||
                        "Связаться с нами | CodOrbits",
                    description:
                        yoastSEO.twitter_description ||
                        yoastSEO.description ||
                        "Отправьте нам сообщение через форму обратной связи. Мы рады помочь вам с вопросами по Java-разработке.",
                    site: yoastSEO.twitter_site,
                    images: yoastSEO.twitter_image
                        ? [yoastSEO.twitter_image]
                        : undefined,
                },
                alternates: {
                    canonical: yoastSEO.canonical,
                },
                robots: {
                    index: yoastSEO.robots.index !== "noindex",
                    follow: yoastSEO.robots.follow !== "nofollow",
                    nocache: false,
                    googleBot: {
                        index: yoastSEO.robots.index !== "noindex",
                        follow: yoastSEO.robots.follow !== "nofollow",
                        noimageindex: false,
                        "max-video-preview": -1,
                        "max-image-preview": "large",
                        "max-snippet": -1,
                    },
                },
            };
        }

        return {
            title: "Связаться с нами | CodOrbits",
            description:
                "Отправьте нам сообщение через форму обратной связи. Мы рады помочь вам с вопросами по Java-разработке.",
            alternates: {
                canonical: "https://www.codorbits.com/contacts/",
            },
        };
    } catch (error) {
        console.error("Error fetching contact page metadata:", error);
        return {
            title: "Связаться с нами | CodOrbits",
            description:
                "Отправьте нам сообщение через форму обратной связи. Мы рады помочь вам с вопросами по Java-разработке.",
        };
    }
}

export default function ContactPage() {
    return (
        <div className="max-w-[var(--container-width)] mx-auto py-8">
            <h1 className="mt-5 text-(length:--font-size-headings-large) font-[family-name:var(--font-helvetica-rounded)] font-bold mb-6 text-center">
                Связаться с <span className="text-blue-600">нами</span>
            </h1>
            <div className="relative mt-23 mb-12 p-2 sm:p-[25px] bg-gradient-to-r from-blue-500 to-blue-100 rounded-2xl sm:rounded-4xl">
                <Image
                    src="/images/back_for_contact_us_page.svg"
                    alt="Button background"
                    width={100}
                    height={150}
                    quality={100}
                    className="h-[calc(100%+80px)] w-full lg:w-[110%] xl:w-full max-w-[110%] absolute -left-2 lg:left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[0]"
                />
                <Image
                    src="/images/back_for_contact_us_page.svg"
                    alt="Button background"
                    width={100}
                    height={150}
                    quality={100}
                    className="w-full absolute top-1/2 transform -translate-y-1/2 z-[0] -right-[8vw] lg:hidden block"
                />
                <div className="max-w-3xl mx-auto bg-white relative p-6 rounded-lg shadow-sm z-[1]">
                    <p className="text-gray-700 mb-6">
                        Есть вопросы, предложения или просто хотите поговорить о
                        Java-разработке? Заполните форму ниже, и мы свяжемся с
                        вами в ближайшее время.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div>
                            <h3 className="text-xl font-bold mb-3">
                                Наши контакты
                            </h3>
                            <ul className="space-y-2 text-gray-700">
                                <li className="flex items-center">
                                    <svg
                                        className="w-5 h-5 text-blue-600 mr-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        ></path>
                                    </svg>
                                    <span>info@codorbits.com</span>
                                </li>
                                <li className="flex items-center">
                                    <svg
                                        className="w-5 h-5 text-blue-600 mr-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                        ></path>
                                    </svg>
                                    <span>+7 (999) 123-45-67</span>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold mb-3">
                                Часы работы
                            </h3>
                            <ul className="space-y-1 text-gray-700">
                                <li className="flex justify-between">
                                    <span>Понедельник - Пятница:</span>
                                    <span>9:00 - 18:00</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Суббота:</span>
                                    <span>10:00 - 15:00</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Воскресенье:</span>
                                    <span>Выходной</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <ContactForm />
        </div>
    );
}
