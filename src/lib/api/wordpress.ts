import { CoursePost } from "@/app/course/[slug]/types/post";

/**
 * Interface for WordPress Graph Item used in Yoast SEO
 */
interface WordPressGraphItem {
    id: string;
    type: string;
    [key: string]: unknown;
}

/**
 * Interface for search result post
 */
interface SearchResultPost {
    slug: string;
    title: string;
    excerpt: string;
    coverImage: string;
    date: string;
    technologyLabel: string;
    postType: string;
}

/**
 * Interface for Yoast SEO metadata
 */
export interface YoastSEO {
    title: string;
    description: string;
    robots: {
        index: string;
        follow: string;
        "max-snippet": string;
        "max-image-preview": string;
        "max-video-preview": string;
    };
    canonical: string;
    og_locale: string;
    og_type: string;
    og_title: string;
    og_description: string;
    og_url: string;
    og_site_name: string;
    og_image?: Array<{
        url: string;
        width: number;
        height: number;
        type: string;
    }>;
    twitter_card: string;
    twitter_title?: string;
    twitter_description?: string;
    twitter_image?: string;
    twitter_site?: string;
    schema?: {
        "@context": string;
        "@graph": Array<WordPressGraphItem>;
    };
}

/**
 * Interface for WordPress post from API
 */
interface WordPressPost {
    slug: string;
    title: { rendered: string };
    content: { rendered: string };
    excerpt?: { rendered: string };
    featured_media_url?: string;
    date: string;
    author_name?: string;
    author_avatar?: string;
    categories_name?: string[];
    category_description?: string;
    lesson_category?: number[];
    meta?: {
        _lesson_sections?: unknown[];
        _additional_materials?: unknown[];
        technology_label?: string;
    };
    yoast_head_json?: YoastSEO;
    [key: string]: unknown;
}

/**
 * Interface for WordPress category from API
 */
interface WordPressCategory {
    id: number;
    name: string;
    description: string;
    count: number;
    meta?: {
        lesson_category_sort_order?: string;
        lesson_category_image?: string;
    };
    lesson_category_sort_order?: string;
    lesson_category_image?: string;
    [key: string]: unknown;
}

const BASE_URL = "http://51.21.195.168/wp-json/wp/v2";

/**
 * Fetches a post from WordPress API by slug
 * @param slug - The post slug to fetch
 * @returns Promise with the post data
 */
export async function getPostBySlug(slug: string): Promise<CoursePost> {
    try {
        const response = await fetch(
            `${BASE_URL}/java-lessons?slug=${slug}&_embed`
        );

        if (!response.ok) {
            throw new Error(`Error fetching post: ${response.status}`);
        }

        const posts = await response.json();

        // WordPress returns an array even when filtering by slug
        if (posts.length === 0) {
            throw new Error(`Post with slug "${slug}" not found`);
        }

        const post = posts[0];

        // Extract the first category ID from the lesson_category array
        const categoryId =
            post.lesson_category && post.lesson_category.length > 0
                ? post.lesson_category[0]
                : null;

        // Get category data for this post if we have a category ID
        let categoryImageUrl = "/images/hugeicons_java.svg"; // Default category image
        if (categoryId) {
            try {
                const categoryResponse = await fetch(
                    `${BASE_URL}/lesson_category/${categoryId}`
                );
                if (categoryResponse.ok) {
                    const categoryData = await categoryResponse.json();
                    if (
                        categoryData.meta &&
                        categoryData.meta.lesson_category_image
                    ) {
                        categoryImageUrl =
                            categoryData.meta.lesson_category_image;
                    }
                }
            } catch (error) {
                console.error(
                    `Error fetching category image for ID ${categoryId}:`,
                    error
                );
            }
        }

        // Get Yoast SEO metadata
        const yoastSEO = post.yoast_head_json || null;

        // Transform WordPress post to match our CoursePost interface
        return {
            slug,
            title: post.title.rendered || "",
            content: post.content.rendered || "",
            coverImage: post.featured_media_url || "/images/blog-cover.jpg", // Default image if none provided
            date: post.date || new Date().toISOString(),
            author: {
                name: post.author_name || "Admin",
                avatar: post.author_avatar || "/images/avatar.jpg",
            },
            category: post.categories_name?.[0] || "default",
            categoryId,
            categoryDescription:
                post.category_description ||
                "Java programming tutorials and lessons",
            categoryImage: categoryImageUrl, // Use the fetched category image or default
            lessonSections: post.meta?._lesson_sections || [],
            additionalMaterials: post.meta?._additional_materials || [],
            yoastSEO,
        };
    } catch (error) {
        console.error("Error fetching post:", error);
        throw error;
    }
}

/**
 * Fetches all posts from WordPress API
 * @returns Promise with all posts
 */
export async function getAllPosts(): Promise<
    {
        slug: string;
        title: string;
        excerpt: string;
        coverImage: string;
        date: string;
        categoryId: number | null;
        technologyLabel: string;
    }[]
> {
    try {
        let allPosts: WordPressPost[] = [];
        let page = 1;
        let hasMorePages = true;

        // Fetch all pages of posts
        while (hasMorePages) {
            const response = await fetch(
                `${BASE_URL}/java-lessons?per_page=100&page=${page}`
            );

            // Check for errors
            if (!response.ok) {
                // If we get a 400 error on pages after the first, it likely means we've reached the end
                if (page > 1 && response.status === 400) {
                    hasMorePages = false;
                    break;
                }
                throw new Error(`Error fetching posts: ${response.status}`);
            }

            const posts = await response.json();

            // If we get an empty array or fewer than 100 posts, we've reached the end
            if (!posts || !posts.length || posts.length < 100) {
                hasMorePages = false;
            }

            // Add the posts to our collection
            allPosts = [...allPosts, ...posts];

            // Move to the next page
            page++;
        }

        // Transform WordPress posts to match our expected format
        return allPosts.map((post) => ({
            slug: post.slug,
            title: post.title.rendered || "",
            excerpt: post.excerpt?.rendered
                ? stripHtmlTags(post.excerpt?.rendered).substring(0, 150) +
                  "..."
                : "",
            coverImage: post.featured_media_url || "/images/blog-cover.jpg",
            date: post.date || new Date().toISOString(),
            categoryId: post.lesson_category?.[0] || null,
            technologyLabel: post.meta?.technology_label || "Java",
        }));
    } catch (error) {
        console.error("Error fetching all posts:", error);
        return [];
    }
}

/**
 * Get all lesson categories
 * @returns Promise with categories data
 */
export async function getAllCategories(): Promise<
    {
        id: number;
        name: string;
        description: string;
        count: number;
        sortOrder: number;
        imageUrl: string;
    }[]
> {
    try {
        // Fetch all categories with pagination
        let allCategories: WordPressCategory[] = [];
        let page = 1;
        let hasMorePages = true;

        // Fetch all pages of categories
        while (hasMorePages) {
            const response = await fetch(
                `${BASE_URL}/lesson_category?per_page=100&page=${page}`
            );

            // Check for errors
            if (!response.ok) {
                // If we get a 400 error on pages after the first, it likely means we've reached the end
                if (page > 1 && response.status === 400) {
                    hasMorePages = false;
                    break;
                }
                throw new Error(
                    `Error fetching categories: ${response.status}`
                );
            }

            const categories = await response.json();

            // If we get an empty array or fewer than 100 categories, we've reached the end
            if (!categories || !categories.length || categories.length < 100) {
                hasMorePages = false;
            }

            // Add the categories to our collection
            allCategories = [...allCategories, ...categories];

            // Move to the next page
            page++;
        }

        // Map the categories with their sort order
        const categoriesWithSortOrder: {
            id: number;
            name: string;
            description: string;
            count: number;
            sortOrder: number;
            imageUrl: string;
        }[] = allCategories.map((category: WordPressCategory) => {
            // Get meta data if available
            let sortOrder = 9999; // Default high value for items without order
            let imageUrl = "/images/hugeicons_java.svg"; // Default image path

            // Try to get the sort order from different possible locations in the API response
            if (category.meta && category.meta.lesson_category_sort_order) {
                sortOrder = parseInt(
                    category.meta.lesson_category_sort_order,
                    10
                );
            } else if (category.lesson_category_sort_order) {
                sortOrder = parseInt(category.lesson_category_sort_order, 10);
            }

            // Try to get the image URL from meta data
            if (category.meta && category.meta.lesson_category_image) {
                imageUrl = category.meta.lesson_category_image;
            } else if (category.lesson_category_image) {
                imageUrl = category.lesson_category_image;
            }

            // If the value is NaN, use the default
            if (isNaN(sortOrder)) {
                sortOrder = 9999;
            }

            return {
                id: category.id,
                name: category.name || "",
                description: category.description || "",
                count: category.count || 0,
                sortOrder,
                imageUrl,
            };
        });

        // Sort by the sort order field (ascending)
        return categoriesWithSortOrder.sort(
            (a, b) => a.sortOrder - b.sortOrder
        );
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
}

/**
 * Fetches posts by category ID
 * @param categoryId - The category ID to fetch posts for
 * @param limit - Maximum number of posts to return (default: 100, use -1 for all posts)
 * @returns Promise with posts in the category
 */
export async function getPostsByCategory(
    categoryId: number,
    limit: number = 100
): Promise<
    {
        slug: string;
        title: string;
        excerpt: string;
        coverImage: string;
        date: string;
        technologyLabel: string;
    }[]
> {
    try {
        // If limit is -1, fetch all posts with pagination
        if (limit === -1) {
            let allPosts: WordPressPost[] = [];
            let page = 1;
            let hasMorePages = true;

            // Fetch all pages of posts for this category
            while (hasMorePages) {
                const url = `${BASE_URL}/java-lessons?lesson_category=${categoryId}&per_page=100&page=${page}&orderby=date&order=asc`;
                const response = await fetch(url);

                // Check for errors
                if (!response.ok) {
                    // If we get a 400 error on pages after the first, it likely means we've reached the end
                    if (page > 1 && response.status === 400) {
                        hasMorePages = false;
                        break;
                    }
                    throw new Error(
                        `Error fetching posts by category: ${response.status}`
                    );
                }

                const posts = await response.json();

                // If we get an empty array or fewer than 100 posts, we've reached the end
                if (!posts || !posts.length || posts.length < 100) {
                    hasMorePages = false;
                }

                // Add the posts to our collection
                allPosts = [...allPosts, ...posts];

                // Move to the next page
                page++;
            }

            // Transform WordPress posts to match our expected format
            return allPosts.map((post: WordPressPost) => ({
                slug: post.slug,
                title: post.title.rendered || "",
                excerpt: post.excerpt?.rendered
                    ? stripHtmlTags(post.excerpt.rendered).substring(0, 150) +
                      "..."
                    : "",
                coverImage: post.featured_media_url || "/images/blog-cover.jpg",
                date: post.date || new Date().toISOString(),
                technologyLabel: post.meta?.technology_label || "Java",
            }));
        } else {
            // Original implementation for when a specific limit is provided
            const url = `${BASE_URL}/java-lessons?lesson_category=${categoryId}&per_page=${limit}&orderby=date&order=asc`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(
                    `Error fetching posts by category: ${response.status}`
                );
            }

            const posts = await response.json();

            return posts.map((post: WordPressPost) => ({
                slug: post.slug,
                title: post.title.rendered || "",
                excerpt: post.excerpt?.rendered
                    ? stripHtmlTags(post.excerpt.rendered).substring(0, 150) +
                      "..."
                    : "",
                coverImage: post.featured_media_url || "/images/blog-cover.jpg",
                date: post.date || new Date().toISOString(),
                technologyLabel: post.meta?.technology_label || "Java",
            }));
        }
    } catch (error) {
        console.error(
            `Error fetching posts for category ${categoryId}:`,
            error
        );
        return [];
    }
}

/**
 * Fetches related posts by category ID, excluding the current post
 * @param categoryId - The category ID to fetch related posts for
 * @param currentSlug - The current post slug to exclude from results
 * @param limit - Maximum number of posts to return (default: 30, use -1 for all posts)
 * @returns Promise with related posts
 */
export async function getRelatedPostsByCategory(
    categoryId: number | null,
    currentSlug: string,
    limit: number = 30
): Promise<{ slug: string; title: string }[]> {
    try {
        if (!categoryId) {
            return [];
        }

        // If limit is -1, fetch all related posts with pagination
        if (limit === -1) {
            let allPosts: WordPressPost[] = [];
            let page = 1;
            let hasMorePages = true;

            // Fetch all pages of related posts
            while (hasMorePages) {
                const url = `${BASE_URL}/java-lessons?lesson_category=${categoryId}&slug_not=${currentSlug}&per_page=100&page=${page}&orderby=date&order=asc`;
                const response = await fetch(url);

                // Check for errors
                if (!response.ok) {
                    // If we get a 400 error on pages after the first, it likely means we've reached the end
                    if (page > 1 && response.status === 400) {
                        hasMorePages = false;
                        break;
                    }
                    throw new Error(
                        `Error fetching related posts: ${response.status}`
                    );
                }

                const posts = await response.json();

                // If we get an empty array or fewer than 100 posts, we've reached the end
                if (!posts || !posts.length || posts.length < 100) {
                    hasMorePages = false;
                }

                // Add the posts to our collection
                allPosts = [...allPosts, ...posts];

                // Move to the next page
                page++;
            }

            // Transform WordPress posts to our simplified format for related posts
            return allPosts.map((post: WordPressPost) => ({
                slug: post.slug,
                title: post.title.rendered || "",
            }));
        } else {
            // Original implementation for when a specific limit is provided
            const url = `${BASE_URL}/java-lessons?lesson_category=${categoryId}&slug_not=${currentSlug}&per_page=${limit}&orderby=date&order=asc`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(
                    `Error fetching related posts: ${response.status}`
                );
            }

            const posts = await response.json();

            // Transform WordPress posts to our simplified format for related posts
            return posts.map((post: WordPressPost) => ({
                slug: post.slug,
                title: post.title.rendered || "",
            }));
        }
    } catch (error) {
        console.error("Error fetching related posts:", error);
        return [];
    }
}

/**
 * Fetches a specific category by ID
 * @param categoryId - The category ID to fetch
 * @returns Promise with the category data
 */
export async function getCategoryById(categoryId: number | null): Promise<{
    id: number;
    name: string;
    description: string;
    count: number;
    imageUrl: string;
} | null> {
    try {
        if (!categoryId) {
            return null;
        }

        const response = await fetch(
            `${BASE_URL}/lesson_category/${categoryId}`
        );

        if (!response.ok) {
            throw new Error(`Error fetching category: ${response.status}`);
        }

        const category = await response.json();

        // Get image URL from meta data if available, or use default
        let imageUrl = "/images/hugeicons_java.svg"; // Default image

        if (category.meta && category.meta.lesson_category_image) {
            imageUrl = category.meta.lesson_category_image;
        } else if (category.lesson_category_image) {
            imageUrl = category.lesson_category_image;
        }

        return {
            id: category.id,
            name: category.name || "",
            description: category.description || "",
            count: category.count || 0,
            imageUrl,
        };
    } catch (error) {
        console.error(`Error fetching category with ID ${categoryId}:`, error);
        return null;
    }
}

/**
 * Helper function to strip HTML tags from a string
 */
function stripHtmlTags(html: string): string {
    return html.replace(/<\/?[^>]+(>|$)/g, "");
}

/**
 * Search for posts across all post types in WordPress
 * @param query - The search query
 * @param limit - Maximum number of posts to return (default: 20)
 * @returns Promise with search results
 */
export async function searchPosts(
    query: string,
    limit: number = 20
): Promise<
    {
        slug: string;
        title: string;
        excerpt: string;
        coverImage: string;
        date: string;
        technologyLabel: string;
        postType: string;
    }[]
> {
    try {
        if (!query.trim()) {
            return [];
        }

        // First search in java-lessons custom post type
        const lessonsUrl = `${BASE_URL}/java-lessons?search=${encodeURIComponent(
            query
        )}&per_page=${limit}`;
        const lessonsResponse = await fetch(lessonsUrl);

        let results: SearchResultPost[] = [];

        if (lessonsResponse.ok) {
            const lessonsData = await lessonsResponse.json();
            const transformedLessons = lessonsData.map(
                (post: WordPressPost) => ({
                    slug: post.slug,
                    title: post.title.rendered || "",
                    excerpt: post.excerpt?.rendered
                        ? stripHtmlTags(post.excerpt.rendered).substring(
                              0,
                              150
                          ) + "..."
                        : "",
                    coverImage:
                        post.featured_media_url || "/images/blog-cover.jpg",
                    date: post.date || new Date().toISOString(),
                    technologyLabel: post.meta?.technology_label || "Java",
                    postType: "java-lessons",
                })
            );

            results = [...transformedLessons];
        }

        // Also search in regular WordPress posts
        const postsUrl = `${BASE_URL}/posts?search=${encodeURIComponent(
            query
        )}&per_page=${limit}`;
        const postsResponse = await fetch(postsUrl);

        if (postsResponse.ok) {
            const postsData = await postsResponse.json();
            const transformedPosts = postsData.map((post: WordPressPost) => ({
                slug: post.slug,
                title: post.title.rendered || "",
                excerpt: post.excerpt?.rendered
                    ? stripHtmlTags(post.excerpt.rendered).substring(0, 150) +
                      "..."
                    : "",
                coverImage: post.featured_media_url || "/images/blog-cover.jpg",
                date: post.date || new Date().toISOString(),
                technologyLabel: "Блог", // Default label for regular posts
                postType: "posts",
            }));

            results = [...results, ...transformedPosts];
        }

        // Sort results by date (newest first)
        return results.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
    } catch (error) {
        console.error("Error searching posts:", error);
        return [];
    }
}

/**
 * Fetches a regular WordPress post by slug
 * @param slug - The post slug to fetch
 * @returns Promise with the post data
 */
export async function getRegularPostBySlug(slug: string): Promise<{
    slug: string;
    title: string;
    content: string;
    coverImage: string;
    date: string;
    author: {
        name: string;
        avatar: string;
    };
    yoastSEO: YoastSEO | null;
} | null> {
    try {
        const response = await fetch(`${BASE_URL}/posts?slug=${slug}&_embed`);

        if (!response.ok) {
            throw new Error(`Error fetching post: ${response.status}`);
        }

        const posts = await response.json();

        // Check if we found any posts
        if (!posts || posts.length === 0) {
            return null;
        }

        const post = posts[0];

        // Get featured image if available
        let featuredImageUrl = "";
        if (
            post._embedded &&
            post._embedded["wp:featuredmedia"] &&
            post._embedded["wp:featuredmedia"].length > 0
        ) {
            featuredImageUrl =
                post._embedded["wp:featuredmedia"][0].source_url || "";
        } else if (post.featured_media_url) {
            featuredImageUrl = post.featured_media_url;
        }

        // Get author info if available
        let authorName = "Admin";
        let authorAvatar = "/images/avatar.jpg";

        if (
            post._embedded &&
            post._embedded.author &&
            post._embedded.author.length > 0
        ) {
            authorName = post._embedded.author[0].name || "Admin";
            authorAvatar =
                post._embedded.author[0].avatar_urls?.[96] ||
                "/images/avatar.jpg";
        } else {
            authorName = post.author_name || "Admin";
            authorAvatar = post.author_avatar || "/images/avatar.jpg";
        }

        // Get Yoast SEO metadata
        const yoastSEO = post.yoast_head_json || null;

        return {
            slug,
            title: post.title.rendered || "",
            content: post.content.rendered || "",
            coverImage: featuredImageUrl || "/images/blog-cover.jpg",
            date: post.date || new Date().toISOString(),
            author: {
                name: authorName,
                avatar: authorAvatar,
            },
            yoastSEO,
        };
    } catch (error) {
        console.error(`Error fetching post with slug ${slug}:`, error);
        return null;
    }
}

/**
 * Отправляет сообщение из формы обратной связи в WordPress
 * @param email - Email отправителя
 * @param subject - Тема сообщения
 * @param message - Текст сообщения
 * @returns Promise с результатом отправки
 */
export async function sendContactForm(
    email: string,
    subject: string,
    message: string
): Promise<{ success: boolean; message: string }> {
    try {
        // ID формы Contact Form 7 (нужно заменить на актуальный ID вашей формы в WordPress)
        const formId = "18"; // Замените на ID вашей формы в WordPress

        // Создаем FormData объект для отправки данных
        const formData = new FormData();
        formData.append("your-email", email);
        formData.append("your-subject", subject);
        formData.append("your-message", message);
        formData.append("_wpcf7", formId);
        formData.append("_wpcf7_version", "5.7.7");

        // Генерируем уникальный unit_tag, который очень важен для CF7
        const unitTag = `wpcf7-f${formId}-p0-o${Math.floor(
            Math.random() * 100
        )}`;
        formData.append("_wpcf7_unit_tag", unitTag);

        formData.append("_wpcf7_container_post", "0");
        formData.append("_wpcf7_posted_data_hash", "");

        const response = await fetch(
            `http://51.21.195.168/wp-json/contact-form-7/v1/contact-forms/${formId}/feedback`,
            {
                method: "POST",
                body: formData,
            }
        );

        const data = await response.json();

        // Contact Form 7 возвращает статус и сообщение
        if (data.status === "mail_sent") {
            return {
                success: true,
                message: "Спасибо! Ваше сообщение успешно отправлено.",
            };
        } else {
            throw new Error(data.message || "Ошибка при отправке сообщения");
        }
    } catch (error) {
        console.error("Ошибка при отправке формы:", error);
        return {
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Произошла ошибка при отправке сообщения",
        };
    }
}

/**
 * Fetches adjacent (previous and next) posts for a given post slug
 */
export async function getAdjacentPosts(slug: string): Promise<{
    previous: { slug: string; title: string } | null;
    next: { slug: string; title: string } | null;
}> {
    try {
        const response = await fetch(`${BASE_URL}/adjacent-posts?slug=${slug}`);

        if (!response.ok) {
            throw new Error(
                `Error fetching adjacent posts: ${response.status}`
            );
        }

        const data = await response.json();
        return {
            previous: data.previous || null,
            next: data.next || null,
        };
    } catch (error) {
        console.error("Error fetching adjacent posts:", error);
        return {
            previous: null,
            next: null,
        };
    }
}

/**
 * Fetches a WordPress page by slug
 * @param slug - The page slug to fetch
 * @returns Promise with the page data
 */
export async function getPageBySlug(slug: string): Promise<{
    title: string;
    content: string;
    date: string;
    yoastSEO: YoastSEO | null;
} | null> {
    try {
        const response = await fetch(`${BASE_URL}/pages?slug=${slug}&_embed`);

        if (!response.ok) {
            throw new Error(`Error fetching page: ${response.status}`);
        }

        const pages = await response.json();

        // Check if we found any pages
        if (!pages || pages.length === 0) {
            return null;
        }

        const page = pages[0];

        // Get Yoast SEO metadata
        const yoastSEO = page.yoast_head_json || null;

        return {
            title: page.title.rendered || "",
            content: page.content.rendered || "",
            date: page.date || new Date().toISOString(),
            yoastSEO,
        };
    } catch (error) {
        console.error(`Error fetching page with slug ${slug}:`, error);
        return null;
    }
}
