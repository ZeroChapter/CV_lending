export default async function handler(req, res) {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
       
        const BOT_TOKEN = process.env.BOT_TOKEN;
        const CHAT_ID = process.env.CHAT_ID;

        if (!BOT_TOKEN || !CHAT_ID) {
            return res.status(500).json({ error: 'Server configuration error' });
        }

        const telegramResponse = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: 'Новый просмотр резюме!\nВремя: ' + new Date().toLocaleString('ru-RU'),
                parse_mode: 'HTML'
            })
        });
        
        const data = await telegramResponse.json();
        
        if (data.ok) {
            return res.status(200).json({ 
                status: 'success', 
                message: 'Message sent successfully' 
            });
        } else {
            return res.status(500).json({ 
                error: 'Failed to send message to Telegram'
            });
        }
    } catch (error) {
        return res.status(500).json({ 
            error: 'Internal server error'
        });
    }
}