"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";

export default function StagesSection() {
    const textRef = useRef<HTMLHeadingElement>(null);
    const [textHeight, setTextHeight] = useState(0);

    useEffect(() => {
        const updateHeight = () => {
            if (textRef.current) {
                setTextHeight(textRef.current.offsetHeight);
            }
        };

        updateHeight();

        window.addEventListener("resize", updateHeight);
        return () => window.removeEventListener("resize", updateHeight);
    }, []);
    return (
        <section className="mt-15 flex flex-col">
            <div className="bg-[var(--color-secondary)] rounded-[var(--border-radius-small)] sm:rounded-[var(--border-radius)] ">
                <div className="max-w-[var(--container-width)] mx-auto flex flex-col lg:flex-row gap-8 p-5 md:p-6 lg:p-8">
                    <div className="w-full lg:w-[55%]">
                        <div className="flex items-start gap-5 mb-4">
                            <Image
                                src="/images/siteLogo.svg"
                                alt="Small Icon"
                                width={72}
                                height={72}
                                style={{
                                    height: `${textHeight}px`,
                                    width: "auto",
                                    objectFit: "contain",
                                }}
                                className=""
                            />
                            <h2
                                ref={textRef}
                                className="stages-title lg:flex-7 text-[calc(var(--font-size-headings-large-sm)-5px)] sm:text-(length:--font-size-headings-large-sm) lg:text-[calc(var(--font-size-headings-base)-6.5px)] 2xl:text-[calc(var(--font-size-headings-base)-1px)] font-[family-name:var(--font-helvetica-rounded)] font-bold max-w-md"
                            >
                                Что вам даст наш{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-500">
                                    бесплатный курс
                                </span>{" "}
                                по программированию?
                            </h2>
                        </div>
                        <p className="mb-6 font-thin text-(length:--font-size-text-base) lg:text-[18px] 2xl:text-(length:--font-size-text-base)">
                            Наш бесплатный курс по программированию превратит
                            вас в уверенного Java разработчика. Освойте Java
                            программирование с нуля, получите востребованные
                            навыки и начните карьеру в IT. Мы даем глубокие
                            знания для реальных задач, делая из вас солидного
                            специалиста.
                        </p>
                        <div className="text-[15.5px] md:text-[20px] lg:text-[15.5px] xl:text-[20px] inline-flex items-center border border-black rounded-full p-3 px-5 sm:px-3 w-full">
                            <span className="mr-2 font-[family-name:var(--font-jura)] flex items-center">
                                <span className="font-semibold">
                                    Средний доход Java разработчика →{" "}
                                </span>
                                <span className="text-green-600 font-bold ml-1">
                                    $3000
                                </span>
                            </span>
                            <div className="flex items-center">
                                <span className="text-sm xl:text-lg">💰</span>
                                <span className="text-sm xl:text-lg ml-1 hidden sm:block">
                                    💎
                                </span>
                                <span className="text-sm xl:text-lg ml-1 hidden sm:block">
                                    🚀
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-[45%]">
                        <Image
                            src="/images/programmer_stages.png"
                            alt="Backend разработчик на карьерном пути после того, как он завершит курс продвинутая Java"
                            width={500}
                            height={300}
                            className="w-full h-auto"
                        />
                    </div>
                </div>
            </div>
            <Image
                src="/images/part_of_stages_section.png"
                alt="Section Image"
                width={100}
                height={100}
                className="self-left ml-[130px]"
            />
            <div className="flex lg:flex-row flex-col">
                <div className="flex-1 bg-[var(--color-tertiary)] rounded-[var(--border-radius-small)] sm:rounded-[var(--border-radius)] p-5 md:p-6 lg:p-8 -mb-10 lg:-mb-0">
                    <div className="flex flex-row gap-5 sm:gap-8">
                        <div className="flex flex-col items-center">
                            <div className="relative">
                                <Image
                                    src="/images/point_back.svg"
                                    alt="Small Icon"
                                    width={30}
                                    height={30}
                                    className="min-w-10 min-h-10 sm:min-w-17 sm:min-h-17 animate-slow-spin"
                                />
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <p className="font-bold font-[family-name:var(--font-helvetica-rounded)] text-[12px] sm:text-[25px] text-transparent bg-clip-text bg-gradient-to-b from-blue-600 to-blue-400">
                                        01
                                    </p>
                                </div>
                            </div>
                            <div className="border-l border-dotted border-black h-full w-[1px]"></div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h3 className="font-bold">
                                Учись сразу, без регистрации
                            </h3>
                            <p className="font-thin mb-8 text-(length:--font-size-text-base) lg:text-[18px] 2xl:text-(length:--font-size-text-base)">
                                Все уроки открыты для всех. Просто заходишь и
                                начинаешь. Никаких аккаунтов, паролей и email.
                                Начни обучение программированию сразу — без
                                ожиданий.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-row gap-5 sm:gap-8">
                        <div className="flex flex-col items-center">
                            <div className="relative">
                                <Image
                                    src="/images/point_back.svg"
                                    alt="Small Icon"
                                    width={30}
                                    height={30}
                                    className="min-w-10 min-h-10 sm:min-w-17 sm:min-h-17 animate-slow-spin"
                                />
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <p className="font-bold font-[family-name:var(--font-helvetica-rounded)] text-[12px] sm:text-[25px] text-transparent bg-clip-text bg-gradient-to-b from-blue-600 to-blue-400">
                                        02
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h3 className="font-bold">
                                Удобный и понятный формат
                            </h3>
                            <p className="font-thin text-(length:--font-size-text-base) lg:text-[18px] 2xl:text-(length:--font-size-text-base)">
                                Наш курс Java выстроен для комфортного обучения.
                                Подробные объяснения, примеры, скриншоты и
                                пошаговая структура помогут легко освоить даже
                                сложные темы без путаницы.
                            </p>
                        </div>
                    </div>
                </div>
                <Image
                    src="/images/part_of_stages_section1.png"
                    alt="Section Image"
                    width={21}
                    height={21}
                    className="self-center transform rotate-90 lg:rotate-0 ml-[50px] lg:ml-0"
                />
                <div className="flex-1 bg-[var(--color-tertiary)] rounded-[var(--border-radius-small)] sm:rounded-[var(--border-radius)] p-5 md:p-6 lg:p-8 -mt-10 lg:-mt-0">
                    <div className="flex flex-row gap-5 sm:gap-8">
                        <div className="flex flex-col items-center">
                            <div className="relative">
                                <Image
                                    src="/images/point_back.svg"
                                    alt="Small Icon"
                                    width={30}
                                    height={30}
                                    className="min-w-10 min-h-10 sm:min-w-17 sm:min-h-17 animate-slow-spin"
                                />
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <p className="font-bold font-[family-name:var(--font-helvetica-rounded)] text-[12px] sm:text-[25px] text-transparent bg-clip-text bg-gradient-to-b from-blue-600 to-blue-400">
                                        03
                                    </p>
                                </div>
                            </div>
                            <div className="border-l border-dotted border-black h-full w-[1px]"></div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h3 className="font-bold">
                                Навыки для сильного портфолио
                            </h3>
                            <p className="font-thin mb-8 text-(length:--font-size-text-base) lg:text-[18px] 2xl:text-(length:--font-size-text-base)">
                                Ты разберешься в десятках практических задач и
                                проектов. В итоге — реальные навыки для
                                составления заметного портфолио разработчика,
                                которое можно будет показать работодателю.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-row gap-5 sm:gap-8">
                        <div className="flex flex-col items-center">
                            <div className="relative">
                                <Image
                                    src="/images/point_back.svg"
                                    alt="Small Icon"
                                    width={30}
                                    height={30}
                                    className="min-w-10 min-h-10 sm:min-w-17 sm:min-h-17 animate-slow-spin"
                                />
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <p className="font-bold font-[family-name:var(--font-helvetica-rounded)] text-[12px] sm:text-[25px] text-transparent bg-clip-text bg-gradient-to-b from-blue-600 to-blue-400">
                                        04
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h3 className="font-bold">
                                Готовое резюме и уверенность
                            </h3>
                            <p className="font-thin text-(length:--font-size-text-base) lg:text-[18px] 2xl:text-(length:--font-size-text-base)">
                                После курса у тебя будет резюме, охватывающее
                                все ключевые технологии. Глубокое понимание тем
                                даст уверенность и полную готовность отвечать на
                                вопросы на любом собеседовании.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
