import Link from "next/link";
import Image from "next/image";
import { searchPosts, getPageBySlug } from "@/lib/api/wordpress";
import { Metadata } from "next";
import { decode } from "html-entities";

// Интерфейс для результата поиска
interface SearchResult {
    slug: string;
    title: string;
    excerpt: string;
    coverImage: string;
    date: string;
    technologyLabel: string;
    postType: string;
}

// Генерация метаданных для страницы поиска
export async function generateMetadata({
    searchParams,
}: {
    searchParams: Promise<{ q?: string }>;
}): Promise<Metadata> {
    const { q } = await searchParams;
    const query = q || "";
    const title = query ? `Поиск: ${query}` : "Поиск по сайту";
    const description = query
        ? `Результаты поиска для "${query}" на сайте CodOrbits`
        : "Результаты поиска на сайте CodOrbits";

    try {
        // Try to get SEO data from WordPress search page if available
        const page = await getPageBySlug("search");

        if (page?.yoastSEO) {
            const { yoastSEO } = page;

            return {
                title: query
                    ? `${yoastSEO.title || "Поиск"}: ${query}`
                    : yoastSEO.title || "Поиск по сайту",
                description: query
                    ? `Результаты поиска для "${query}" на сайте CodOrbits`
                    : yoastSEO.description ||
                      "Результаты поиска на сайте CodOrbits",
                openGraph: {
                    title: query
                        ? `${yoastSEO.og_title || "Поиск"}: ${query}`
                        : yoastSEO.og_title || "Поиск по сайту",
                    description: query
                        ? `Результаты поиска для "${query}" на сайте CodOrbits`
                        : yoastSEO.og_description ||
                          "Результаты поиска на сайте CodOrbits",
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
                robots: {
                    index: false, // Search results should not be indexed
                    follow: true,
                    nocache: true,
                    googleBot: {
                        index: false,
                        follow: true,
                        noimageindex: true,
                        "max-video-preview": -1,
                        "max-image-preview": "large",
                        "max-snippet": -1,
                    },
                },
            };
        }
    } catch (error) {
        console.error("Error fetching search page metadata:", error);
    }

    // Default metadata if no Yoast data is available
    return {
        title,
        description,
        robots: {
            index: false, // Search results should not be indexed
            follow: true,
            nocache: true,
        },
    };
}

// Получение результатов поиска
async function getSearchResults(query: string): Promise<SearchResult[]> {
    try {
        if (!query.trim()) {
            return [];
        }
        const results = await searchPosts(query);
        return results;
    } catch (error) {
        console.error("Error fetching search results:", error);
        return [];
    }
}

export default async function SearchPage({
    searchParams,
}: {
    searchParams: Promise<{ q?: string }>;
}) {
    const { q } = await searchParams;
    const query = q || "";
    const searchResults = await getSearchResults(query);

    return (
        <div className="max-w-[var(--container-width)] mx-auto py-8">
            <div className="w-full relative mb-18 mt-5">
                <h1 className="text-(length:--font-size-headings-large) font-[family-name:var(--font-helvetica-rounded)] font-bold text-center max-w-[500px] mx-auto bg-white">
                    Результаты поиска:{" "}
                    <span className="text-blue-600">{query}</span>
                </h1>
                <div className="overflow-hidden w-full relative sm:absolute top-[13px] md:top-[10px] lg:top-[0px] xl:-top-[10px] right-0 z-[-1]">
                    <div className="sm:w-full w-[200%] relative">
                        <Image
                            src="/images/rocket_delimeter_for_archive.svg"
                            alt="Rocket"
                            width={1000}
                            height={500}
                            style={{
                                width: "100%",
                                height: "auto",
                                opacity: 0.7,
                            }}
                            className="ml-[-50%] sm:ml-0"
                        />
                    </div>
                </div>
            </div>

            {searchResults.length === 0 ? (
                <div className="text-center py-10">
                    <h2 className="text-2xl font-bold text-gray-700 mb-4">
                        {query
                            ? "По вашему запросу ничего не найдено"
                            : "Введите поисковый запрос"}
                    </h2>
                    {query && (
                        <p className="text-gray-500">
                            Попробуйте изменить запрос или вернуться на{" "}
                            <Link
                                href="/"
                                className="text-blue-500 hover:underline"
                            >
                                главную страницу
                            </Link>
                        </p>
                    )}
                </div>
            ) : (
                <div className="space-y-8">
                    <h2 className="text-2xl font-bold mb-6 font-[family-name:var(--font-helvetica-rounded)]">
                        <span className="text-blue-600 font-bold text-[31px] font-[family-name:var(--font-helvetica-rounded)]">
                            &#123;&nbsp;
                        </span>{" "}
                        <span className="text-black">
                            Найдено результатов: {searchResults.length}
                        </span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {searchResults.map((result) => (
                            <Link
                                key={`${result.postType}-${result.slug}`}
                                href={`/${
                                    result.postType === "java-lessons"
                                        ? "course"
                                        : "post"
                                }/${result.slug}`}
                                className="group"
                            >
                                <article className="relative border border-gray-200 rounded-[var(--border-radius)] overflow-hidden transition-shadow hover:shadow-lg bg-white">
                                    <div className="relative h-48 overflow-hidden flex justify-center items-center p-4">
                                        <div className="flex justify-center items-center w-[100%] h-[100%] rounded-[var(--border-radius)] bg-gray-100 object-cover transform group-hover:scale-102 transition-transform duration-300 bg-[linear-gradient(100deg,#68B6FF_0.57%,#4698FC_22.44%,#2B7FFF_99.43%)]">
                                            <Image
                                                src="/images/back_small_image1_for_slider_section.svg"
                                                alt="Small Image 1"
                                                width={33}
                                                height={33}
                                                className="absolute top-0 right-0"
                                            />
                                            <Image
                                                src="/images/back_small_image3_for_slider_section.svg"
                                                alt="Small Image 2"
                                                width={33}
                                                height={33}
                                                className="absolute top-[-2px] left-[-2px]"
                                            />
                                            <Image
                                                src="/images/back_small_image2_for_slider_section.svg"
                                                alt="Small Image 3"
                                                width={33}
                                                height={33}
                                                className="absolute bottom-[-2px] right-[-2px]"
                                            />
                                            <h3 className="text-white text-3xl font-bold max-w-[250px] sm:max-w-[280px] md:max-w-[260px] text-center font-[family-name:var(--font-helvetica-rounded)] tracking-[0.05em] break-words">
                                                &lt;{result.technologyLabel}
                                                /&gt;
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                                            {decode(result.title)}
                                        </h3>
                                        <p className="text-gray-600 mb-4">
                                            {decode(result.excerpt)}
                                        </p>
                                        <time className="text-sm text-gray-500">
                                            {new Date(
                                                result.date
                                            ).toLocaleDateString("ru-RU", {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                            })}
                                        </time>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
