import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">
                404 - Страница не найдена
            </h1>
            <p className="text-lg mb-8">Запрашиваемый урок не существует</p>
            <Link
                href="/course"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
            >
                Вернуться ко всем урокам
            </Link>
        </div>
    );
}
