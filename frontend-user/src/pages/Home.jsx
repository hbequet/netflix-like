import MovieHero from "../components/movies/MovieHero.jsx";
import MovieList from "../components/movies/MovieList.jsx";
import {useEffect, useState} from "react";
import MovieFilter from "../components/movies/MovieFilter.jsx";
import Navbar from "../components/common/Navbar.jsx";
import LoadingSpinner from "../components/common/LoadingSpinner.jsx";
import { moviesAPI } from "../services/api.js";

function Home() {
    const [populareMovies, setPopulareMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    const [filteredMovies, setFilteredMovies] = useState([]);

    const [cartItems, setCartItems] = useState([]);

    const [afterMovies, setAfterMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true);
                const response = await moviesAPI.getMovies();
                const movies = Array.isArray(response.data) ? response : response.data || [];
                setFilteredMovies(movies);
                setPopulareMovies([...movies].sort(() => 0.5 - Math.random()).slice(0, 5));
                setAfterMovies(movies.filter(movie =>
                    movie.year >= 2010
                ).slice(0, 5));
            } catch (error) {
                console.error("Erreur lors de la récupération des films :", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMovies();
    }, []);

    console.log(afterMovies)

    if (loading) return <LoadingSpinner />;

    function onRemoveFromCart(id) {
        setCartItems(cartItems.filter(m => m.id !== id));
    }

    return (
        <div>
            <Navbar />

            <MovieHero movie={populareMovies[0]} />

            <section className="py-8">
                <MovieList title="Films populaires" movies={populareMovies} />
            </section>

            <section className="py-8">
                <MovieFilter
                    movies={populareMovies}
                    onFilter={setFilteredMovies}
                />

                <MovieList title="Films disponibles" movies={filteredMovies} />
            </section>

            <section className="py-8">
                <MovieList title="Films récents" movies={afterMovies} />
            </section>
        </div>
    );
}

export default Home;