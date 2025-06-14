import DOMPurify from "dompurify";

// Configure DOMPurify to allow needed tags and attributes
const configureOptions = () => {
    return {
        ADD_TAGS: ["iframe", "syntax-highlighter"], // Allow specific custom tags
        ADD_ATTR: [
            "data-language",
            "allowfullscreen",
            "frameborder",
            "srcset",
            "sizes",
        ], // Allow specific attributes
        USE_PROFILES: { html: true },
    };
};

// Sanitize HTML content
export const sanitizeHtml = (html: string): string => {
    if (typeof window !== "undefined") {
        // Client-side sanitization
        return DOMPurify.sanitize(html, configureOptions());
    } else {
        // Return the original content on the server since DOMPurify requires DOM
        // The content will be sanitized on the client
        return html;
    }
};
