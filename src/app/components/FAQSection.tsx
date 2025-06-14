"use client";

import { useState } from "react";
import Image from "next/image";

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQSectionProps {
    items: FAQItem[];
}

export default function FAQSection({ items }: FAQSectionProps) {
    const [expanded, setExpanded] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setExpanded((prev) => (prev === index ? null : index));
    };

    return (
        <section>
            <div className="space-y-3.5 relative">
                {items.map((item, index) => (
                    <div key={index}>
                        <div
                            className="z-10 relative bg-[linear-gradient(91deg,#1F7CEF_0.71%,#4093FA_103.25%)] rounded-xl p-4 hover:from-blue-600 hover:to-blue-700 transition-all duration-300 cursor-pointer overflow-hidden"
                            onClick={() => toggleFAQ(index)}
                        >
                            <Image
                                src="/images/FAQ_back.png"
                                alt="Right Image 2"
                                width={906}
                                height={206}
                                className="z-0 absolute bottom-0 w-full -ml-4 h-[20px] sm:h-auto"
                            />
                            <div className="flex items-center justify-between z-10 relative">
                                <p className="text-white font-semibold text-[17px] md:text-[20px]">
                                    {item.question}
                                </p>
                                <div className="relative">
                                    <div
                                        className={`w-10 h-10 transition-transform duration-300 ${
                                            expanded === index
                                                ? "rotate-45"
                                                : "-rotate-0"
                                        }`}
                                    >
                                        <Image
                                            src="/images/plus_for_faq.svg"
                                            alt="Plus"
                                            width={90}
                                            height={90}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className={`relative bg-white overflow-hidden transition-all duration-300 border-[1px] border-[#C8C8C8] rounded-xl -mt-5 pt-4 ${
                                expanded === index ? "max-h-[500px]" : "max-h-0"
                            }`}
                        >
                            <p className="p-4 whitespace-pre-wrap">
                                {item.answer}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
