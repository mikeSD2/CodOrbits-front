"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function JavaRoadmapSection() {
    const [isHovering, setIsHovering] = useState(false);
    const [isHovering2, setIsHovering2] = useState(false);
    return (
        <section className="mt-8 relative w-[100vw] max-w-[100vw] ml-[calc(-50vw+50%)]">
            <div className="absolute bg-gradient-to-b from-[white] via-[#F6FCFF] to-[white] w-full h-[calc(100%+590px)] -mt-55 z-[-1]"></div>
            <div className="relative z-10 p-8 bg-opacity-0 rounded-[var(--border-radius)] max-w-[var(--container-width)] mx-auto">
                <h2 className="text-(length:--font-size-headings-large-sm) lg:text-(length:--font-size-headings-large) font-[family-name:var(--font-helvetica-rounded)] sm:w-[60%] mx-auto font-bold text-center mb-4">
                    <span className="text-transparent bg-clip-text bg-gradient-to-b from-blue-600 to-blue-500">
                        Покрытие тем
                    </span>{" "}
                    нашего обучающего ресурса по{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-500">
                        Java
                    </span>
                </h2>
                <p className="text-center mb-4 font-[var(--font-calibri)] sm:w-[91%] mx-auto font-thin">
                    Наш бесплатный курс по программированию на Java охватывает
                    все ключевые технологии: от Java Core и принципов ООП до
                    Spring Framework, Hibernate и Docker. Вы комплексно изучите
                    веб технологии и по итогу курса из вас выйдет востребованный
                    бэкенд разработчик. Ознакомьтесь с полным списком тем ниже и
                    начните изучение программирования уже сегодня!
                </p>
                <div className="flex flex-col sm:flex-col-reverse justify-center sm:space-x-4 gap-3 sm:gap-0 mb-4 items-center">
                    <Image
                        src="/images/Java_roadmap.png"
                        alt="Полный roadmap java разработчик от Codorbits"
                        width={6000}
                        height={3000}
                        quality={99}
                        className="rounded-[var(--border-radius)] w-full h-auto mb-4 sm:mb-0 hidden sm:block"
                    />
                    <Image
                        src="/images/Java_roadmap_mobile.png"
                        alt="Короткий роадмап java разработчика от Codorbits"
                        width={6000}
                        height={3000}
                        quality={99}
                        className="rounded-[var(--border-radius)] w-full h-auto mb-4 sm:mb-0 block sm:hidden"
                    />
                    <div className="flex flex-col sm:flex-row items-center w-full sm:w-auto sm:gap-4">
                        <div className="flex items-center relative w-full sm:w-auto">
                            <Link
                                href="/course/introduction-to-java"
                                className="w-full sm:w-auto"
                            >
                                <button
                                    className="flex-1 sm:flex-none bg-blue-500 text-white px-5 py-[10px] rounded-full sm:ml-4 text-(length:--font-size-button) cursor-pointer group w-full sm:w-auto"
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
                                className="ml-[-2px] sm:ml-[-5px] w-[50px] h-[48px] sm:w-[65px] sm:h-[60px] hidden sm:block"
                            />
                            <Image
                                src="/images/line-md_arrow-up.svg"
                                alt="Left Image 2"
                                width={40}
                                height={40}
                                className={`absolute right-[11px] sm:right-[13px] w-[24px] h-[24px] sm:w-[35px] sm:h-[35px] hidden sm:block transition-transform duration-300`}
                                style={{
                                    transform: isHovering
                                        ? "rotate(-135deg)"
                                        : "rotate(0deg)",
                                    transition: "transform 0.3s ease-in-out",
                                }}
                            />
                        </div>
                        <Link href="/course" className="w-full sm:w-auto">
                            <button
                                className="bg-white text-black rounded-full w-full sm:w-auto border border-black flex items-center justify-center h-[40px] px-2 text-(length:--font-size-button) font-bold mt-3 sm:mt-0 cursor-pointer group"
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
                                        transition:
                                            "transform 0.3s ease-in-out",
                                    }}
                                />
                                <span className="text-black my-0 mr-2">
                                    ПЕРЕЙТИ К СПИСКУ ТЕМ
                                </span>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
