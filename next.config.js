/** @type {import('next').NextConfig} */

const securityHeaders = [
    {
        key: "Content-Security-Policy",
        value: `
      default-src 'self';
      script-src 'self' 'unsafe-inline';
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: https: http:;
      connect-src 'self' https://yourwordpress.com;
      font-src 'self' https:;
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
        SITE_URL: process.env.SITE_URL || "http://localhost:3000",
        WORDPRESS_API_URL:
            process.env.WORDPRESS_API_URL ||
            "http://localhost/BitBrew/wp-json/wp/v2",
    },
};

module.exports = nextConfig;
