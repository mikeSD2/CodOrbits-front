import { NextResponse } from 'next/server';
import crypto from 'crypto';

// Mailchimp API конфигурация
const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
const MAILCHIMP_AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID; // Замените на свой реальный Audience ID
const MAILCHIMP_API_SERVER = process.env.MAILCHIMP_API_SERVER;

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ 
        error: 'Необходимо указать корректный email' 
      }, { status: 400 });
    }
    
    // Добавляем логирование для отладки
    console.log('Mailchimp config:', {

      server: MAILCHIMP_API_SERVER,
      audience: MAILCHIMP_AUDIENCE_ID,
      hasApiKey: !!MAILCHIMP_API_KEY
    });

    // Создаем MD5 хеш email для идентификации подписчика
    const emailHash = crypto
      .createHash('md5')
      .update(email.toLowerCase())
      .digest('hex');

    const url = `https://${MAILCHIMP_API_SERVER}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members/${emailHash}`;

    // Данные для Mailchimp API
    const data = {
      email_address: email,
      status: 'subscribed', // 'subscribed' или 'pending' для двойного подтверждения
      tags: ['website-subscription'],
    };

    // Отправляем запрос к Mailchimp API
    const response = await fetch(url, {
      method: 'PUT', // PUT для добавления или обновления
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(`apikey:${MAILCHIMP_API_KEY}`).toString('base64')}`
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    // Добавляем логирование ответа
    console.log('Mailchimp API response:', {
      status: response.status,
      data: responseData
    });

    if (!response.ok) {
      // Обработка ошибок от Mailchimp
      let errorMessage = 'Ошибка при подписке';

      if (responseData.title === 'Member Exists') {
        errorMessage = 'Вы уже подписаны на нашу рассылку!';
      } else if (responseData.detail) {
        errorMessage = responseData.detail;
      }

      return NextResponse.json({ 
        error: errorMessage 
      }, { status: response.status });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Спасибо за подписку!' 
    });
    
  } catch (error) {
    console.error('Ошибка при обработке подписки:', error);
    return NextResponse.json({ 
      error: 'Произошла ошибка при обработке запроса' 
    }, { status: 500 });
  }
} 