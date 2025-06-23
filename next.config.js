/** @type {import('next').NextConfig} */

const securityHeaders = [
    {
        key: "Content-Security-Policy",
        value: `
          default-src 'none';
          script-src 'self' 'unsafe-inline'
                      https://www.googletagmanager.com
                      https://www.google-analytics.com
                      https://www.gstatic.com
                      https://translate.googleapis.com
                      https://translate-pa.googleapis.com
                      https://www.google.com/recaptcha/
                      https://analytics.ahrefs.com
                      https://translate.google.com
                      https://st.top100.ru;
          style-src 'self' 'unsafe-inline'
                     https://fonts.googleapis.com
                     https://www.gstatic.com;
          img-src 'self' https: data:;
          media-src 'self' blob:;
          font-src 'self' https://fonts.gstatic.com;
          connect-src 'self'
                      https://codorbits-api.online
                      https://www.google-analytics.com
                      https://region1.google-analytics.com
                      https://www.google.com/recaptcha/
                      https://analytics.ahrefs.com
                      https://translate.googleapis.com
                      https://translate-pa.googleapis.com
                      https://www.gstatic.com;
          frame-src 'self' https://www.google.com;
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
        SITE_URL: process.env.SITE_URL || "https://www.codorbits.com",
        WORDPRESS_API_URL:
            process.env.WORDPRESS_API_URL ||
            "https://codorbits-api.online/wp-json/wp/v2",
    },
};

module.exports = nextConfig;
