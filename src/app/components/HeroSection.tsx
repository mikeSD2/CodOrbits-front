"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HeroSection() {
    const [isHovering, setIsHovering] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    const handleSearch = (e?: React.FormEvent) => {
        if (e) {
            e.preventDefault();
        }

        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <section className="bg-[var(--color-secondary)] rounded-[var(--border-radius)] p-4 md:p-6 lg:p-8 mt-4 flex flex-col md:flex-row justify-between gap-4 md:gap-12 h-full">
            <div className="flex-1 order-2 md:order-1">
                <h1 className="font-[family-name:var(--font-helvetica-rounded)] text-(length:--font-size-headings-large-sm) lg:text-[calc(var(--font-size-headings-large)-2px)] font-bold mb-4">
                    Бесплатный курс по программированию на Java{" "}
                    <br className="hidden xl:block" />
                    <span className="">от А до Я</span>
                </h1>
                <div className="flex items-center mb-4">
                    <p className="text-[16px] lg:text-[20px] font-[family-name:var(--font-jura)]">
                        <span className="relative top-[-4.5px]">
                            От азов до высокоуровневых фреймворков
                            &nbsp;&nbsp;→&nbsp;
                        </span>
                        <span className="inline-flex items-center ml-2 space-x-2">
                            <Image
                                src="/images/simple-icons_hibernate.svg"
                                alt="Hibernate"
                                width={20}
                                height={20}
                                className="w-5 h-5 lg:w-6 lg:h-6"
                            />
                            <Image
                                src="/images/simple-icons_spring.svg"
                                alt="Spring"
                                width={20}
                                height={20}
                                className="w-5 h-5 lg:w-6 lg:h-6"
                            />
                            <Image
                                src="/images/simple-icons_springboot.svg"
                                alt="Spring Boot"
                                width={20}
                                height={20}
                                className="w-5 h-5 lg:w-6 lg:h-6"
                            />
                        </span>
                    </p>
                </div>
                <div className="flex flex-col space-y-2 items-start">
                    <div className="relative w-full">
                        <input
                            type="text"
                            placeholder="Поиск по сайту"
                            className="flex-1 border border-black rounded-full px-3 py-2 lg:px-4 lg:py-3 text-black placeholder:text-black text-[15px] lg:text-[17px] w-full pr-10 font-bold"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <button
                            onClick={() => handleSearch()}
                            className="absolute right-2 top-[7px] lg:right-2 lg:top-2 w-6 h-6 lg:w-8 lg:h-8 cursor-pointer"
                            aria-label="Поиск"
                        >
                            <Image
                                src="/images/pepicons-pencil_loop.svg"
                                alt="Search Icon"
                                width={27}
                                height={27}
                                className="w-6 h-6 lg:w-8 lg:h-8"
                            />
                        </button>
                    </div>
                    <div className="flex justify-start items-center relative">
                        <Link href="/course/introduction-to-java">
                            <button
                                className="bg-blue-500 text-white px-3 lg:px-5 py-[7px] lg:py-[10px] rounded-full text-(length:--font-size-button) cursor-pointer group"
                                onMouseEnter={() => setIsHovering(true)}
                                onMouseLeave={() => setIsHovering(false)}
                            >
                                НАЧАТЬ УЧИТЬСЯ!
                            </button>
                        </Link>
                        <Image
                            src="/images/buttonpart.png"
                            alt="Left Image 2"
                            width={70}
                            height={70}
                            className="ml-[-2px] lg:ml-[-5px] w-[50px] h-[48px] lg:w-[65px] lg:h-[60px]"
                        />
                        <Image
                            src="/images/line-md_arrow-up.svg"
                            alt="Left Image 2"
                            width={40}
                            height={40}
                            className={`absolute right-[11px] lg:right-[13px] w-[24px] h-[24px] lg:w-[35px] lg:h-[35px] transition-transform`}
                            style={{
                                transform: isHovering
                                    ? "rotate(-135deg)"
                                    : "rotate(0deg)",
                                transition: "transform 0.3s ease-in-out",
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className="md:ml-4 relative flex-1 md:max-w-[47%] order-1 md:order-2">
                <Image
                    src="/images/main_imagem.webp"
                    alt="Мальчики и робот радуются что нашли хороший бесплатный курс по программированию на Java от А до Я"
                    width={500}
                    height={280}
                    quality={99}
                    className="rounded-[var(--border-radius)] w-full h-full object-cover object-top"
                />
            </div>
            <style jsx global>{`
                @keyframes pulse-scale {
                    0% {
                        transform: scale(1);
                    }
                    50% {
                        transform: scale(1.2);
                    }
                    100% {
                        transform: scale(1);
                    }
                }
                .animate-pulse-scale {
                    animation: pulse-scale 0.6s ease-in-out;
                }
            `}</style>
        </section>
    );
}
