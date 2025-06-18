"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
interface Card {
    title: string;
    image: string;
    link: string;
}

const cards: Card[] = [
    {
        title: "Java Core",
        image: "/images/hugeicons_java1.svg",
        link: "/course/introduction-to-java",
    },
    {
        title: "Java ООП",
        image: "/images/javaoop11.svg",
        link: "/course/java-oop",
    },
    {
        title: "Multithreading",
        image: "/images/multithred.svg",
        link: "/course/multithreading-thread-in-java",
    },
    {
        title: "Spring Framework",
        image: "/images/bxl_spring-boot-blue.svg",
        link: "/course/java-spring-framework",
    },
    {
        title: "Spring Boot",
        image: "/images/sprboot.svg",
        link: "/course/java-spring-boot-advantages",
    },
    {
        title: "Hibernate",
        image: "/images/simple-icons_hibernate-blue.svg",
        link: "/course/hibernate-orm-in-java",
    },
    {
        title: "SQL",
        image: "/images/sqlmainpage.svg",
        link: "/course/sql-db-mysql",
    },
    {
        title: "Docker",
        image: "/images/dockdock.svg",
        link: "/course/what-is-docker",
    },
];

export default function CardGridSection() {
    const [isHovering2, setIsHovering2] = useState(false);
    return (
        <section className="py-12 pb-0">
            <div className="flex flex-col sm:flex-row justify-between mb-8 gap-4">
                <h2 className="text-(length:--font-size-headings-large-sm) sm:text-(length:--font-size-headings-large) sm:max-w-[310px] font-[family-name:var(--font-helvetica-rounded)] font-bold">
                    Начни учиться{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-500">
                        прямо сейчас
                    </span>
                    !
                </h2>
                <Link href="/course" className="w-full sm:w-auto">
                    <button
                        className="bg-white text-black rounded-full border border-black flex items-center h-[40px] px-2 text-(length:--font-size-button) font-bold w-full sm:w-auto justify-center cursor-pointer group"
                        onMouseEnter={() => setIsHovering2(true)}
                        onMouseLeave={() => setIsHovering2(false)}
                    >
                        <Image
                            src="/images/arrow-for-black-border-button.svg"
                            alt="Small Icon"
                            width={20}
                            height={20}
                            className={`mr-2 transition-transform duration-300 ${
                                isHovering2 ? "scale-107" : ""
                            }`}
                            style={{
                                transform: isHovering2
                                    ? "scale(1.07) rotate(45deg)"
                                    : "scale(1) rotate(0deg)",
                                transition: "transform 0.3s ease-in-out",
                            }}
                        />
                        <span className="text-black my-0 mr-2">
                            ПЕРЕЙТИ К СПИСКУ ТЕМ
                        </span>
                    </button>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 relative">
                <Image
                    src="/images/top_corner_rocket.svg"
                    alt="Right Image 2"
                    width={96}
                    height={96}
                    className="absolute -top-[11px] -right-[12px]"
                />
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className="bg-[linear-gradient(96deg,#2687FF_0.37%,#2F8CFF_86.74%,#4E9DFF_99.62%,rgba(25,127,255,0.71)_99.63%)] rounded-[var(--border-radius-small)] p-3 sm:p-4 flex items-center gap-4 items-start"
                    >
                        <div className="bg-white rounded-lg p-3">
                            <Image
                                src={card.image}
                                alt={card.title}
                                width={44}
                                height={44}
                                className="object-contain h-full w-[34px] sm:w-[44px] h-[34px] sm:h-[44px]"
                            />
                        </div>
                        <div className="flex flex-col">
                            <h3 className="text-white font-semibold mb-1 text-[19px] sm:text-[24px] xl:text-[clamp(20px,1.55vw,26px)]">
                                {card.title}
                            </h3>
                            <Link
                                href={card.link}
                                className="text-white hover:text-blue-200 transition-colors flex items-center gap-2 text-[14.4px]"
                            >
                                Читать →
                            </Link>
                        </div>
                    </div>
                ))}
                <Image
                    src="/images/bottom_corner_rocket.svg"
                    alt="Right Image 2"
                    width={86}
                    height={86}
                    className="absolute -bottom-[11px] -left-[11px]"
                />
            </div>
        </section>
    );
}
