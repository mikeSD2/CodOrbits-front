"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { subscribeToMailchimp } from "@/lib/mailchimp";
import { getRecaptchaToken, loadRecaptcha } from "@/lib/recaptcha";

const SubscriptionBanner = () => {
    const [isHovering2, setIsHovering2] = useState(false);
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<{
        type: "success" | "error" | "loading" | null;
        message: string;
    }>({
        type: null,
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Предварительная загрузка reCAPTCHA при монтировании компонента
    useEffect(() => {
        loadRecaptcha();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
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

            // Получаем токен reCAPTCHA
            const recaptchaToken = await getRecaptchaToken("subscribe_form");

            const result = await subscribeToMailchimp(email, recaptchaToken);

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
        } catch {
            setStatus({
                type: "error",
                message: "Произошла ошибка при подписке",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="pb-15 md:pb-20 w-[100vw] max-w-[100vw] ml-[calc(-50vw+50%)] overflow-x-hidden overflow-y-visible px-[7px] pt-[350px] mt-[-400px]">
            <div className="w-[92%] sm:w-[88%] max-w-[var(--container-width)] mx-auto flex justify-between overflow-visible bg-[linear-gradient(91deg,#1F7CEF_0.71%,#4093FA_103.25%)] rounded-[var(--border-radius)] relative ">
                <Image
                    src="/images/rocket_subscr_line.svg"
                    alt="Right Image 2"
                    width={96}
                    height={96}
                    className="absolute w-[66px] xl:w-[82px] h-auto -top-[31px] -right-[21px]"
                />
                <Image
                    src="/images/small_line for_subscr.svg"
                    alt="Right Image 2"
                    width={96}
                    height={96}
                    className="absolute w-[66px] xl:w-[82px] h-auto -top-[15px] left-[40%] z-[-1]"
                />
                <Image
                    src="/images/small_line for_subscr.svg"
                    alt="Right Image 2"
                    width={96}
                    height={96}
                    className="absolute w-[66px] xl:w-[82px] h-auto -bottom-[14px] left-[55%] z-[-1] transform rotate-180"
                />
                <div className="flex flex-col sm:flex-row items-center px-10 py-5 gap-12 sm:gap-8 lg:gap-12 xl:gap-16 w-[100%]">
                    <div className="flex-2 lg:flex-1 ml-4 -mb-5 -mt-26 self-stretch sm:self-end">
                        <Image
                            src="/images/man_subscr_line.png"
                            alt="Subscription"
                            width={224}
                            height={224}
                            className="w-full sm:h-auto sm:min-w-[154px]"
                        />
                    </div>
                    <div className="flex-2 lg:flex-3 flex flex-col lg:flex-row items-start lg:items-center gap-2 lg:gap-10">
                        <p className="text-white font-bold text-[19px] md:text-[23px] lg:text-[19px] xl:text-[23px] font-[family-name:var(--font-helvetica-rounded)] sm:max-w-[280px] lg:max-w-[220px] xl:max-w-[280px]">
                            Хотите быть в курсе выхода новых уроков?
                        </p>
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col flex-grow items-center -mb-3 lg:-mb-0 w-full sm:w-auto gap-2"
                        >
                            <div className="flex items-center relative flex-grow w-full">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Введите ваш email"
                                    className="px-4 py-2 rounded-[var(--border-radius)] bg-white w-[100%] text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    disabled={isSubmitting}
                                />
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="absolute right-[27px] flex items-center justify-center p-1 cursor-pointer group"
                                    onMouseEnter={() => setIsHovering2(true)}
                                    onMouseLeave={() => setIsHovering2(false)}
                                >
                                    <Image
                                        src="/images/→.svg"
                                        alt="Submit"
                                        width={16}
                                        height={16}
                                        className={`mb-[2px] transition-transform duration-300 ${
                                            isHovering2 ? "scale-107" : ""
                                        }`}
                                        style={{
                                            transform: isHovering2
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
                                    width={80}
                                    height={80}
                                    className="ml-[-11px]"
                                />
                            </div>

                            {status.type && (
                                <div
                                    className={`text-sm px-3 py-1 rounded-full ${
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
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SubscriptionBanner;
