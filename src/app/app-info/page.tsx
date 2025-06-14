import Image from "next/image";
import Link from "next/link";

export const metadata = {
    title: "Приложение CodOrbits | Информация о мобильном приложении",
    description:
        "Информация о приложении CodOrbits, которое было удалено из Google Play в 2025 году. Скачайте оригинальный .apk файл.",
};

export default function AppInfoPage() {
    return (
        <main className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="mb-8 text-center">
                <h1 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
                    📱 Приложение в Google Play
                </h1>
                <Image
                    src="/images/Изучи от А до Я веб-разработку с использованием Java (2) (1).png"
                    alt="Превью приложения CodOrbits"
                    width={1000}
                    height={1000}
                    className="mx-auto my-8 rounded-xl shadow-lg"
                />
            </div>

            <div className="space-y-6 text-lg">
                <p>
                    Изначально наш курс существовал как мобильное приложение под
                    другим названием и был доступен в Google Play. За время
                    работы он собрал множество высоких оценок и положительных
                    отзывов от пользователей.
                </p>

                <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-md">
                    <p className="font-medium">
                        ❌ К сожалению, в 2025 году приложение было удалено
                        Google по неуточнённым внутренним причинам. Мы не
                        получили разъяснений и не смогли восстановить аккаунт.
                    </p>
                </div>

                <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded-md">
                    <p className="font-medium">
                        ✅ Мы продолжаем развивать курс в веб-формате. Ниже вы
                        можете скачать оригинальный .apk файл и убедиться, что
                        приложение действительно существовало.
                    </p>
                </div>

                <div className="flex justify-center my-8">
                    <Link
                        href="https://drive.google.com/file/d/1ytd9eYRq5GqWqIdf_pMMy_xJBfn6lafj/view?usp=sharing"
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-medium rounded-full hover:opacity-90 transition-opacity"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                        🔗 Скачать .apk
                    </Link>
                </div>

                <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-md">
                    <p className="font-medium">
                        💡 Важно: информация на сайте постоянно обновляется и
                        дополняется — она актуальнее и расширеннее, чем была в
                        приложении.
                    </p>
                </div>

                <div className="mb-8 text-center">
                    <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded-md">
                        <p className="font-medium">
                            ⭐ Ниже — часть реальных отзывов, сохранённых через
                            интеграцию с AppFollow.
                        </p>
                    </div>
                    <Image
                        src="/images/2025-06-0919-44-42online-video-cutter.com-ezgif.com-optimize.gif"
                        alt="Превью приложения CodOrbits"
                        width={1000}
                        height={1000}
                        className="mx-auto my-8 rounded-xl shadow-lg"
                    />
                </div>
                <div className="mt-12 text-center">
                    <Link
                        href="/"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800"
                    >
                        ← Вернуться на главную
                    </Link>
                </div>
            </div>
        </main>
    );
}
