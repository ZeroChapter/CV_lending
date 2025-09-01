document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const statusElement = document.getElementById('form-status');
    
    
    const API_URL = 'https://your-app-name.vercel.app/api/send-message';

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const senderName = formData.get('sender_name');
        const message = formData.get('message');
        
        showStatus('Отправка...', 'loading');
        
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    senderName: senderName,
                    message: message
                })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                showStatus('✅ Сообщение отправлено! Скоро отвечу.', 'success');
                form.reset();
                
               
                setTimeout(() => {
                    statusElement.textContent = '';
                    statusElement.className = 'form-status';
                }, 5000);
                
            } else {
                throw new Error(data.error || 'Ошибка отправки');
            }
            
        } catch (error) {
            console.error('Ошибка:', error);
            showStatus('❌ Ошибка отправки. Напишите напрямую на почту.', 'error');
            
        
            setTimeout(() => {
                const mailtoLink = `mailto:79267646963vk@gmail.com?subject=Сообщение с сайта&body=Имя: ${encodeURIComponent(senderName)}%0AСообщение: ${encodeURIComponent(message)}`;
                window.location.href = mailtoLink;
            }, 2000);
        }
    });
    
    function showStatus(message, type = '') {
        statusElement.textContent = message;
        statusElement.className = `form-status ${type}`;
    }
});