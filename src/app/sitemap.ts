import { getAllPosts } from "@/lib/api/wordpress";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.SITE_URL || "https://www.codorbits.com";
    let courseEntries: Array<{
        url: string;
        lastModified: Date;
        changeFrequency:
            | "always"
            | "hourly"
            | "daily"
            | "weekly"
            | "monthly"
            | "yearly"
            | "never";
        priority: number;
    }> = [];
    let blogEntries: Array<{
        url: string;
        lastModified: Date;
        changeFrequency:
            | "always"
            | "hourly"
            | "daily"
            | "weekly"
            | "monthly"
            | "yearly"
            | "never";
        priority: number;
    }> = [];
    const categoryEntries: Array<{
        url: string;
        lastModified: Date;
        changeFrequency:
            | "always"
            | "hourly"
            | "daily"
            | "weekly"
            | "monthly"
            | "yearly"
            | "never";
        priority: number;
    }> = [];

    try {
        // Get all course posts (java lessons)
        const posts = await getAllPosts();
        courseEntries = posts.map((post) => ({
            url: `${baseUrl}/course/${post.slug}`,
            lastModified: new Date(post.date),
            changeFrequency: "weekly" as const,
            priority: 0.8,
        }));

        // For blog posts, we're using the same API but mapping to different URLL
        blogEntries = posts
            .filter((post) => post.technologyLabel === "Блог") // Assuming this is how blog posts are identified
            .map((post) => ({
                url: `${baseUrl}/post/${post.slug}`,
                lastModified: new Date(post.date),
                changeFrequency: "weekly" as const,
                priority: 0.7,
            }));
    } catch (error) {
        console.error("Error fetching posts for sitemap:", error);
    }

    // Define static pages ddd
    const staticPages = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "daily" as const,
            priority: 1.0,
        },
        {
            url: `${baseUrl}/course`,
            lastModified: new Date(),
            changeFrequency: "daily" as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.5,
        },
        {
            url: `${baseUrl}/privacy-policy`,
            lastModified: new Date(),
            changeFrequency: "yearly" as const,
            priority: 0.3,
        },
        {
            url: `${baseUrl}/sitemap-html`,
            lastModified: new Date(),
            changeFrequency: "yearly" as const,
            priority: 0.3,
        },
    ];

    // Combine all entries
    return [
        ...staticPages,
        ...courseEntries,
        ...blogEntries,
        ...categoryEntries,
    ];
}
