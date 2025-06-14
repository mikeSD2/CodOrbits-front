import CardGridSection from "./components/CardGridSection";
import ContactForm from "./components/ContactForm";
import FAQSection from "./components/FAQSection";
import FeaturesSection from "./components/FeaturesSection";
import HeroSection from "./components/HeroSection";
import ImageTextSection from "./components/ImageTextSection";
import JavaRoadmapSection from "./components/JavaRoadmapSection";
import ReviewsSection from "./components/ReviewsSection";
import SliderSection from "./components/SliderSection";
import StagesSection from "./components/StagesSection";
import SubscriptionBanner from "./components/SubscriptionBanner";
import { getPageBySlug } from "@/lib/api/wordpress";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    try {
        // Fetch home page data from WordPress
        const homePageData = await getPageBySlug("home");

        if (homePageData?.yoastSEO) {
            const { yoastSEO } = homePageData;

            return {
                title:
                    yoastSEO.title ||
                    "С чего начать программирование на Java — бесплатный курс от CodOrbits!",
                description:
                    yoastSEO.description ||
                    "Бесплатный курс по Java от CodOrbits для тех, кто хочет начать программировать или углубить знания. Разбираем все от основ до фреймворков на практических примарах.",
                openGraph: {
                    title: yoastSEO.og_title || yoastSEO.title,
                    description:
                        yoastSEO.og_description || yoastSEO.description,
                    url: yoastSEO.og_url,
                    siteName: yoastSEO.og_site_name,
                    images:
                        yoastSEO.og_image?.map((img) => ({
                            url: img.url,
                            width: img.width,
                            height: img.height,
                        })) || [],
                    locale: yoastSEO.og_locale,
                    type:
                        (yoastSEO.og_type as
                            | "website"
                            | "article"
                            | "book"
                            | "profile") || "website",
                },
                twitter: {
                    card: yoastSEO.twitter_card as
                        | "summary"
                        | "summary_large_image"
                        | "app"
                        | "player",
                    title: yoastSEO.twitter_title || yoastSEO.title,
                    description:
                        yoastSEO.twitter_description || yoastSEO.description,
                    site: yoastSEO.twitter_site,
                    images: yoastSEO.twitter_image
                        ? [yoastSEO.twitter_image]
                        : undefined,
                },
                alternates: {
                    canonical: yoastSEO.canonical,
                },
                robots: {
                    index: yoastSEO.robots.index !== "noindex",
                    follow: yoastSEO.robots.follow !== "nofollow",
                    nocache: false,
                    googleBot: {
                        index: yoastSEO.robots.index !== "noindex",
                        follow: yoastSEO.robots.follow !== "nofollow",
                        noimageindex: false,
                        "max-video-preview": -1,
                        "max-image-preview": "large",
                        "max-snippet": -1,
                    },
                },
            };
        }

        // Default metadata if Yoast data isn't available
        return {
            title: "My Coding Website",
            description: "Learn coding with our tutorials",
        };
    } catch (error) {
        console.error("Error fetching home page metadata:", error);
        return {
            title: "My Coding Website",
            description: "Learn coding with our tutorials",
        };
    }
}

export default function Home() {
    return (
        <>
            <HeroSection />
            <FeaturesSection />
            <SliderSection />
            <JavaRoadmapSection />
            <StagesSection />
            <CardGridSection />
            <ReviewsSection />
            <SubscriptionBanner />
            <ImageTextSection
                imageSrc="/images/big_rocket_image.png"
                title="Почему разработчики выбирают язык программирования Java?"
                description={`Язык программирования Java — неизменно один из самых популярных для backend-разработки. Его используют как технологические гиганты (например, Ozon, Яндекс, Netflix), так и банки, страховые компании, крупные интернет-магазины и разработчики мобильных приложений под Android. Это проверенный выбор для создания сложных, высоконагруженных и масштабируемых систем.

Java разработчик — это востребованный it специалист, спрос на которых на рынке труда стабильно высок. Это открывает отличные карьерные перспективы и возможности для профессионального роста. Начните изучение программирования на нашем курсе и сделайте уверенный первый шаг к успешной и хорошо оплачиваемой карьере в IT.`}
            />
            <FAQSection
                items={[
                    {
                        question:
                            "Какие предварительные знания нужны, чтобы начать ваш курс программирования на Java?",
                        answer: `Наш бесплатный курс программирования Java разработан специально для начинающих — глубокие предварительные знания не требуются.

Если вы ищете, с чего начать программирование на java, — этот курс станет отличным первым шагом. Он идеально подойдёт тем, кто уверенно пользуется компьютером и имеет базовое представление о его работе.

Знание школьной математики и логическое мышление будут полезны, но не обязательны. Мы начинаем с самых основ: подробно разбираем Java Core и объясняем фундаментальные концепции, включая принципы ООП, простым и понятным языком.

Каждый урок сопровождается практическими примерами и скриншотами, чтобы вы могли легко следовать за материалом, даже если раньше не сталкивались с Java.

Главное – мотивация и готовность погрузиться в изучение программирования.`,
                    },
                    {
                        question:
                            "Можно ли изучать Java без знания других языков программирования, используя ваш курс?",
                        answer: `Абсолютно! Наш бесплатный курс по программированию на Java — это лучший курс по Java для новичков! Он идеально подходит для тех, кто начинает свой путь в Java с нуля и не имеет опыта с другими языками.

Мы начинаем с основ — Java Core и базовых принципов ООП, объясняя всё простым, понятным языком и без лишней теории. Программа курса выстроена так, чтобы вы могли уверенно начать обучение программированию с нуля и постепенно перейти к более продвинутым темам, таким как Spring Framework, Hibernate и веб технологии.

Если вы не знаете, с чего начать программирование на Java, наш курс предлагает чёткий и практичный ответ: пошаговое, структурированное обучение Java с упором на реальные задачи.

Каждый урок содержит практические примеры и подробные разборы, поэтому изучение программирования будет эффективным даже без предварительной подготовки. Так что, если вы ищете бесплатные курсы программирования с нуля, наш бесплатный курс Java это отличная возможность для того чтобы начать обучение в IT сфере.`,
                    },
                    {
                        question:
                            "Почему стоит выбрать бесплатный курс по Java от CodOrbits для изучения программирования?",
                        answer: `Курс от CodOrbits — это комплексный подход, охватывающий всё, что нужно, чтобы стать уверенным java разработчиком. Мы не ограничиваемся базовыми темами: курс включает веб технологии, фреймворки, devops, а также глубокое погружение в java программирование на практике. 
                        
Благодаря примерам и разбору ошибок курс подходит как для новичков, так и для тех, кто уже начал обучение в сфере it и ищет бесплатные курсы по программированию, чтобы систематизировать и расширить знания.

Если вы ищете лучшие IT курсы по Java, которые готовят к реальным задачам, — CodOrbits это идеальный выбор. Это лучший курс по программированию для тех, кто хочет освоить Java на профессиональном уровне.`,
                    },
                    {
                        question:
                            "Что я смогу делать и на что рассчитывать после того как я пройду ваш бесплатный Java курс?",
                        answer: `После прохождения нашего курса вы будете готовы к работе как java разработчик. Мы обеспечиваем комплексное обучение на it специалиста, покрывая не только Java, но и ключевые фреймворки (включая углубленное изучение Spring), основы фронтенда, и даже DevOps, чтобы вы досконально изучили данную it специальность.
                    
Вы глубоко поймете, что веб разработчик это специалист, владеющий разнообразными веб технологиями и готовый к сложным задачам. В отличие от бесплатных онлайн-курсов Java, которые зачастую дают только основы Java, наш курс — это Java для продвинутых: он подходит не только новичкам, но и тем, кто хочет выйти на профессиональный уровень.

Наш курс программирования с нуля (а также для тех, кто уже имеет базовые знания и хочет их углубить, не зная, что учить дальше) готовит вас к реальным задачам и собеседованиям, обучая самому современному стеку технологий, которые будут востребованы еще очень долго.

Наш курс — это не типичный курс программирования для начинающих, который дает лишь основы. это ваш путь к карьере, подкрепленный глубоким пониманием, как технологии работают изнутри, и готовностью к любым вопросам на собеседовании. 

По окончании у вас будет отличное резюме, охватывающее все необходимое для поиска работы.`,
                    },
                ]}
            />
            <ContactForm />
        </>
    );
}
