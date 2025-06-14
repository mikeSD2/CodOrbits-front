import { YoastSEO } from "@/lib/api/wordpress";

export interface CoursePost {
    slug: string;
    title: string;
    content: string;
    coverImage: string;
    date: string;
    author: {
        name: string;
        avatar: string;
    };
    category: string;
    categoryId: number | null;
    categoryDescription: string;
    categoryImage: string;
    lessonSections?: Array<{
        title: string;
        content: string;
        time_to_read: string;
    }>;
    additionalMaterials?: Array<{
        title: string;
        content: string;
        time_to_read: string;
    }>;
    relatedPosts?: Array<{
        slug: string;
        title: string;
    }>;
    yoastSEO?: YoastSEO | null;
}
