import {useNavigate, useParams} from 'react-router-dom';
import {useEffect, useState} from "react";
import Navbar from "../components/common/Navbar.jsx";
import Button from "../components/common/Button.jsx";
import MovieInfo from "../components/movies/MovieInfo.jsx";
import Footer from "../components/layout/Footer.jsx";
import Breadcrumb from "../components/common/Breadcrumb.jsx";
import LoadingSpinner from "../components/common/LoadingSpinner.jsx";
import { moviesAPI } from "../services/api.js";

function MovieDetail() {
    const { id } = useParams();
    let navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [foundMovie, setFoundMovie] = useState(null);
    const [notification, setNotification] = useState(null);
    console.log("MovieDetail rendered with _id:", id);

    const toHome = (e) => {
        navigate('/');
    }

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                setLoading(true);
                console.log("Fetching movie with ID:", id);
                const response = await moviesAPI.getById(id);
                console.log("API response for movie:", response);
                const movie = response.data || response;
                setFoundMovie(movie);
            } catch (error) {
                console.error("Erreur lors de la récupération du film :", error);
                setFoundMovie(null);
            } finally {
                setLoading(false);
            }
        };
        console.log("useEffect triggered with _id:", id);
        if (id) {
            console.log("Starting to fetch movie with ID:", id);
            fetchMovie();
        }
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
            <Navbar movies={[]} />

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
