"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { sendContactForm } from "@/lib/api/wordpress";
import { getRecaptchaToken, loadRecaptcha } from "@/lib/recaptcha";

export default function ContactForm() {
    const [formData, setFormData] = useState({
        email: "",
        subject: "",
        message: "",
    });
    const [status, setStatus] = useState<{
        type: "success" | "error" | "loading" | null;
        message: string;
    }>({
        type: null,
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        // Предварительно загружаем reCAPTCHA скрипт при монтировании компонента
        loadRecaptcha();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.email || !formData.subject || !formData.message) {
            setStatus({
                type: "error",
                message: "Пожалуйста, заполните все поля",
            });
            return;
        }

        setIsSubmitting(true);
        setStatus({
            type: "loading",
            message: "Отправка сообщения...",
        });

        try {
            // Get reCAPTCHA token
            const token = await getRecaptchaToken("contact_form");

            const result = await sendContactForm(
                formData.email,
                formData.subject,
                formData.message,
                token
            );

            if (result.success) {
                setStatus({
                    type: "success",
                    message: result.message,
                });
                // Очистить форму после успешной отправки
                setFormData({
                    email: "",
                    subject: "",
                    message: "",
                });
            } else {
                setStatus({
                    type: "error",
                    message: result.message,
                });
            }
        } catch {
            setStatus({
                type: "error",
                message: "Произошла ошибка при отправке сообщения",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <section id="ContactForm" className="pt-16">
            <div className="bg-[var(--color-secondary)] rounded-2xl p-4 md:p-6 lg:p-8">
                <form onSubmit={handleSubmit} className="w-full">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                        {/* Left section - 40% */}
                        <div className="md:col-span-2">
                            <h2 className="font-[family-name:var(--font-helvetica-rounded)] text-(length:--font-size-headings-large-sm) lg:text-(length:--font-size-headings-large) font-bold mb-8">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-500">
                                    Есть какие-то
                                </span>
                                &nbsp;вопросы?
                            </h2>

                            <div className="space-y-2">
                                <div>
                                    <div className="flex items-center relative flex-grow -my-6 -mr-4">
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Ваш email"
                                            className="px-3 py-2 lg:px-4 lg:py-3 rounded-[var(--border-radius)] bg-white w-[100%] placeholder:text-[#454545] text-[#454545] focus:outline-none focus:ring-2 focus:ring-blue-500 text-[15px] lg:text-[17px]"
                                            required
                                            disabled={isSubmitting}
                                        />
                                        <Image
                                            src="/images/input_part.svg"
                                            alt="Email decoration"
                                            width={80}
                                            height={80}
                                            className="ml-[-11px]"
                                        />
                                        <Image
                                            src="/images/iconamoon_email-light.svg"
                                            alt="Email icon"
                                            width={16}
                                            height={16}
                                            className="absolute right-[30px] mb-[2px]"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center relative flex-grow -mr-4">
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            placeholder="О чем хотите поговорить?"
                                            className="px-3 py-2 lg:px-4 lg:py-3 rounded-[var(--border-radius)] bg-white w-[100%] placeholder:text-[#454545] text-[#454545] focus:outline-none focus:ring-2 focus:ring-blue-500 text-[15px] lg:text-[17px]"
                                            required
                                            disabled={isSubmitting}
                                        />
                                        <Image
                                            src="/images/input_part.svg"
                                            alt="Subject decoration"
                                            width={80}
                                            height={80}
                                            className="ml-[-11px]"
                                        />
                                        <Image
                                            src="/images/mingcute_question-line.svg"
                                            alt="Question icon"
                                            width={18}
                                            height={18}
                                            className="absolute right-[30px] mb-[2px]"
                                        />
                                    </div>
                                </div>
                                {status.type && (
                                    <div
                                        className={`p-3 rounded-lg text-sm mt-2 mb-7 ${
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
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full cursor-pointer group"
                                >
                                    <div className="flex p-0 mt-1 border border-blue-500 border-[5px] relative rounded-l-4xl rounded-tr-xl rounded-br-xl mr-[3px]">
                                        <Image
                                            src="/images/contact_button_man.png"
                                            alt="Icon"
                                            width={100}
                                            height={100}
                                            quality={100}
                                            className="w-[80px] h-auto object-contain flex-shrink-0 -mt-6 ml-[7px] relative object-bottom"
                                        />
                                        <Image
                                            src="/images/contact_us_button_part.svg"
                                            alt="Icon"
                                            width={100}
                                            height={100}
                                            quality={100}
                                            className="w-[10px] h-auto object-contain flex-shrink-0 -mt-6 -ml-[8px] relative object-bottom"
                                        />
                                        <div className="flex flex-grow justify-center items-center bg-[#1F7CEF] p-2 relative rounded-l-2xl rounded-bl-none rounded-tr-sm rounded-br-sm">
                                            <Image
                                                src="/images/rocket_back_for_contact_us.svg"
                                                alt="Button background"
                                                width={100}
                                                height={150}
                                                quality={100}
                                                className="w-[100%] absolute z-[3] left-3"
                                            />
                                            <p className="text-center text-white font-[family-name:var(--font-helvetica-rounded)] text-lg font-bold z-10">
                                                ОТПРАВИТЬ{" "}
                                                <span className="hidden sm:inline md:hidden xl:inline">
                                                    СООБЩЕНИЕ
                                                </span>
                                            </p>
                                            <Image
                                                src="/images/back_for_contact_us_button.svg"
                                                alt="Button background"
                                                width={100}
                                                height={150}
                                                quality={100}
                                                className="h-[calc(100%+10px)] w-auto absolute right-[-5px] object-contain object-right z-[1]"
                                            />
                                            <div className="absolute right-[-5px] h-[calc(100%+10px)] w-[142px] bg-gradient-to-r from-[#1F7CEF] to-[#519AF4BB] z-[2] rounded-tr-xl rounded-br-xl"></div>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>

                        {/* Right section - 60% */}
                        <div className="md:col-span-3 flex flex-col">
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Ваше сообщение..."
                                className="w-full min-h-[200px] sm:h-full px-4 py-3 rounded-lg bg-white border border-white/20 text-[#454545] placeholder-[#454545] focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none text-[15px] lg:text-[17px]"
                                required
                                disabled={isSubmitting}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
}
