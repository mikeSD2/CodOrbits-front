import Link from "next/link";
import Image from "next/image";
import ClientRelatedPosts from "./components/ClientRelatedPosts";
import CategoryInfo from "./components/CategoryInfo";
import {
    PostDataProvider,
    PostDataContextType,
} from "./contexts/PostDataContext";
import type { CoursePost } from "./types/post";
import {
    getPostBySlug,
    getRelatedPostsByCategory,
    getCategoryById,
    getAdjacentPosts,
} from "@/lib/api/wordpress";
import { Metadata } from "next";
import { notFound } from "next/navigation";

async function getCoursePost(slug: string): Promise<CoursePost | null> {
    try {
        // Use our API handler to fetch the post data
        const post = await getPostBySlug(slug);
        if (!post) {
            return null;
        }
        return post;
    } catch (error) {
        console.error(`Failed to fetch post with slug ${slug}:`, error);
        return null;
    }
}

export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Promise<Metadata> {
    const post = await getCoursePost(params.slug);

    if (!post) {
        return {
            title: "Страница не найдена",
        };
    }

    // Use Yoast SEO metadata if available
    if (post.yoastSEO) {
        const { yoastSEO } = post;

        return {
            title: yoastSEO.title || `Course - ${post.title}`,
            description: yoastSEO.description || `Learn about ${post.title}`,
            openGraph: {
                title: yoastSEO.og_title || yoastSEO.title || post.title,
                description:
                    yoastSEO.og_description ||
                    yoastSEO.description ||
                    `Learn about ${post.title}`,
                url: yoastSEO.og_url,
                siteName: yoastSEO.og_site_name,
                images: yoastSEO.og_image?.map((img) => ({
                    url: img.url,
                    width: img.width,
                    height: img.height,
                })) || [{ url: post.coverImage }],
                locale: yoastSEO.og_locale,
                type:
                    (yoastSEO.og_type as
                        | "website"
                        | "article"
                        | "book"
                        | "profile") || "article",
            },
            twitter: {
                card: yoastSEO.twitter_card as
                    | "summary"
                    | "summary_large_image"
                    | "app"
                    | "player",
                title: yoastSEO.twitter_title || yoastSEO.title || post.title,
                description:
                    yoastSEO.twitter_description ||
                    yoastSEO.description ||
                    `Learn about ${post.title}`,
                site: yoastSEO.twitter_site,
                images: yoastSEO.twitter_image
                    ? [yoastSEO.twitter_image]
                    : [post.coverImage],
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

    // Fallback to basic metadata if Yoast data isn't available
    return {
        title: `Course - ${post.title}`,
        description: `Learn about ${post.title}`,
        openGraph: {
            title: post.title,
            description: `Learn about ${post.title}`,
            images: [{ url: post.coverImage }],
            type: "article",
        },
    };
}

export default async function CourseLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { slug: string };
}) {
    const post = await getCoursePost(params.slug);

    if (!post) {
        notFound();
    }

    const relatedPosts = await getRelatedPostsByCategory(
        post.categoryId,
        post.slug
    );

    // Fetch the category data if we have a categoryId
    if (post.categoryId) {
        const categoryData = await getCategoryById(post.categoryId);
        if (categoryData) {
            // Update the post with the category information from the API
            post.category = categoryData.name;
            post.categoryDescription =
                categoryData.description || post.categoryDescription;
            // Add the category image if available
            if (categoryData.imageUrl) {
                post.categoryImage = categoryData.imageUrl;
            }
        }
    }

    // Fetch adjacent posts data on the server
    const adjacentPosts = await getAdjacentPosts(params.slug);

    // Prepare the data in the correct structure for the context
    const postData: PostDataContextType = {
        post: post,
        relatedPosts: relatedPosts,
        adjacentPosts: adjacentPosts,
    };

    return (
        <PostDataProvider postData={postData}>
            <>
                <section className="bg-[var(--color-secondary)] rounded-[var(--border-radius)] p-4 md:p-6 lg:p-8 relative mb-12">
                    <CategoryInfo />
                </section>
                <div className="flex w-full">
                    <aside className="w-0 lg:w-4/18 relative lg:block">
                        <div className="sticky top-0 space-y-4 h-[calc(100vh)] overflow-y-auto pr-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:none] hidden lg:block">
                            <div id="related-posts" className="relative pb-4">
                                <div
                                    className="absolute -right-4 top-0 h-full w-[18px]"
                                    style={{
                                        backgroundImage:
                                            "url(/images/articles_nav_line.svg)",
                                        backgroundRepeat: "repeat-y",
                                        backgroundSize: "18px auto",
                                    }}
                                />
                                <Image
                                    src="/images/rocket_for_related_post.svg"
                                    alt="Small Icon"
                                    width={20}
                                    height={20}
                                    className="absolute bottom-[-13px] right-[-9px]"
                                />
                                <ClientRelatedPosts />
                            </div>
                            <Link href="/course" className="w-full sm:w-auto">
                                <button className="bg-white text-black rounded-full w-full sm:w-auto border border-black flex items-center justify-center h-[40px] px-2 text-(length:--font-size-button) font-bold mb-4 mr-3 cursor-pointer">
                                    <Image
                                        src="/images/arrow-for-black-border-button.svg"
                                        alt="Small Icon"
                                        width={20}
                                        height={20}
                                        className="mr-2"
                                    />
                                    <span className="text-black my-0 mr-2">
                                        ВЕРНУТЬСЯ К РАЗДЕЛАМ
                                    </span>
                                </button>
                            </Link>
                        </div>
                    </aside>
                    <main className="w-full lg:w-11/14 lg:pl-10">
                        {children}
                    </main>
                </div>
            </>
        </PostDataProvider>
    );
}
