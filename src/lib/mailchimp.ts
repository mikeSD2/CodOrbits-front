/**
 * Функция для подписки email на рассылку через Mailchimp
 * @param email - Email для подписки
 * @returns Promise с результатом подписки
 */
export async function subscribeToMailchimp(email: string): Promise<{ 
  success: boolean;
  message: string;
}> {
  try {
    console.log('Отправка запроса на подписку:', email);
    
    const response = await fetch('/api/mailchimp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    
    console.log('Ответ от API:', {
      status: response.status,
      data: data
    });

    if (!response.ok) {
      throw new Error(data.error || 'Ошибка при подписке');
    }

    return {
      success: true,
      message: data.message || 'Спасибо за подписку!',
    };
  } catch (error) {
    console.error('Ошибка при подписке на рассылку:', error);
    return {
      success: false,
      message: error instanceof Error 
        ? error.message 
        : 'Произошла ошибка при подписке',
    };
  }
} 