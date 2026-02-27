import {useNavigate, useParams} from 'react-router-dom';
import {useEffect, useState} from "react";
import moviesData from '../../../data/movies.json';
import Navbar from "../components/common/Navbar.jsx";
import Button from "../components/common/Button.jsx";
import MovieInfo from "../components/movies/MovieInfo.jsx";
import Footer from "../components/layout/Footer.jsx";

function MovieDetail() {
    const { id } = useParams();
    let navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [foundMovie, setFoundMovie] = useState(null);

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
            <div className="loading-screen" style={{ backgroundColor: '#000', color: '#fff', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div className="spinner" />
                <p style={{ marginTop: '20px', fontSize: '1.2rem' }}>Chargement...</p>
            </div>
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

            <MovieInfo movie={foundMovie} />

            <Footer />
        </div>
    );
}
export default MovieDetail;
