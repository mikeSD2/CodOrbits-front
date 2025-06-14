"use client";

import { createContext, useContext } from "react";
import type { CoursePost } from "../types/post";

export type PostDataContextType = {
    post: CoursePost;
    relatedPosts: { slug: string; title: string }[];
    adjacentPosts: {
        previous: { slug: string; title: string } | null;
        next: { slug: string; title: string } | null;
    };
};

const PostDataContext = createContext<PostDataContextType | undefined>(
    undefined
);

export function PostDataProvider({
    children,
    postData,
}: {
    children: React.ReactNode;
    postData: PostDataContextType;
}) {
    return (
        <PostDataContext.Provider value={postData}>
            {children}
        </PostDataContext.Provider>
    );
}

export function usePostData() {
    const context = useContext(PostDataContext);
    if (context === undefined) {
        throw new Error("usePostData must be used within a PostDataProvider");
    }
    return context;
}
