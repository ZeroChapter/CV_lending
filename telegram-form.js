document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const statusElement = document.getElementById('form-status');
    
    
    const BOT_TOKEN = '8265611506:AAH917JSYM_bQCk8Jyqj2-0fJZ3hH5Tfu6k'; 
    const CHAT_ID = '553463033';     
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        
        const formData = new FormData(form);
        const senderName = formData.get('sender_name');
        const message = formData.get('message');
        
       
        const telegramMessage = `📨 Новое сообщение из портфолио:\n\n` +
                               `👤 От: ${senderName}\n` +
                               `📝 Сообщение: ${message}`;
        
    
        showStatus('Отправка...', 'loading');
        
        try {
           
            const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    text: telegramMessage,
                    parse_mode: 'HTML'
                })
            });
            
            const data = await response.json();
            
            if (data.ok) {
                showStatus('✅ Сообщение отправлено! Скоро отвечу.', 'success');
                form.reset(); 
            } else {
                throw new Error(data.description || 'Ошибка отправки');
            }
            
        } catch (error) {
            console.error('Ошибка:', error);
            showStatus('❌ Ошибка отправки. Попробуйте еще раз или напишите напрямую в Telegram.', 'error');
        }
    });
    
    function showStatus(message, type = '') {
        statusElement.textContent = message;
        statusElement.className = `form-status ${type}`;
        
     
        if (type === 'success' || type === 'error') {
            setTimeout(() => {
                statusElement.textContent = '';
                statusElement.className = 'form-status';
            }, 5000);
        }
    }
});