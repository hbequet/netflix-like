import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: true
    },
    note: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// INDEX composé pour éviter les doublons et optimiser les requêtes
reviewSchema.index({ user: 1, movie: 1 });

// MÉTHODE pour obtenir la moyenne des notes d'un film
reviewSchema.statics.calculateAverage = async function(movieId) {
    const stats = await this.aggregate([
        { $match: { movie: movieId } },
        {
            $group: {
                _id: '$movie',
                avgRating: { $avg: '$note' },
                nRating: { $sum: 1 }
            }
        }
    ]);

    if (stats.length > 0) {
        return stats[0].avgRating;
    } else {
        return 0;
    }
};

const Review = mongoose.model('Review', reviewSchema);

export default Review;
