"use client";

import { usePostData } from "../contexts/PostDataContext";
import { decode } from "html-entities";
import PostContent from "../../../components/PostContent";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import SanitizedContent from "../../../components/SanitizedContent";

export default function ClientCoursePost() {
    const { post, adjacentPosts } = usePostData();

    return (
        <main className="prose prose-lg max-w-none font-thin">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
                <h1 className="text-[calc(var(--font-size-headings-large-sm)+3px)] lg:text-(length:--font-size-headings-large) font-bold">
                    {decode(post.title)}
                </h1>
                <span className="text-gray-500 text-[13px] lg:text-[16px]">
                    Last updated:{" "}
                    {new Date(post.date).toLocaleDateString("ru-RU", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                    })}
                </span>
            </div>
            <hr className="border-gray-200 my-6" />

            <PostContent content={post.content} />

            <div>
                <hr className="border-gray-200 my-6" />

                <div className="flex justify-between">
                    <div className="flex-1 flex justify-start items-center relative">
                        {adjacentPosts?.previous && (
                            <>
                                <Image
                                    src="/images/next_article_button_part.svg"
                                    alt="Left Image"
                                    width={70}
                                    height={70}
                                    className="ml-[-5px] mr-[-8px] w-[45px] h-[40px] rotate-180"
                                />
                                <Image
                                    src="/images/carbon_next-filled.svg"
                                    alt="Arrow Icon"
                                    width={30}
                                    height={30}
                                    className="absolute left-[7px] w-[15px] h-[15px] rotate-180"
                                />
                                <Link
                                    href={`/course/${adjacentPosts.previous.slug}`}
                                    className="bg-blue-500 text-white px-4 py-[8px] font-bold rounded-full text-(length:--font-size-button)"
                                >
                                    <span className="hidden lg:block">
                                        ПРЕДЫДУЩИЙ УРОК
                                    </span>
                                    <span className="block lg:hidden">
                                        ПРЕДЫДУЩИЙ
                                    </span>
                                </Link>
                            </>
                        )}
                    </div>
                    <div className="flex-1 flex justify-end items-center relative">
                        {adjacentPosts?.next && (
                            <>
                                <Link
                                    href={`/course/${adjacentPosts.next.slug}`}
                                    className="bg-blue-500 text-white px-4 py-[8px] font-bold rounded-full text-(length:--font-size-button)"
                                >
                                    <span className="hidden lg:block">
                                        СЛЕДУЮЩИЙ УРОК
                                    </span>
                                    <span className="block lg:hidden">
                                        СЛЕДУЮЩИЙ
                                    </span>
                                </Link>
                                <Image
                                    src="/images/next_article_button_part.svg"
                                    alt="Right Image"
                                    width={70}
                                    height={70}
                                    className="mr-[-8px] ml-[-9px] w-[45px] h-[40px]"
                                />
                                <Image
                                    src="/images/carbon_next-filled.svg"
                                    alt="Arrow Icon"
                                    width={40}
                                    height={40}
                                    className="absolute right-[4px] mb-[1px] w-[15px] h-[15px]"
                                />
                            </>
                        )}
                    </div>
                </div>

                {post.additionalMaterials &&
                    post.additionalMaterials.length > 0 && (
                        <div className="mt-15 mb-10">
                            <h2 className="text-3xl font-bold mb-4">
                                Дополнительные материалы
                            </h2>
                            <div className="text-gray-500 text-sm site-links -mt-3 mb-5">
                                (Здесь вы найдете полезные ссылки на материалы
                                по теме. Это не обязательно, просто
                                дополнительная информация.)
                            </div>

                            {post.additionalMaterials.map((material, index) => (
                                <React.Fragment key={index}>
                                    <div className="flex items-center justify-between space-x-6">
                                        <div>
                                            <h3 className="font-bold text-lg">
                                                {decode(material.title)}
                                            </h3>
                                            <div className="text-gray-500 text-sm site-links">
                                                <SanitizedContent
                                                    html={decode(
                                                        material.content
                                                    )}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-end min-w-[27px] m-0 p-0">
                                            <Image
                                                src="/images/information-icon-6086.svg"
                                                alt="Additional Material Icon"
                                                width={41}
                                                height={41}
                                                className="w-8 h-8"
                                            />
                                        </div>
                                    </div>
                                    {post.additionalMaterials &&
                                        index <
                                            post.additionalMaterials.length -
                                                1 && (
                                            <Image
                                                src="/images/Delim_for_related_posts.svg"
                                                alt="Divider"
                                                width={79}
                                                height={79}
                                                className="w-full"
                                            />
                                        )}
                                </React.Fragment>
                            ))}
                        </div>
                    )}

                {post.lessonSections && post.lessonSections.length > 0 && (
                    <div className="mt-15">
                        <h2 className="text-3xl font-bold mb-4">
                            Следующие уроки
                        </h2>
                        {post.lessonSections.map((section, index) => (
                            <React.Fragment key={index}>
                                <div className="flex items-center justify-between space-x-7">
                                    <div>
                                        <h3 className="font-bold text-lg">
                                            {decode(section.title)}
                                        </h3>
                                        <div className="text-gray-500 text-sm site-links">
                                            <SanitizedContent
                                                html={decode(section.content)}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col sm:flex-row items-center justify-center m-0 p-0 gap-2">
                                        <p className="order-2 sm:order-1 text-gray-200 font-bold text-[13px] w-[28px] leading-[15px] text-center whitespace-nowrap">
                                            {section.time_to_read}
                                            <br />
                                            мин.
                                        </p>
                                        <Image
                                            src="/images/duo-icons_clock.svg"
                                            alt="Similar Articles Icon"
                                            width={41}
                                            height={41}
                                            className="w-8 h-8 order-1 sm:order-2"
                                        />
                                    </div>
                                </div>
                                {post.lessonSections &&
                                    index < post.lessonSections.length - 1 && (
                                        <Image
                                            src="/images/Delim_for_related_posts.svg"
                                            alt="Divider"
                                            width={79}
                                            height={79}
                                            className="w-full"
                                        />
                                    )}
                            </React.Fragment>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
