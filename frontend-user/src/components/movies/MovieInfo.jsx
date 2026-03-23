import Button from '../common/Button';
import {Link, useNavigate} from 'react-router-dom';
import Footer from "../layout/Footer.jsx";
import {useCart} from "../../context/CartContext.jsx";

function MovieInfo({ movie, setNotification }) {
    let navigate = useNavigate();
    let { addToCart, isInCart, isRented, getRentalByMovieId, rentMovie } = useCart();

    console.log(isRented(movie.id))

    const handleRent = () => {
        if (localStorage.getItem('user') === null) {
            navigate('/login');
            return;
        }

        const alreadyRented = isRented(movie.id);
        if (alreadyRented) {
            setNotification({type: 'error', message: 'Vous avez déjà loué ce film'});
            return;
        }

        rentMovie(movie)
        setNotification({ type: 'success', message: 'Film loué avec succès !' });
    }

    const handleCart = () => {
        addToCart(movie);
    }

    return (
        <div className="bg-[#0a0a0b] text-white min-h-screen">
            <div className="relative h-[60vh] w-full">
                <div className="absolute inset-0">
                    <img
                        src={movie.backdrop}
                        alt={movie.title}
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] to-transparent" />
                </div>

                <div className="relative container mx-auto px-6 h-full flex flex-col justify-end pb-10">
                    <Link to="/" className="text-gray-400 mb-4 flex items-center hover:text-white">
                        <span className="mr-2">‹</span> Retour
                    </Link>
                    <h1 className="text-6xl font-bold mb-4">{movie.title}</h1>
                    <div className="flex items-center gap-4 text-sm font-semibold">
                        <span className="bg-red-600 px-2 py-0.5 rounded">{movie.rating}/10</span>
                        <span>{movie.year}</span>
                        <span>{movie.duration} min</span>
                        <span className="border border-gray-600 px-2 py-0.5 rounded uppercase text-xs">
                            {movie.genre}
                        </span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

                    {/* Left column : Resume */}
                    <div className="md:col-span-2 space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Synopsis</h2>
                            <p className="text-gray-300 leading-relaxed text-lg">
                                {movie.description}
                            </p>
                        </div>

                        <div className="flex gap-4 mb-8">
                            {isRented(movie.id) ? (
                                <div className="flex items-center gap-2 bg-green-900/30 border border-green-500 text-green-500 px-6 py-3 rounded-lg font-medium">
                                    <svg width="20" height="20" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                                        <polyline
                                            points="10,25 22,37 40,15"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="6"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    <span>Film loué jusqu'au {new Date(getRentalByMovieId(movie.id).expiryDate).toLocaleDateString('fr-FR')}</span>
                                </div>
                            ) : (
                                <>
                                    <Button size="lg" onClick={handleRent}>
                                        🎬 Louer pour {movie.price}€
                                    </Button>

                                    <Button size="lg" onClick={handleCart} variant="secondary">
                                        {isInCart(movie.id) ? "✅ Dans le panier" : "+ Ajouter au panier"}
                                    </Button>
                                </>
                            )}
                        </div>

                        {/* Technical info */}
                        <div className="bg-[#16161a] rounded-lg p-6 border border-gray-800">
                            <h3 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2">Informations</h3>
                            <div className="space-y-4">
                                <div className="flex border-b border-gray-800 pb-2">
                                    <span className="w-32 text-gray-500">Genre:</span>
                                    <span>{movie.genre}</span>
                                </div>
                                <div className="flex border-b border-gray-800 pb-2">
                                    <span className="w-32 text-gray-500">Année:</span>
                                    <span>{movie.year}</span>
                                </div>
                                <div className="flex border-b border-gray-800 pb-2">
                                    <span className="w-32 text-gray-500">Durée:</span>
                                    <span>{movie.duration} minutes</span>
                                </div>
                                <div className="flex">
                                    <span className="w-32 text-gray-500">Note:</span>
                                    <span className="text-yellow-500 font-bold">{movie.rating}/10</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right column : Poster */}
                    <div className="hidden md:block">
                        <img
                            src={movie.poster}
                            alt={`Affiche de ${movie.title}`}
                            className="rounded-lg shadow-2xl w-full sticky top-8"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieInfo;