"use client";

import { useEffect, useState } from "react";

// Расширяем стандартный тип Navigator, чтобы включить устаревшее свойство userLanguage
interface NavigatorWithLegacyLanguage extends Navigator {
    userLanguage?: string;
}

export default function GoogleTranslate() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const legacyNavigator =
            navigator as unknown as NavigatorWithLegacyLanguage;
        const userLang = (
            legacyNavigator.language || legacyNavigator.userLanguage
        ).toLowerCase();
        const langCode = userLang.split("-")[0];

        if (userLang && !userLang.startsWith("ru")) {
            setShow(true);
            const includedLanguages = ["en", "fr", "de", "es"];
            if (includedLanguages.includes(langCode)) {
                document.cookie = `googtrans=/ru/${langCode}; path=/`;
            }
        } else {
            document.cookie =
                "googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        }
    }, []);

    useEffect(() => {
        if (!show) return;

        const scriptId = "google-translate-script";

        if (document.getElementById(scriptId)) {
            if (
                window.google &&
                window.google.translate &&
                !document
                    .getElementById("google_translate_element")
                    ?.hasChildNodes()
            ) {
                window.googleTranslateElementInit();
            }
            return;
        }

        const addScript = () => {
            const script = document.createElement("script");
            script.id = scriptId;
            script.src =
                "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
            script.async = true;
            document.body.appendChild(script);
        };

        window.googleTranslateElementInit = () => {
            const el = document.getElementById("google_translate_element");
            if (el && !el.hasChildNodes()) {
                new window.google.translate.TranslateElement(
                    {
                        pageLanguage: "ru",
                        includedLanguages: "en,ru,fr,de,es",
                        layout: window.google.translate.TranslateElement
                            .InlineLayout.SIMPLE,
                        autoDisplay: false,
                    },
                    "google_translate_element"
                );
            }
        };

        addScript();
    }, [show]);

    if (!show) {
        return null;
    }

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
