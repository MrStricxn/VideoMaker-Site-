const express = require('express');
const path = require('path');
const app = express();

// Используем порт из переменных среды или 3000
const PORT = process.env.PORT || 3000;

// Настройка статических файлов и JSON
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// --- База Данных (Имитация) ---
const videosDB = [
    {
        id: 1,
        title: "Cyberpunk City: Night Walk 4K",
        author: "Neon Studio",
        views: "2.4M",
        time: "3 часа назад",
        duration: "12:45",
        quality: "4K",
        thumbnail: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=600&q=80",
        avatar: "https://i.pravatar.cc/150?img=11"
    },
    {
        id: 2,
        title: "Top 10 Gaming Moments",
        author: "Alex Media",
        views: "856K",
        time: "1 день назад",
        duration: "08:30",
        quality: "HD",
        thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&q=80",
        avatar: "https://i.pravatar.cc/150?img=32"
    },
    {
        id: 3,
        title: "Streaming Setup Review 2025",
        author: "Tech Review",
        views: "140K",
        time: "5 часов назад",
        duration: "24:15",
        quality: "HDR",
        thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&q=80",
        avatar: "https://i.pravatar.cc/150?img=60"
    },
    {
        id: 4,
        title: "Amazon Rainforest VR Experience",
        author: "Nature VR",
        views: "3.1M",
        time: "2 недели назад",
        duration: "45:00",
        quality: "4K",
        thumbnail: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=600&q=80",
        avatar: "https://i.pravatar.cc/150?img=1"
    },
    {
        id: 5,
        title: "Competitive Shooter Gameplay",
        author: "GameMaster",
        views: "500K",
        time: "Вчера",
        duration: "15:20",
        quality: "1080p",
        thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&q=80",
        avatar: "https://i.pravatar.cc/150?img=5"
    }
];

// --- API Маршруты ---

// 1. Получить видео (с поддержкой поиска)
app.get('/api/videos', (req, res) => {
    const searchQuery = req.query.q ? req.query.q.toLowerCase() : '';
    
    if (searchQuery) {
        const filtered = videosDB.filter(video => 
            video.title.toLowerCase().includes(searchQuery) || 
            video.author.toLowerCase().includes(searchQuery)
        );
        res.json(filtered);
    } else {
        res.json(videosDB);
    }
});

// 2. Логин (Имитация)
app.post('/api/login', (req, res) => {
    res.json({ 
        success: true, 
        user: "Admin", 
        avatar: "https://i.pravatar.cc/150?img=12" 
    });
});

// --- ИСПРАВЛЕНИЕ ОШИБКИ PathError ---
// Вместо app.get('*', ...) используем регулярное выражение /.*/
// Это перехватывает все остальные запросы и отдает index.html
app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});