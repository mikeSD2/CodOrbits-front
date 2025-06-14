"use client";

import { usePostData } from "../contexts/PostDataContext";
import Image from "next/image";
import Link from "next/link";
import { decode } from "html-entities";

export default function CategoryInfo() {
    const { post } = usePostData();
    const { category, categoryDescription, categoryImage } = post;

    return (
        <div className="flex flex-col md:flex-row lg:h-[160px] items-start justify-between gap-4 lg:gap-0">
            <div className="flex flex-col max-w-[950px] gap-4">
                <h2 className="font-[family-name:var(--font-helvetica-rounded)] text-(length:--font-size-headings-large-sm) lg:text-(length:--font-size-headings-large) font-bold">
                    Раздел: {decode(category)}
                </h2>
                {categoryDescription && (
                    <p className="text-[16px] lg:text-[20px] font-[family-name:var(--font-jura)]">
                        {decode(categoryDescription)}
                    </p>
                )}
                <Link
                    href="/course"
                    className="text-blue-600 hover:text-blue-500 underline text-base lg:text-lg"
                >
                    Все разделы
                </Link>
            </div>
            <div className="min-w-full md:min-w-[130px] md:min-h-[130px] lg:min-w-[160px] lg:min-h-[160px] h-full bg-[linear-gradient(96deg,#2687FF_0.37%,#2F8CFF_86.74%,#4E9DFF_99.62%,rgba(25,127,255,0.71)_99.63%)] rounded-[var(--border-radius)] flex items-center justify-center shadow-lg order-first md:order-none py-4 lg:py-0">
                <Image
                    src={categoryImage}
                    alt={`Иконка ${category}`}
                    width={100}
                    height={100}
                    quality={100}
                    className="min-w-15 h-15 min-h-15 md:min-w-20 md:min-h-20 lg:min-w-25 lg:min-h-25"
                />
            </div>
        </div>
    );
}
