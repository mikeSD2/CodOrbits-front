import { NextResponse } from "next/server";
import crypto from "crypto";

// Mailchimp API конфигурация
const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
const MAILCHIMP_AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
const MAILCHIMP_API_SERVER = process.env.MAILCHIMP_API_SERVER;
const RECAPTCHA_SECRET_KEY = "6Lc4S2MrAAAAAChMRqvzBvhtbx2bk6eeCF-tnjoO";

// Функция для проверки reCAPTCHA токена
async function verifyRecaptchaToken(token: string): Promise<boolean> {
    try {
        const response = await fetch(
            "https://www.google.com/recaptcha/api/siteverify",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: `secret=${RECAPTCHA_SECRET_KEY}&response=${token}`,
            }
        );

        const data = await response.json();
        console.log("reCAPTCHA verification response:", data);

        // Проверяем, успешна ли верификация и что score выше 0.5 (для v3)
        return data.success && data.score >= 0.5;
    } catch (error) {
        console.error("Error verifying reCAPTCHA token:", error);
        return false;
    }
}

export async function POST(request: Request) {
    try {
        const { email, recaptchaToken } = await request.json();

        if (!email || !email.includes("@")) {
            return NextResponse.json(
                {
                    error: "Необходимо указать корректный email",
                },
                { status: 400 }
            );
        }

        // Проверяем reCAPTCHA токен
        if (!recaptchaToken) {
            return NextResponse.json(
                {
                    error: "Требуется подтверждение reCAPTCHA",
                },
                { status: 400 }
            );
        }

        // Верификация токена
        const isRecaptchaValid = await verifyRecaptchaToken(recaptchaToken);

        if (!isRecaptchaValid) {
            return NextResponse.json(
                {
                    error: "Проверка reCAPTCHA не пройдена. Попробуйте еще раз.",
                },
                { status: 400 }
            );
        }

        // Добавляем логирование для отладки
        console.log("Mailchimp config:", {
            server: MAILCHIMP_API_SERVER,
            audience: MAILCHIMP_AUDIENCE_ID,
            hasApiKey: !!MAILCHIMP_API_KEY,
        });

        // Создаем MD5 хеш email для идентификации подписчика
        const emailHash = crypto
            .createHash("md5")
            .update(email.toLowerCase())
            .digest("hex");

        const url = `https://${MAILCHIMP_API_SERVER}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members/${emailHash}`;

        // Данные для Mailchimp API
        const data = {
            email_address: email,
            status: "subscribed", // 'subscribed' или 'pending' для двойного подтверждения
            tags: ["website-subscription"],
        };

        // Отправляем запрос к Mailchimp API
        const response = await fetch(url, {
            method: "PUT", // PUT для добавления или обновления
            headers: {
                "Content-Type": "application/json",
                Authorization: `Basic ${Buffer.from(
                    `apikey:${MAILCHIMP_API_KEY}`
                ).toString("base64")}`,
            },
            body: JSON.stringify(data),
        });

        const responseData = await response.json();

        // Добавляем логирование ответа
        console.log("Mailchimp API response:", {
            status: response.status,
            data: responseData,
        });

        if (!response.ok) {
            // Обработка ошибок от Mailchimp
            let errorMessage = "Ошибка при подписке";

            if (responseData.title === "Member Exists") {
                errorMessage = "Вы уже подписаны на нашу рассылку!";
            } else if (responseData.detail) {
                errorMessage = responseData.detail;
            }

            return NextResponse.json(
                {
                    error: errorMessage,
                },
                { status: response.status }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Спасибо за подписку!",
        });
    } catch (error) {
        console.error("Ошибка при обработке подписки:", error);
        return NextResponse.json(
            {
                error: "Произошла ошибка при обработке запроса",
            },
            { status: 500 }
        );
    }
}
