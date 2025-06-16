/** @type {import('next').NextConfig} */

const securityHeaders = [
    {
        key: "Content-Security-Policy",
        value: `
        default-src 'none';
        script-src 'self' 'unsafe-inline';
        style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
        img-src 'self' https: data:;
        font-src 'self' https://fonts.gstatic.com;
        connect-src 'self' https://codorbits-api.online;
        frame-src 'none';
        object-src 'none';
      `
            .replace(/\s{2,}/g, " ")
            .trim(),
    },
];

const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ["localhost"],
    },
    async headers() {
        return [
            {
                source: "/(.*)",
                headers: securityHeaders,
            },
        ];
    },
    // Enable trailing slash to better match WordPress URL structure
    trailingSlash: true,
    // Environment variables available on the client
    env: {
        SITE_URL: process.env.SITE_URL || "https://codorbits.com",
        WORDPRESS_API_URL:
            process.env.WORDPRESS_API_URL ||
            "https://codorbits-api.online/wp-json/wp/v2",
    },
};

module.exports = nextConfig;
