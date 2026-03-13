import Movie from '../models/Movie.js'

// @desc Obtenir tous les films
// @route GET /api/movies
// @access Public
export const getAllMovies = async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = req.query.limit;
    const sortOption = req.query.sort;

    const search = req.query.search;

    const skip = (page - 1) * limit;

    if (search) {
        const filter = {$or: [{title: {$regex: search, $options: 'i'}}, {description: {$regex: search, $options: 'i'}}]}
        const movies = await Movie.find(filter)

        const total = await Movie.countDocuments(filter)

        return res.status(200).json({
            "success": true,
            "count": movies.length,
            "total": total,
            "movies": movies
        })
    }

    // Exécution de la requête
    const movies = await Movie.find(req.query)
        .sort(sortOption)
        .skip(skip)
        .limit(parseInt(limit));
    // Comptage total pour la pagination
    const total = await Movie.countDocuments(req.query)

    return res.status(200).json({
        "success": true,
        "count": movies.length,
        "total": total,
        "movies": movies
    })
};

// @desc Obtenir un film par ID
// @route GET /api/movies/:id
// @access Public
export const getMovieById = async (req, res, next) => {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
        return res.status(404).json({
            "success": false,
            "message": "Movie not found"
        })
    }

    return res.status(200).json({
        "success": true,
        "data": movie
    })
};

// @desc Obtenir un film similaire
// @route GET /api/movies/:id
// @access Public
export const getSimilarMovies = async (req, res, next) => {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
        return res.status(404).json({
            "success": false,
            "message": "Movie not found"
        })
    }

    const similarMovies = await Movie.find({
        genre: { $in: movie.genre },
        _id: { $ne: movie._id },
        isAvailable: true
    })
        .sort({ rating: -1 })
        .limit(6);

    return res.status(200).json({
        "success": true,
        "count": similarMovies.length,
        "data": similarMovies
    })
}

// @desc Créer un nouveau film
// @route POST /api/movies
// @access Private/Admin
export const createMovie = async (req, res, next) => {
    const { title, description, poster, backdrop, genre, year, duration, price, rating } = req.body;

    const movie = await Movie.create({
        title,
        description,
        poster,
        backdrop,
        genre,
        year,
        duration,
        price,
        rating
    });

    return res.status(201).json({
        "success": true,
        "data": movie
    })
}

// @desc Modifier un film
// @route PUT /api/movies/:id
// @access Private/Admin
export const updateMovie = async (req, res, next) => {
    const updatedMovie = await Movie.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true
        }
    );

    return res.status(200).json({
        "success": true,
        "data": updatedMovie
    })
}

// @desc Supprimer un film
// @route DELETE /api/movies/:id
// @access Private/Admin
export const deleteMovie = async (req, res, next) => {

}

// @desc Obtenir les statistiques des films
// @route GET /api/movies/stats
// @access Private/Admin
export const getMovieStats = async (req, res, next) => {

}
