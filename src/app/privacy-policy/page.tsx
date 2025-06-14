import { getPageBySlug } from "@/lib/api/wordpress";
import { Metadata } from "next";
import PostContent from "@/app/components/PostContent";
import Image from "next/image";
import { notFound } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
    try {
        const page = await getPageBySlug("privacy-policy");

        if (!page) {
            return {
                title: "Privacy Policy | CodOrbits",
                description: "Our privacy policy and data handling practices",
            };
        }

        if (page.yoastSEO) {
            const { yoastSEO } = page;

            return {
                title: yoastSEO.title || "Privacy Policy | CodOrbits",
                description:
                    yoastSEO.description ||
                    "Our privacy policy and data handling practices",
                openGraph: {
                    title:
                        yoastSEO.og_title ||
                        yoastSEO.title ||
                        "Privacy Policy | CodOrbits",
                    description:
                        yoastSEO.og_description ||
                        yoastSEO.description ||
                        "Our privacy policy and data handling practices",
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
                        "Privacy Policy | CodOrbits",
                    description:
                        yoastSEO.twitter_description ||
                        yoastSEO.description ||
                        "Our privacy policy and data handling practices",
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
            title: "Privacy Policy | CodOrbits",
            description: "Our privacy policy and data handling practices",
        };
    } catch (error) {
        console.error("Error fetching privacy policy metadata:", error);
        return {
            title: "Privacy Policy | CodOrbits",
            description: "Our privacy policy and data handling practices",
        };
    }
}

export default async function PrivacyPolicyPage() {
    const page = await getPageBySlug("privacy-policy");

    if (!page) {
        notFound();
    }

    return (
        <div className="max-w-[var(--container-width)] mx-auto mb-16">
            <div className="mb-8 text-center relative">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                    {page.title}
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
                <article className="prose prose-lg max-w-none">
                    <PostContent content={page.content} />
                </article>
            </div>
        </div>
    );
}
