"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    return (
        <>
            <header className="flex justify-between items-center py-4 bg-white mt-4">
                <Link href="/">
                    <div className="flex items-center">
                        <Image
                            src="/images/siteLogo.svg"
                            alt="Logo"
                            width={35}
                            height={35}
                            className="w-[22px] h-[22px] lg:w-[26px] lg:h-[26px]"
                        />
                        <span className="ml-2 text-[20px] lg:text-[26px] font-bold font-[family-name:var(--font-helvetica-rounded)] tracking-[0.04em]">
                            CodOrbits
                            <span className="hidden lg:inline">.com</span>
                        </span>
                    </div>
                </Link>
                <nav className="hidden md:flex space-x-[34px] lg:space-x-[54px] text-[16px] lg:text-[20px]">
                    <Link href="/">Главная</Link>
                    <Link href="/#FeaturesSection">О нас</Link>
                    <Link href="/course">Курс</Link>
                    <Link href="/contact">Контакты</Link>
                </nav>
                <div className="flex items-center space-x-[-5px]">
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
                            className="ml-[-2px] lg:ml-[-5px] w-[50px] h-[48px] lg:w-[70px] lg:h-[65px] hidden sm:block"
                        />
                        <Image
                            src="/images/line-md_arrow-up.svg"
                            alt="Left Image 2"
                            width={40}
                            height={40}
                            className={`absolute right-[11px] lg:right-[13px] w-[24px] h-[24px] lg:w-[38px] lg:h-[38px] hidden sm:block transition-transform`}
                            style={{
                                transform: isHovering
                                    ? "rotate(-135deg)"
                                    : "rotate(0deg)",
                                transition: "transform 0.3s ease-in-out",
                            }}
                        />
                    </div>
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden ml-4 p-1"
                    >
                        {isMobileMenuOpen ? (
                            <Image
                                src="/images/close-bold-svgrepo-com.svg"
                                alt="Close menu"
                                width={24}
                                height={24}
                                className="w-6 h-6"
                            />
                        ) : (
                            <Image
                                src="/images/hamburger-svgrepo-com.svg"
                                alt="Open menu"
                                width={24}
                                height={24}
                                className="w-6 h-6"
                            />
                        )}
                    </button>
                </div>
            </header>

            {/* Mobile menu */}
            <div
                className={`fixed inset-0 bg-white transform transition-transform duration-300 ease-in-out z-50 md:hidden ${
                    isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="flex items-center justify-between px-6 py-4 border-b">
                    <Link href="/">
                        <div className="flex items-center">
                            <Image
                                src="/images/siteLogo.svg"
                                alt="Logo"
                                width={35}
                                height={35}
                                className="w-[20px] h-[20px] lg:w-[26px] lg:h-[26px]"
                            />
                            <h1 className="ml-2 text-[19px] lg:text-[28px] font-bold font-[family-name:var(--font-helvetica-rounded)] tracking-[0.04em]">
                                CodOrbits.com
                            </h1>
                        </div>
                    </Link>
                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="p-1"
                    >
                        <Image
                            src="/images/close-bold-svgrepo-com.svg"
                            alt="Close menu"
                            width={24}
                            height={24}
                            className="w-6 h-6"
                        />
                    </button>
                </div>
                <nav className="px-6 py-4 space-y-4">
                    <Link
                        href="/"
                        className="block"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Главная
                    </Link>
                    <Link
                        href="/#FeaturesSection"
                        className="block"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        О нас
                    </Link>
                    <Link
                        href="/course"
                        className="block"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Курс
                    </Link>
                    <Link
                        href="/contact"
                        className="block"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Контакты
                    </Link>
                </nav>
                <div className="px-6 pb-6">
                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="w-full bg-blue-500 text-white px-5 py-[10px] rounded-full text-center cursor-pointer group"
                    >
                        НАЧАТЬ УЧИТЬСЯ!
                    </button>
                </div>
            </div>
        </>
    );
}
