"use client";

import { useEffect, useState } from "react";

// Расширяем стандартный тип Navigator, чтобы включить устаревшее свойство userLanguage
interface NavigatorWithLegacyLanguage extends Navigator {
    userLanguage?: string;
}

const GoogleTranslateIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
    >
        <path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z" />
    </svg>
);

export default function GoogleTranslate() {
    const [showButton, setShowButton] = useState(false);
    const [isTranslated, setIsTranslated] = useState<boolean | null>(null);
    const [userLangCode, setUserLangCode] = useState<string | null>(null);

    // Effect 1: Determine translation INTENT based on settings and user language
    useEffect(() => {
        const translationPreference = localStorage.getItem(
            "translation-preference"
        );

        const legacyNavigator =
            navigator as unknown as NavigatorWithLegacyLanguage;
        const userLang = (
            legacyNavigator.language ||
            legacyNavigator.userLanguage ||
            ""
        ).toLowerCase();
        const langCode = userLang.split("-")[0];

        const excludedLangs = [
            "ru",
            "uk",
            "be",
            "uz",
            "kk",
            "ka",
            "az",
            "lt",
            "ro",
            "lv",
            "ky",
            "tg",
            "hy",
            "tk",
            "et",
        ];

        if (!userLang || excludedLangs.includes(langCode)) {
            setShowButton(false);
            setIsTranslated(false);
            return;
        }

        setShowButton(true);

        const includedLanguages = ["en", "fr", "de", "es"];
        const targetLang = includedLanguages.includes(langCode)
            ? langCode
            : "en";
        setUserLangCode(targetLang);

        if (translationPreference === "disabled") {
            setIsTranslated(false);
        } else {
            setIsTranslated(true);
            if (!translationPreference) {
                localStorage.setItem("translation-preference", "enabled");
            }
        }
    }, []);

    // Effect 2: Execute translation ACTION if intent is true
    useEffect(() => {
        if (isTranslated !== true || !userLangCode) {
            // If translation is not intended, ensure the cookie is cleared.
            document.cookie =
                "googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
            return;
        }

        // Set the cookie to trigger translation by the script
        document.cookie = `googtrans=/ru/${userLangCode}; path=/`;

        const scriptId = "google-translate-script";
        if (document.getElementById(scriptId)) {
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
    }, [isTranslated, userLangCode]);

    const handleToggleTranslate = () => {
        const nextIsTranslated = !isTranslated;
        localStorage.setItem(
            "translation-preference",
            nextIsTranslated ? "enabled" : "disabled"
        );
        window.location.reload();
    };

    if (!showButton || isTranslated === null) {
        return null;
    }

    return (
        <>
            <div
                id="google_translate_element"
                style={{ display: "none" }}
            ></div>
            <button
                onClick={handleToggleTranslate}
                style={{
                    position: "fixed",
                    bottom: "20px",
                    right: "20px",
                    zIndex: 9999,
                    background: "white",
                    border: "1px solid #ccc",
                    borderRadius: "50%",
                    width: "48px",
                    height: "48px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
                }}
                title={isTranslated ? "Показать оригинал" : "Перевести"}
            >
                <GoogleTranslateIcon />
            </button>
        </>
    );
}
