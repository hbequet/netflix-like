import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { readFile } from 'fs/promises';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

const getRandomMovies = (arr, n) => {
    return [...arr].sort(() => 0.5 - Math.random()).slice(0, n);
};

async function retrieveMovies() {
    try {
        const rawData = await readFile('./../data/movies.json', 'utf-8');
        const movies = JSON.parse(rawData);

        return { success: true, data: movies };
    } catch (error) {
        console.error("Erreur de lecture :", error);
        return { success: false, data: [] };
    }
}

// Middlewares
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route de test
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'API Netflix is running',
        timestamp: new Date().toISOString()
    });
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`������� Server running on http://localhost:${PORT}`);
    console.log(`��������� Environment: ${process.env.NODE_ENV}`);
});

app.get('/api/movies', async (req, res) => {
    const result = await retrieveMovies();

    if (result.success) {
        res.json(result.data);
    } else {
        res.status(500).json({ message: "Impossible de lire les films" });
    }
});

app.get('/api/movies/random/:limit', async (req, res) => {
    const limit = req.params.limit;
    const movies = await retrieveMovies()

    res.json({
        success: movies.success,
        message: `Voici ${limit} films aléatoires`,
        limitRequested: limit,
        data: getRandomMovies(movies.data, limit)
    });
});

app.get('/api/movies/genre/:genre/:limit', async (req, res) => {
    const limit = parseInt(req.params.limit);
    const genre = req.params.genre;

    const movies = await retrieveMovies();

    if (!movies.success) {
        return res.status(500).json({ success: false, message: "Erreur de récupération" });
    }

    const genreMovies = movies.data.filter(movie =>
        movie.genre.toLowerCase() === genre.toLowerCase()
    );

    res.json({
        success: true,
        message: `Voici les ${limit} films du genre ${genre}`,
        limitRequested: limit,
        data: genreMovies.slice(0, limit)
    });
});

app.get('/api/movies/after/:year/:limit', async (req, res) => {
    const year = parseInt(req.params.year);
    const limit = parseInt(req.params.limit);

    const movies = await retrieveMovies();

    if (!movies.success) {
        return res.status(500).json({ success: false, message: "Erreur de récupération" });
    }

    const afterMovies = movies.data.filter(movie =>
        movie.year >= year
    );

    res.json({
        success: true,
        message: `Voici les ${limit} films après ${year}`,
        limitRequested: limit,
        data: afterMovies.slice(0, limit)
    });
});
