import {useNavigate, useParams} from 'react-router-dom';
import {useEffect, useState} from "react";
import moviesData from '../../../data/movies.json';
import Navbar from "../components/common/Navbar.jsx";
import Button from "../components/common/Button.jsx";
import MovieInfo from "../components/movies/MovieInfo.jsx";
import Footer from "../components/layout/Footer.jsx";
import Breadcrumb from "../components/common/Breadcrumb.jsx";
import LoadingSpinner from "../components/common/LoadingSpinner.jsx";

function MovieDetail() {
    const { id } = useParams();
    let navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [foundMovie, setFoundMovie] = useState(null);
    const [notification, setNotification] = useState(null);

    const toHome = (e) => {
        navigate('/');
    }

    useEffect(() => {
        const movie = moviesData.find(movie => movie.id === parseInt(id));
        if (movie) {
            setFoundMovie(movie);
        } else {
            setLoading(null);
        }
        setLoading(false);
    }, [id])

    if (loading) {
        return (
            <LoadingSpinner />
        );
    }

    if (!foundMovie) return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-4 text-white">
                Film introuvable
            </h1>

            <p className="text-lg mb-8 text-gray-400">
                Le film que vous recherchez n'existe pas.
            </p>

            <Button size="sm" onClick={toHome}>
                Retour à l'accueil
            </Button>
        </div>
    )

    return (
        <div>
            <Navbar movies={moviesData} />

            <div className="container mx-auto px-4 pt-24">
                <Breadcrumb items={[ { label: 'Films', path: '/' }, { label: foundMovie.genre, path: `/?genre=${foundMovie.genre}` }, { label: foundMovie.title }]} />
            </div>

            {/* Notification */}
            {notification && (
                <div className={`fixed top-20 right-4 px-6 py-3 rounded-lg shadow-xl z-50 ${
                    notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
                }`}> {notification.message}</div>
            )}

            <MovieInfo movie={foundMovie} setNotification={setNotification} />

            <Footer />
        </div>
    );
}
export default MovieDetail;
