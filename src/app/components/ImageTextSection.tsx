"use client";

import Image from "next/image";

interface ImageTextSectionProps {
    imageSrc: string;
    title: string;
    description: string;
    reverse?: boolean;
}

export default function ImageTextSection({
    imageSrc,
    title,
    description,
}: ImageTextSectionProps) {
    return (
        <section className="">
            <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                {/* Image container */}
                <div
                    className={`flex-1 hidden lg:block md:basis-1/3 aspect-[4/3] md:aspect-auto relative z-[-1]`}
                >
                    <Image
                        src="/images/blue_back_Ellipse.png"
                        alt="Right Image 2"
                        width={606}
                        height={606}
                        className="absolute left-1/2 -translate-x-1/2 -bottom-[36%] z-[-1] w-[70%] h-auto"
                    />
                    <Image
                        src={imageSrc}
                        alt={title}
                        width={400}
                        height={400}
                        className="w-full h-[calc(100%+20px)] object-fit rounded-lg -mt-[20px]"
                    />
                </div>

                {/* Content container */}
                <div className={`flex-1 md:basis-2/3 pb-8`}>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 ">
                        {title}
                    </h2>
                    <p className="text-black font-thin whitespace-pre-wrap">
                        {description}
                    </p>
                </div>
            </div>
        </section>
    );
}
