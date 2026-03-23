import MovieHero from "../components/movies/MovieHero.jsx";
import MovieList from "../components/movies/MovieList.jsx";
import {useEffect, useState} from "react";
import MovieFilter from "../components/movies/MovieFilter.jsx";
import Navbar from "../components/common/Navbar.jsx";
import moviesData from '../../../data/movies.json';
import LoadingSpinner from "../components/common/LoadingSpinner.jsx";

function Home() {
    const [populareMovies, setPopulareMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    const [filteredMovies, setFilteredMovies] = useState([]);

    const [cartItems, setCartItems] = useState([]);

    const [afterMovies, setAfterMovies] = useState([]);

    useEffect(() => {
        setFilteredMovies(moviesData);
        setPopulareMovies([...moviesData].sort(() => 0.5 - Math.random()).slice(0, 5));
        setAfterMovies(moviesData.filter(movie =>
            movie.year >= 2010
        ).slice(0, 5));
        setLoading(false);
    }, [])

    console.log(afterMovies)

    if (loading) return <LoadingSpinner />;

    function onRemoveFromCart(id) {
        setCartItems(cartItems.filter(m => m.id !== id));
    }

    return (
        <div>
            <Navbar movies={populareMovies} cartItems={cartItems} onRemoveFromCart={onRemoveFromCart} />

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