import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
    getAllCategories,
    getPostsByCategory,
    getPageBySlug,
} from "@/lib/api/wordpress";

export async function generateMetadata(): Promise<Metadata> {
    try {
        const page = await getPageBySlug("sitemap");

        if (page?.yoastSEO) {
            const { yoastSEO } = page;

            return {
                title: yoastSEO.title || "Sitemap | CodOrbits",
                description:
                    yoastSEO.description ||
                    "Overview of all pages and resources on CodOrbits",
                openGraph: {
                    title:
                        yoastSEO.og_title ||
                        yoastSEO.title ||
                        "Sitemap | CodOrbits",
                    description:
                        yoastSEO.og_description ||
                        yoastSEO.description ||
                        "Overview of all pages and resources on CodOrbits",
                    url: yoastSEO.og_url,
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
                        "Sitemap | CodOrbits",
                    description:
                        yoastSEO.twitter_description ||
                        yoastSEO.description ||
                        "Overview of all pages and resources on CodOrbits",
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
            title: "Sitemap | CodOrbits",
            description: "Overview of all pages and resources on CodOrbits",
        };
    } catch (error) {
        console.error("Error fetching sitemap metadata:", error);
        return {
            title: "Sitemap | CodOrbits",
            description: "Overview of all pages and resources on CodOrbits",
        };
    }
}

interface SitemapSection {
    title: string;
    links: {
        title: string;
        url: string;
    }[];
}

export default async function SitemapPage() {
    // Fetch all categories for the sitemap
    const categories = await getAllCategories();

    // Define the main pages section
    const mainPages: SitemapSection = {
        title: "Основные страницы",
        links: [
            { title: "Главная", url: "/" },
            { title: "Политика конфиденциальности", url: "/privacy-policy" },
            { title: "Карта сайта", url: "/sitemap" },
        ],
    };

    // Create a section for each category with its posts
    const categoryPagesPromises = categories.map(async (category) => {
        // Получаем все посты для каждой категории с помощью limit=-1
        const categoryPosts = await getPostsByCategory(category.id, -1);

        return {
            title: category.name,
            links: categoryPosts.map((post) => ({
                title: post.title,
                url: `/course/${post.slug}`,
            })),
        };
    });

    // Ждем завершения всех запросов
    const categoryPages = await Promise.all(categoryPagesPromises);

    // Combine all sections
    const allSections = [
        mainPages,
        ...categoryPages.filter((section) => section.links.length > 0),
    ];

    return (
        <div className="max-w-[var(--container-width)] mx-auto mb-16">
            <div className="mb-8 text-center relative">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                    Карта сайта
                </h1>
                <div className="w-24 h-1 bg-blue-500 mx-auto"></div>
                <Image
                    src="/images/rocket-delimeter.svg"
                    alt="Rocket"
                    width={80}
                    height={80}
                    className="w-full h-12 my-6"
                />
            </div>

            <div className="bg-[var(--color-secondary)] rounded-[var(--border-radius)] p-4 md:p-6 lg:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {allSections.map((section, index) => (
                        <div key={index} className="mb-6">
                            <h2 className="text-xl font-bold mb-4 text-blue-600">
                                {section.title}
                            </h2>
                            <ul className="space-y-2">
                                {section.links.map((link, linkIndex) => (
                                    <li
                                        key={linkIndex}
                                        className="hover:text-blue-500 transition-colors"
                                    >
                                        <Link
                                            href={link.url}
                                            className="text-[16px] font-light"
                                        >
                                            {link.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
