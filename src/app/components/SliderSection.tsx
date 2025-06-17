"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function SliderSection() {
    const [currentImage, setCurrentImage] = useState("/images/exampleffff.gif");
    const [currentText, setCurrentText] = useState(
        "Каждый урок содержит разбор примеров с пояснением, включая возможные ошибки и лучшие решения."
    );
    const [currentAltText, setCurrentAltText] = useState(
        "Изучение Java на примерах и разбор того как работает java программа"
    );

    const items = [
        {
            title: "Практическое изучение Java",
            image: "/images/exampleffff-ezgif.com-gif-to-webm-converter (1).webm",
            text: "Каждый урок содержит разбор примеров с пояснением, включая возможные ошибки и лучшие решения.",
            altText:
                "Изучение Java на примерах и разбор того как работает java программа",
        },
        {
            title: "Полный стек Java-разработки",
            image: "/images/Technologies2.webp",
            text: "Курс охватывает backend, фреймворки, основы frontend и DevOps. Все, что должен знать современный Java бэкенд разработчик в одном курсе.",
            altText: "Полный стек Java-разработки",
        },
        {
            title: "Разбор сложных тем в деталях",
            image: "/images/InterfAbstr.png",
            text: "Разбираем самые сложные темы: Абстрактные классы vs интерфейсы, Inner class vs Static class, работа Spring изнутри. Вы будете мыслить как профи.",
            altText: "Разбор сложных тем в деталях",
        },
        {
            title: "Методичное изложение",
            image: "/images/ezgif-17472f71a3db93-ezgif.com-gif-to-webm-converter.webm",
            text: "Пошаговые инструкции и скриншоты помогут установить всё нужное ПО и настроить среду разработки без лишних вопросов.",
            altText: "Методичное изложение курса",
        },
        {
            title: "Концентрат знаний, без воды",
            image: "/images/patterns.png",
            text: "Не документация, а суть. Объясняем самые нужные и сложные концепции простым языком. То, что действительно важно и часто спрашивают.",
            altText: "Концентрат знаний, без воды",
        },
        {
            title: "Готовое резюме Java-developer",
            image: "/images/resume.webp",
            text: "Получите знания для сильного резюме и будьте готовы к техническим собеседованиям. Курс даст все нужные знания для вашего трудоустройства.",
            altText: "Готовое резюме Java-developer",
        },
    ];

    // Preload all images for better performance
    useEffect(() => {
        items.forEach((item) => {
            // Use the browser's HTMLImageElement instead of the Next.js Image
            const img = document.createElement("img");
            img.src = item.image;
        });
    }, []);

    return (
        <section className="mt-15 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-gradient-end)] 2xl:p-14 xl:p-10 p-4 sm:p-7 rounded-[var(--border-radius)] flex-col lg:flex-row flex items-start 2xl:gap-18 xl:gap-6 gap-3 relative">
            <div className="flex-1 flex flex-col items-start w-full order-2 lg:order-1">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className={`mb-4 px-3 py-3 sm:py-2 sm:px-5 w-full rounded-[var(--border-radius-small)] ${
                            currentImage === item.image ? "bg-[#4A9BFF]" : ""
                        }`}
                    >
                        <button
                            className={`text-[16px] sm:text-[20px] text-left font-bold font-[family-name:var(--font-helvetica-rounded)] ${
                                currentImage === item.image
                                    ? "text-white"
                                    : "text-[#CDE2FC]"
                            }`}
                            onClick={() => {
                                setCurrentImage(item.image);
                                setCurrentText(item.text);
                                setCurrentAltText(item.altText);
                            }}
                        >
                            {item.title}
                        </button>
                        {currentImage === item.image && (
                            <p className="text-white font-thin mt-1">
                                {currentText}
                            </p>
                        )}
                    </div>
                ))}
            </div>
            <div className="ml-0 lg:ml-6 p-3 sm:p-4 2xl:p-5 lg:w-[61%] 2xl:w-[56%] w-full bg-[#4A9BFF] rounded-[var(--border-radius-small)] order-1 lg:order-2">
                <Image
                    src={currentImage}
                    alt={currentAltText}
                    width={700}
                    height={400}
                    quality={100}
                    className="w-full h-auto rounded-[var(--border-radius-small)]"
                />
            </div>
            <Image
                src="/images/back_small_image1_for_slider_section.svg"
                alt="Small Image 1"
                width={86}
                height={86}
                className="absolute top-0 right-[-12px] sm:right-[-24px] sm:w-[126px] sm:h-[126px] w-[70px] h-[70px]"
            />
            <Image
                src="/images/back_small_image3_for_slider_section.svg"
                alt="Small Image 2"
                width={86}
                height={86}
                className="absolute top-[-8px] left-[-8px] sm:w-[86px] sm:h-[86px] w-[50px] h-[50px]"
            />
            <Image
                src="/images/back_small_image2_for_slider_section.svg"
                alt="Small Image 3"
                width={86}
                height={86}
                className="absolute bottom-[-7px] right-[-2px] sm:w-[86px] sm:h-[86px] w-[50px] h-[50px]"
            />
        </section>
    );
}
