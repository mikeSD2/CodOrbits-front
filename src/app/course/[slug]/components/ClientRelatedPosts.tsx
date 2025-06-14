"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePostData } from "../contexts/PostDataContext";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { decode } from "html-entities";

export default function ClientRelatedPosts() {
    const { post, relatedPosts } = usePostData();
    const pathname = usePathname();
    const currentSlug = post.slug;
    const [selectedPost, setSelectedPost] = useState<string | null>(
        currentSlug
    );

    useEffect(() => {
        setSelectedPost(currentSlug);
    }, [pathname, currentSlug]);

    // If no related posts are available, show a message
    if (!relatedPosts || relatedPosts.length === 0) {
        return (
            <div className="text-gray-500 italic py-4">
                Нет связанных постов в этой категории
            </div>
        );
    }

    return (
        <div>
            {relatedPosts.map((relatedPost, index) => (
                <div
                    key={relatedPost.slug}
                    className={`flex justify-between items-center transition-colors gap-2 pr-2 py-1 ${
                        selectedPost === relatedPost.slug
                            ? "bg-gradient-to-l from-[#eff4fd] to-transparent"
                            : "hover:bg-gradient-to-l from-[#eff4fd] to-transparent"
                    }`}
                    onClick={() => setSelectedPost(relatedPost.slug)}
                >
                    <Link
                        href={`/course/${relatedPost.slug}`}
                        className="block py-2 rounded flex-1 text-[16.5px]"
                    >
                        <h3>{decode(relatedPost.title)}</h3>
                    </Link>
                    <div className="relative">
                        <Image
                            src="/images/point_back.svg"
                            alt="Small Icon"
                            width={30}
                            height={30}
                            className="min-w-7 min-h-7 animate-slow-spin"
                        />
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <p className="font-bold font-[family-name:var(--font-helvetica-rounded)] text-[11px] text-transparent bg-clip-text bg-gradient-to-b from-blue-600 to-blue-400">
                                {index + 1 < 10 ? `0${index + 1}` : index + 1}
                            </p>
                        </div>
                    </div>
                    <div className="border-l border-dotted border-black h-full w-[1px]"></div>
                </div>
            ))}
        </div>
    );
}
