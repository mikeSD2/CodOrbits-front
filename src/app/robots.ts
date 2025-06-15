import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.SITE_URL || "https://localhost:3000";

    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/api/", "/admin/", "/_next/"],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
