// lib/recaptcha.ts
const siteKey = process.env.RECAPTCHA_SITE_KEY ?? "";

export const loadRecaptcha = () => {
    return new Promise<void>((resolve) => {
        if (typeof window === "undefined") return;

        // Если скрипт уже загружен и готов
        if (window.grecaptcha) {
            try {
                window.grecaptcha.ready(() => {
                    resolve();
                });
            } catch (e) {
                console.error("Error initializing reCAPTCHA:", e);
                resolve(); // Всё равно резолвим промис, чтобы не блокировать UI
            }
        } else {
            // Загружаем скрипт если его нет
            const script = document.createElement("script");
            script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
            script.async = true;
            script.defer = true;

            script.onload = () => {
                // После загрузки скрипта дождемся инициализации reCAPTCHA
                window.grecaptcha.ready(() => {
                    resolve();
                });
            };

            // Обработка ошибок загрузки скрипта
            script.onerror = () => {
                console.error("Error loading reCAPTCHA script");
                resolve(); // Всё равно резолвим промис, чтобы не блокировать UI
            };

            document.body.appendChild(script);
        }
    });
};

export const getRecaptchaToken = async (action = "submit") => {
    await loadRecaptcha();
    try {
        console.log("action: ", action);
        return await window.grecaptcha.execute(siteKey, { action });
    } catch (e) {
        console.error("Error executing reCAPTCHA:", e);
        return ""; // Возвращаем пустую строку в случае ошибки
    }
};

// Добавляем тип для глобального объекта window
declare global {
    interface Window {
        grecaptcha: {
            ready: (callback: () => void) => void;
            execute: (
                siteKey: string,
                options: { action: string }
            ) => Promise<string>;
        };
    }
}
