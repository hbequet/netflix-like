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

    function addToCart(movie) {
        if (cartItems.find(m => m.id === movie.id)) return;
        setCartItems([...cartItems, movie]);
    }

    function onRemoveFromCart(id) {
        setCartItems(cartItems.filter(m => m.id !== id));
    }

    return (
        <div>
            <Navbar movies={populareMovies} cartItems={cartItems} onRemoveFromCart={onRemoveFromCart} />

            <MovieHero movie={populareMovies[0]} />

            <section className="py-8">
                <h1 className="text-2xl font-bold px-4">Films populaires</h1>
                <MovieList movies={populareMovies} addToCart={addToCart} />
            </section>

            <section className="py-8">
                <MovieFilter
                    movies={populareMovies}
                    onFilter={setFilteredMovies}
                />

                <h1 className="text-2xl font-bold px-4">Films disponibles</h1>
                <MovieList movies={filteredMovies} addToCart={addToCart} />
            </section>

            <section className="py-8">
                <h1 className="text-2xl font-bold px-4">Films récents</h1>
                <MovieList movies={afterMovies} addToCart={addToCart} />
            </section>
        </div>
    );
}

export default Home;