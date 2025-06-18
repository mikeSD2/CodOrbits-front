import Link from "next/link";
import Image from "next/image";
import {
    getAllCategories,
    getPostsByCategory,
    getPageBySlug,
} from "@/lib/api/wordpress";
import { decode } from "html-entities";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    try {
        const page = await getPageBySlug("courses");

        if (page?.yoastSEO) {
            const { yoastSEO } = page;

            return {
                title: yoastSEO.title || "Уроки Java | CodOrbits",
                description:
                    yoastSEO.description ||
                    "Полный курс по Java программированию для начинающих и продвинутых разработчиков",
                alternates: {
                    canonical: "https://www.codorbits.com/course",
                },
                openGraph: {
                    title:
                        yoastSEO.og_title ||
                        yoastSEO.title ||
                        "Уроки Java | CodOrbits",
                    description:
                        yoastSEO.og_description ||
                        yoastSEO.description ||
                        "Полный курс по Java программированию для начинающих и продвинутых разработчиков",
                    url: "https://www.codorbits.com/course",
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
                        "Уроки Java | CodOrbits",
                    description:
                        yoastSEO.twitter_description ||
                        yoastSEO.description ||
                        "Полный курс по Java программированию для начинающих и продвинутых разработчиков",
                    site: yoastSEO.twitter_site,
                    images: yoastSEO.twitter_image
                        ? [yoastSEO.twitter_image]
                        : undefined,
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
            title: "Уроки Java | CodOrbits",
            description:
                "Полный курс по Java программированию для начинающих и продвинутых разработчиков",
            alternates: {
                canonical: "https://www.codorbits.com/course",
            },
        };
    } catch (error) {
        console.error("Error fetching course page metadata:", error);
        return {
            title: "Уроки Java | CodOrbits",
            description:
                "Полный курс по Java программированию для начинающих и продвинутых разработчиков",
        };
    }
}

// Интерфейс для категории
interface Category {
    id: number;
    name: string;
    description: string;
    count: number;
    sortOrder: number;
    imageUrl: string;
    posts: CoursePostPreview[];
}

// Интерфейс для превью поста
interface CoursePostPreview {
    slug: string;
    title: string;
    excerpt: string;
    coverImage: string;
    date: string;
    technologyLabel: string;
}

// Получение категорий с постами
async function getCategoriesWithPosts(): Promise<Category[]> {
    try {
        // Получаем все категории
        const categories = await getAllCategories();

        // Для каждой категории получаем посты
        const categoriesWithPosts = await Promise.all(
            categories
                .filter((category) => category.count > 0) // Только категории с постами
                .map(async (category) => {
                    const posts = await getPostsByCategory(category.id);
                    return {
                        ...category,
                        posts,
                    };
                })
        );

        return categoriesWithPosts;
    } catch (error) {
        console.error("Error fetching categories with posts:", error);
        return [];
    }
}

export default async function CoursePage() {
    const categoriesWithPosts = await getCategoriesWithPosts();

    return (
        <div className="max-w-[var(--container-width)] mx-auto py-8">
            <div className="w-full relative mb-18 mt-5">
                {/* Контейнер с ограниченной видимостью для ракеты */}
                <h1 className="text-(length:--font-size-headings-large) font-[family-name:var(--font-helvetica-rounded)] font-bold text-center max-w-[250px] mx-auto bg-white">
                    Уроки <span className="text-blue-600">Java</span>
                </h1>
                <div className="overflow-hidden w-full relative sm:absolute top-[13px] md:top-[10px] lg:top-[0px] xl:-top-[10px] right-0 z-[-1]">
                    {/* Контейнер с удвоенной шириной на мобильных устройствах */}
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
            {categoriesWithPosts.length === 0 ? (
                <div className="text-center text-gray-500 py-10">
                    Нет доступных уроков
                </div>
            ) : (
                <div className="space-y-16">
                    {categoriesWithPosts.map((category) => (
                        <div key={category.id} className="category-section">
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold mb-2 text-blue-600 font-[family-name:var(--font-helvetica-rounded)]">
                                    <span className="text-blue-600 font-bold text-[31px] font-[family-name:var(--font-helvetica-rounded)]">
                                        &#123;&nbsp;
                                    </span>{" "}
                                    <span className="text-black">
                                        Раздел{" "}
                                        {categoriesWithPosts.indexOf(category) +
                                            1}
                                        :{" "}
                                    </span>{" "}
                                    {category.name}
                                </h2>
                                {/* {category.description && (
                                    <p className="text-gray-600">
                                        {category.description}
                                    </p>
                                )} */}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {category.posts.map((post) => (
                                    <Link
                                        key={post.slug}
                                        href={`/course/${post.slug}`}
                                        className="group"
                                    >
                                        <article className="relative border border-gray-200 rounded-[var(--border-radius)] overflow-hidden transition-shadow hover:shadow-lg bg-white">
                                            <div className="relative h-48 overflow-hidden flex justify-center items-center p-4">
                                                <div className="flex justify-center items-center w-[100%] h-[100%] rounded-[var(--border-radius)] bg-gray-100 object-cover transform group-hover:scale-102 transition-transform duration-300 bg-[linear-gradient(100deg,#68B6FF_0.57%,#4698FC_22.44%,#2B7FFF_99.43%)] relative">
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
                                                        &lt;
                                                        {post.technologyLabel}
                                                        /&gt;
                                                    </h3>
                                                </div>
                                            </div>
                                            <div className="p-4">
                                                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                                                    {decode(post.title)}
                                                </h3>
                                                <p className="text-gray-600 mb-4">
                                                    {decode(post.excerpt)}
                                                </p>
                                                <time className="text-sm text-gray-500">
                                                    {new Date(
                                                        post.date
                                                    ).toLocaleDateString(
                                                        "ru-RU",
                                                        {
                                                            day: "numeric",
                                                            month: "long",
                                                            year: "numeric",
                                                        }
                                                    )}
                                                </time>
                                            </div>
                                        </article>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
