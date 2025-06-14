"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { subscribeToMailchimp } from "@/lib/mailchimp";

const Footer = () => {
    const [email, setEmail] = useState("");
    const [isHoveringArrow, setIsHoveringArrow] = useState(false);
    const [status, setStatus] = useState<{
        type: "success" | "error" | "loading" | null;
        message: string;
    }>({
        type: null,
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !email.includes("@")) {
            setStatus({
                type: "error",
                message: "Пожалуйста, укажите корректный email",
            });
            return;
        }

        try {
            setIsSubmitting(true);
            setStatus({
                type: "loading",
                message: "Подписываем вас...",
            });

            const result = await subscribeToMailchimp(email);

            if (result.success) {
                setStatus({
                    type: "success",
                    message: result.message,
                });
                setEmail(""); // Очищаем поле после успешной подписки
            } else {
                setStatus({
                    type: "error",
                    message: result.message,
                });
            }
        } catch (error) {
            setStatus({
                type: "error",
                message: "Произошла ошибка при подписке",
            });
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <footer className="py-16">
            <Image
                src="/images/rocket-delimeter.svg"
                alt="Rocket"
                width={80}
                height={80}
                className="w-full h-12 mb-10"
            />
            {/* First main section */}
            <div className="grid grid-cols-1 md:grid-cols-5 space-y-9 md:space-y-0 md:space-x-18 max-w-7xl mx-auto">
                {/* Left section with logo and socials */}
                <div className="sm:col-span-2 space-y-8 flex md:block flex-col items-center">
                    <div className="flex items-center space-x-4">
                        <Image
                            src="/images/siteLogo.svg"
                            alt="Logo"
                            width={40}
                            height={40}
                            className="object-contain"
                        />
                        <h2 className="text-2xl font-bold">CodOrbits.com</h2>
                    </div>
                    <p className="text-[16px] font-light text-center md:text-start">
                        CodOrbits предлагает полный курс по Java разработке: от
                        основ до фреймворков и DevOps. Без воды, с практическими
                        примерами и глубоким разбором сложных тем. Идеально для
                        начинающих и тех, кто хочет углубить знания.
                    </p>
                    <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-3">
                        <div className="flex space-x-2">
                            <a
                                href="https://www.facebook.com/sharer/sharer.php?u=https://codorbits.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative cursor-pointer hover:opacity-75"
                                aria-label="Поделиться в Facebook"
                            >
                                <Image
                                    src="/images/social_icon_back.svg"
                                    alt="Facebook"
                                    width={44}
                                    height={44}
                                    className=""
                                />
                                <Image
                                    src="/images/line-md_facebook.svg"
                                    alt="Facebook"
                                    width={20}
                                    height={20}
                                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                />
                            </a>

                            <a
                                href="https://twitter.com/intent/tweet?url=https://codorbits.com&text=Изучите программирование на Java с CodOrbits"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative cursor-pointer hover:opacity-75"
                                aria-label="Поделиться в Twitter"
                            >
                                <Image
                                    src="/images/social_icon_back.svg"
                                    alt="Twitter"
                                    width={44}
                                    height={44}
                                    className=""
                                />
                                <Image
                                    src="/images/line-md_twitter.svg"
                                    alt="Twitter"
                                    width={20}
                                    height={20}
                                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                />
                            </a>

                            <a
                                href="https://www.linkedin.com/sharing/share-offsite/?url=https://codorbits.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative cursor-pointer hover:opacity-75"
                                aria-label="Поделиться в LinkedIn"
                            >
                                <Image
                                    src="/images/social_icon_back.svg"
                                    alt="LinkedIn"
                                    width={44}
                                    height={44}
                                    className=""
                                />
                                <Image
                                    src="/images/line-md_linkedin.svg"
                                    alt="LinkedIn"
                                    width={20}
                                    height={20}
                                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                />
                            </a>

                            <a
                                href="https://www.instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative cursor-pointer hover:opacity-75"
                                aria-label="Перейти на Instagram"
                            >
                                <Image
                                    src="/images/social_icon_back.svg"
                                    alt="Instagram"
                                    width={44}
                                    height={44}
                                    className=""
                                />
                                <Image
                                    src="/images/line-md_instagram.svg"
                                    alt="Instagram"
                                    width={20}
                                    height={20}
                                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                />
                            </a>
                        </div>

                        <Link
                            href="/app-info"
                            className="group transition-transform hover:scale-105 ml-2 md:ml-0"
                            aria-label="Информация о нашем приложении"
                        >
                            <Image
                                src="/icons/google-play-badge.svg"
                                alt="Google Play"
                                width={105}
                                height={40}
                                className="w-[85px] h-[28px] md:w-[100px] md:h-[32px]"
                            />
                        </Link>
                    </div>
                </div>

                {/* Right section with navigation links */}
                <div className="sm:col-span-3">
                    <div className="flex flex-col md:flex-row md:justify-between gap-8 md:gap-4 w-full">
                        <div className="flex flex-col items-center md:items-start w-full max-w-[250px] mx-auto md:mx-0">
                            <h3 className="text-2xl md:text-xl lg:text-2xl font-[family-name:var(--font-helvetica-rounded)] font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-500">
                                Информация
                            </h3>
                            <ul className="space-y-2 flex md:block flex-col items-center w-full">
                                <li>
                                    <Link
                                        href="/#FeaturesSection"
                                        className="text-[16px] font-light break-words inline-block"
                                    >
                                        О нас
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/#ContactForm"
                                        className="text-[16px] font-light break-words inline-block"
                                    >
                                        Контакты
                                    </Link>
                                </li>
                                <li>
                                    {/* Sitemap link */}
                                    <Link
                                        href="/sitemap-html"
                                        className="text-[16px] font-light break-words inline-block"
                                    >
                                        Sitemap
                                    </Link>
                                </li>
                                <li>
                                    {/* Privacy Policy link */}
                                    <Link
                                        href="/privacy-policy"
                                        className="text-[16px] font-light break-words inline-block"
                                    >
                                        Политика
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="flex flex-col items-center md:items-start w-full max-w-[250px] mx-auto md:mx-0">
                            <h3 className="text-2xl md:text-xl lg:text-2xl font-[family-name:var(--font-helvetica-rounded)] font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-500">
                                Лучшие статьи
                            </h3>
                            <ul className="space-y-2 flex md:block flex-col items-center w-full">
                                <li>
                                    <Link
                                        href="/course/java-spring-framework"
                                        className="text-[16px] font-light break-words inline-block"
                                    >
                                        Введение в Spring
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        href="/course/hibernate-orm-in-java"
                                        className="text-[16px] font-light break-words inline-block"
                                    >
                                        Основы Hibernate
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/course/what-is-html"
                                        className="text-[16px] font-light break-words inline-block"
                                    >
                                        Основы HTML
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/course/sql-basics"
                                        className="text-[16px] font-light break-words inline-block"
                                    >
                                        Основы SQL
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/course/java-enterprise-edition-ee"
                                        className="text-[16px] font-light break-words inline-block"
                                    >
                                        Введение в Java EE
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="flex flex-col items-center md:items-start w-full max-w-[250px] mx-auto md:mx-0">
                            <h3 className="text-2xl md:text-xl lg:text-2xl font-[family-name:var(--font-helvetica-rounded)] font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-500">
                                Контакты
                            </h3>
                            <div className="flex flex-col gap-6 w-full">
                                <ul className="space-y-2 flex md:block flex-col items-center w-full">
                                    <li className="flex flex-col items-center md:items-start">
                                        <a
                                            href="mailto:CodOrbits@gmail.com"
                                            className="text-[16px] font-light break-words inline-block hover:underline"
                                        >
                                            Email: CodOrbits@gmail.com
                                        </a>
                                        <a
                                            href="https://t.me/CodOrbits"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[16px] font-light break-words inline-block hover:underline"
                                        >
                                            Telegram: @CodOrbits
                                        </a>
                                    </li>
                                </ul>
                                <Image
                                    src="/images/contacts_footer_image.png"
                                    alt="Contacts"
                                    width={124}
                                    height={124}
                                    className="cursor-pointer hover:opacity-75 mx-auto md:mx-0"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Second main section */}
            <div className="mt-16 overflow-visible">
                <h2 className="mx-auto text-center text-3xl font-bold mb-8 font-[family-name:var(--font-damion)] text-transparent bg-clip-text bg-gradient-to-r from-[#1F7CEF] to-[#7EB8FF] max-w-[330px]">
                    Dont Forget to subscribe!
                </h2>
                <div className="bg-[linear-gradient(91deg,#1F7CEF_0.71%,#4093FA_103.25%)] rounded-2xl py-1 px-9 max-w-7xl mx-auto relative">
                    <div className="absolute top-[0px] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <Image
                            src="/images/logo_back_footer.svg"
                            alt="Logo"
                            width={60}
                            height={60}
                            className="object-contain"
                        />
                        <Image
                            src="/images/old_logo_3.svg"
                            alt="Logo"
                            width={30}
                            height={30}
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                        />
                    </div>
                    <div className="absolute bottom-0 right-0">
                        <Image
                            src="/images/back_for_footer_blue_line.svg"
                            alt="Moon"
                            width={330}
                            height={330}
                            className="object-contain"
                        />
                    </div>
                    <div className="flex items-center justify-between text-[16px] font-light flex-col md:flex-row md:order-2">
                        <form
                            onSubmit={handleSubscribe}
                            className="flex relative items-center flex-1 max-w-md mx-4 md:order-2"
                        >
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                disabled={isSubmitting}
                                className="w-full px-4 py-2 mt-5 rounded-full bg-white text-[#454545] placeholder-[#454545]"
                            />
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="absolute right-[24px] top-11 flex items-center justify-center p-1 cursor-pointer "
                                onMouseEnter={() => setIsHoveringArrow(true)}
                                onMouseLeave={() => setIsHoveringArrow(false)}
                            >
                                <Image
                                    src="/images/→.svg"
                                    alt="Submit"
                                    width={14}
                                    height={14}
                                    className={`transition-transform duration-300 ${
                                        isHoveringArrow ? "scale-107" : ""
                                    }`}
                                    style={{
                                        transform: isHoveringArrow
                                            ? "scale(1.09)"
                                            : "scale(1)",
                                        transition:
                                            "transform 0.3s ease-in-out",
                                    }}
                                />
                            </button>
                            <Image
                                src="/images/input_part.svg"
                                alt="Left Image 2"
                                width={70}
                                height={70}
                                className="ml-[-11px] mt-5"
                            />

                            {status.type && (
                                <div
                                    className={`absolute -bottom-6 left-0 text-sm px-3 py-1 rounded-full ${
                                        status.type === "success"
                                            ? "bg-green-100 text-green-800"
                                            : status.type === "error"
                                            ? "bg-red-100 text-red-800"
                                            : "bg-blue-100 text-blue-800"
                                    }`}
                                >
                                    {status.message}
                                </div>
                            )}
                        </form>
                        <p className="flex-1 text-white sm:order-1 mb-5 md:mb-0 text-center md:text-start z-10 text-[14px] md:text-[12px] lg:text-[16px]">
                            © 2025 CodOrbits. Все права защищены. Использование
                            разрешено только с указанием автора.
                        </p>
                        <div className="md:flex-1 md:order-2" />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
