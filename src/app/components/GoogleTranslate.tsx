"use client";

import { useEffect } from "react";

export default function GoogleTranslate() {
    useEffect(() => {
        const addScript = () => {
            const script = document.createElement("script");
            script.src =
                "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
            script.async = true;
            document.body.appendChild(script);
        };

        window.googleTranslateElementInit = () => {
            new window.google.translate.TranslateElement(
                {
                    pageLanguage: "ru", // исходный язык страницы
                    includedLanguages: "en,ru,uk", // языки, которые вы хотите поддерживать
                    layout: window.google.translate.TranslateElement
                        .InlineLayout.SIMPLE,
                    autoDisplay: false,
                },
                "google_translate_element"
            );

            autoTranslateToBrowserLang();
        };

        function autoTranslateToBrowserLang() {
            const browserLang = navigator.language; // e.g. "en-US"
            const shortLang = browserLang.split("-")[0]; // "en"

            // Поддерживаемые языки Google Translate (вы можете ограничить список выше)
            const supportedLanguages = ["en", "uk", "ru"];

            // Если язык браузера поддерживается, активируем перевод
            if (supportedLanguages.includes(shortLang) && shortLang !== "ru") {
                const interval = setInterval(() => {
                    const select =
                        document.querySelector<HTMLSelectElement>(
                            ".goog-te-combo"
                        );
                    if (select) {
                        select.value = shortLang;
                        select.dispatchEvent(new Event("change"));
                        clearInterval(interval);
                    }
                }, 500); // ждём, пока виджет прогрузится
            }
        }

        addScript();
    }, []);

    return (
        <div
            id="google_translate_element"
            style={{
                position: "fixed",
                top: 10,
                right: 10,
                zIndex: 9999,
            }}
        />
    );
}
