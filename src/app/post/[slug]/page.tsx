import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getRegularPostBySlug } from "@/lib/api/wordpress";
import { Metadata } from "next";
import { decode } from "html-entities";
import PostContent from "../../components/PostContent";

// Интерфейс для обычного поста
interface RegularPost {
    slug: string;
    title: string;
    content: string;
    coverImage: string;
    date: string;
    author: {
        name: string;
        avatar: string;
    };
}

// Генерация метаданных для страницы
export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Promise<Metadata> {
    try {
        const post = await getRegularPostBySlug(params.slug);

        if (!post) {
            return {
                title: "Пост не найден",
                description: "Запрашиваемый пост не найден",
            };
        }

        return {
            title: post.title,
            description: `${post.title} - статья на CodOrbits`,
            openGraph: {
                title: post.title,
                description: `${post.title} - статья на CodOrbits`,
                images: [{ url: post.coverImage }],
            },
        };
    } catch (error) {
        return {
            title: "Пост не найден",
            description: "Запрашиваемый пост не найден",
        };
    }
}

export default async function RegularPostPage({
    params,
}: {
    params: { slug: string };
}) {
    try {
        const post = await getRegularPostBySlug(params.slug);

        if (!post) {
            notFound();
        }

        return (
            <article className="max-w-[var(--container-width)] mx-auto py-8">
                <div className="mb-8">
                    <h1 className="text-(length:--font-size-headings-large) font-[family-name:var(--font-helvetica-rounded)] font-bold mb-4">
                        {decode(post.title)}
                    </h1>
                    <div className="flex items-center mb-4">
                        <Image
                            src={post.author.avatar}
                            alt={post.author.name}
                            width={40}
                            height={40}
                            className="w-10 h-10 rounded-full mr-3"
                        />
                        <div>
                            <p className="font-medium">{post.author.name}</p>
                            <time className="text-sm text-gray-500">
                                {new Date(post.date).toLocaleDateString(
                                    "ru-RU",
                                    {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    }
                                )}
                            </time>
                        </div>
                    </div>
                </div>

                {post.coverImage && (
                    <div className="mb-8 relative rounded-[var(--border-radius)] overflow-hidden">
                        <Image
                            src={post.coverImage}
                            alt={post.title}
                            width={1200}
                            height={630}
                            className="w-full h-auto object-cover"
                        />
                    </div>
                )}

                <div className="prose max-w-none prose-headings:font-bold prose-headings:text-black prose-p:text-gray-800 prose-a:text-blue-600">
                    <PostContent content={post.content} />
                </div>

                <div className="mt-12 pt-6 border-t border-gray-200">
                    <Link
                        href="/course"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 16l-4-4m0 0l4-4m-4 4h18"
                            />
                        </svg>
                        Вернуться к статьям
                    </Link>
                </div>
            </article>
        );
    } catch (error) {
        console.error("Error fetching post:", error);
        notFound();
    }
}
