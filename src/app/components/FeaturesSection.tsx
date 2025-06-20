"use client";

import Image from "next/image";

export default function FeaturesSection() {
    return (
        <section
            id="FeaturesSection"
            className="mt-15 flex gap-1 sm:gap-10 flex-col lg:flex-row"
        >
            <div className="flex flex-col sm:w-[400px] sm:min-w-[320px] gap-0">
                <h2 className="text-(length:--font-size-headings-large-sm) lg:text-(length:--font-size-headings-base) font-[family-name:var(--font-helvetica-rounded)] font-bold">
                    Наши преимущества перед другими курсами по Java
                </h2>
                <Image
                    src="/images/rocket_underline.png"
                    alt="Section Image"
                    width={500}
                    height={299}
                    quality={99}
                    className="rounded-[var(--border-radius)] w-full h-auto mt-[-15px]"
                />
            </div>
            <div className="flex flex-col sm:flex-row space-x-4 lg:ml-8 gap-7 sm:gap-3">
                <div className="bg-white rounded-[var(--border-radius)] flex-1">
                    <h3 className="text-[56px] font-[family-name:var(--font-helvetica-rounded)] font-bold text-transparent bg-clip-text bg-gradient-to-b from-blue-600 to-blue-400 mb-2">
                        200+
                    </h3>
                    <hr className="border-gray-300 mb-2" />
                    <p className="font-thin">
                        Коллекцияd из более чем двухсот уроков, охватывающих все
                        аспекты Java разработки.
                    </p>
                </div>
                <div className="bg-white rounded-[var(--border-radius)] flex-1">
                    <h3 className="text-[56px] font-[family-name:var(--font-helvetica-rounded)] font-bold text-transparent bg-clip-text bg-gradient-to-b from-blue-600 to-blue-400 mb-2">
                        300+
                    </h3>
                    <hr className="border-gray-300 mb-2" />
                    <p className="font-thin">
                        Огромное колличество примеров которые помогут понять
                        даже самые сложные темы.
                    </p>
                </div>
                <div className="bg-white rounded-[var(--border-radius)] flex-1">
                    <h3 className="text-[56px] font-[family-name:var(--font-helvetica-rounded)] font-bold text-transparent bg-clip-text bg-gradient-to-b from-blue-600 to-blue-400 mb-2">
                        4.7+
                    </h3>
                    <hr className="border-gray-300 mb-2" />
                    <p className="font-thin">
                        Наше мобильное приложение с этим курсом имеет оценку 4.7
                        — качество проверено сотнями людей.
                    </p>
                </div>
            </div>
        </section>
    );
}
