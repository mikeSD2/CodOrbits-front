"use client";

import Image from "next/image";

interface Review {
    name: string;
    text: string;
    quoteColor: string;
}

const reviews: Review[] = [
    {
        name: "Алексей Раченко",
        text: "Настолько полный курс по java да еще и бесплатно не часто увидишь. Спасибо за труды!",
        quoteColor: "text-blue-600",
    },
    {
        name: "Андрей Мокин",
        text: "Отличный Java курс. Пользуюсь уже 9 дней, и уже чувствую, что прогресс есть. Рекламы вообще нету. Всем советую",
        quoteColor: "text-blue-500",
    },
    {
        name: "София Терехина",
        text: "Начала читать курс и была просто поражена насколько понятно и доступно все обьяснено.",
        quoteColor: "text-blue-600",
    },
    {
        name: "Елена Кузнецова",
        text: "Большое спасибо создателям курса! Дало довольно довольно много знаний и в итоге помогло устроиться на работу",
        quoteColor: "text-blue-500",
    },
    {
        name: "Леонид Соколов",
        text: "Материал хороший, понятный, пока еще ничего не разочеровало.",
        quoteColor: "text-blue-500",
    },
];

export default function ReviewsSection() {
    return (
        <section className="w-[100vw] max-w-[100vw] ml-[calc(-50vw+50%)] overflow-x-hidden px-[7px] pb-[120px] mb-[-120px]">
            <div className="w-[92%] sm:w-[88%] max-w-[var(--container-width)] mx-auto py-12 relative">
                <div className="container mx-auto">
                    <h2 className="text-(length:--font-size-headings-large-sm) sm:text-(length:--font-size-headings-large) max-w-[310px] font-[family-name:var(--font-helvetica-rounded)] font-bold mb-8 sm:mb-20 lg:mb-8">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-500">
                            Отзывы
                        </span>
                        &nbsp;наших учеников
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-15">
                        <div className="space-y-7 flex flex-col justify-between mt-[-20px] sm:mt-[-48px] gap-3 order-1 lg:order-2">
                            {reviews.slice(2).map((review, index) => (
                                <div key={index}>
                                    <div className="flex items-start gap-5 sm:gap-9">
                                        <Image
                                            src="/images/quotes.svg"
                                            alt="Quotes"
                                            width={90}
                                            height={90}
                                            className="w-[40px] sm:w-[60px] h-[40px] sm:h-[60px]"
                                        />
                                        <div className="flex flex-col">
                                            <h3 className="text-black font-semibold mb-2 font-[family-name:var(--font-helvetica-rounded)] text-(length:--font-size-headings-base-sm) sm:text-(length:--font-size-headings-base)">
                                                {review.name}
                                            </h3>
                                            <p className="text-black font-thin">
                                                {review.text}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="space-y-6 flex flex-col justify-between gap-3 order-2 lg:order-1">
                            {reviews.slice(0, 2).map((review, index) => (
                                <div key={index}>
                                    <div className="flex items-start gap-5 sm:gap-9">
                                        <Image
                                            src="/images/quotes.svg"
                                            alt="Quotes"
                                            width={90}
                                            height={90}
                                            className="w-[40px] sm:w-[60px] h-[40px] sm:h-[60px]"
                                        />
                                        <div className="flex flex-col">
                                            <h3 className="text-black font-semibold mb-2 font-[family-name:var(--font-helvetica-rounded)] text-(length:--font-size-headings-base-sm) sm:text-(length:--font-size-headings-base)">
                                                {review.name}
                                            </h3>
                                            <p className="text-black font-thin">
                                                {review.text}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className=" flex sm:mt-8 bg-[#EEF4FD] rounded-[var(--border-radius)] items-center p-3 sm:p-4">
                                <Image
                                    src="/images/fluent_phone-12-regular.svg"
                                    alt="Vector"
                                    width={24}
                                    height={24}
                                />
                                <p className="mx-2">→</p>
                                <p className="text-black text-center">
                                    &nbsp;Отзывы взяты из Google Play к нашему
                                    приложению
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <Image
                    src="/images/blue_back_Ellipse.png"
                    alt="Blue Back Ellipse"
                    width={1004}
                    height={1004}
                    className="absolute -right-30 -bottom-30 z-[-1] w-[654px] h-[654px]"
                />
                <Image
                    src="/images/blue_back_Ellipse.png"
                    alt="Blue Back Ellipse"
                    width={1004}
                    height={1004}
                    className="absolute -left-30 -top-30 z-[-1] w-[654px] h-[654px]"
                />
            </div>
        </section>
    );
}
