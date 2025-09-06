const API_URL = 'https://cv-lending.vercel.app/api/new-user';

if (!localStorage.getItem("open")) {
    localStorage.setItem("open", "true");
    
    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: "open"
        })
    })
    .then(response => {
        if (!response.ok) {
            console.log('Запрос отправлен');
        }
    })
    .catch(error => {
        console.error('Ошибка при отправке запроса:', error);
    });
}