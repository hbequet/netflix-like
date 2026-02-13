import MovieHero from "../components/movies/MovieHero.jsx";
import MovieList from "../components/movies/MovieList.jsx";
import {useEffect, useState} from "react";
import MovieFilter from "../components/movies/MovieFilter.jsx";
import Navbar from "../components/common/Navbar.jsx";

function Home() {
    const [populareMovies, setPopulareMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    const [filteredMovies, setFilteredMovies] = useState([]);

    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        setFilteredMovies(populareMovies.data);
    }, [])

    useEffect(() => {
        fetch('http://localhost:5000/api/movies/random/5')
            .then(res => res.json())
            .then(data => {
                setPopulareMovies(data);
                setLoading(false);
            })
            .catch(err => console.error("Erreur lors du chargement:", err));
    }, []);

    const [afterMovies, setAfterMovies] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/api/movies/after/2010/5')
            .then(res => res.json())
            .then(data => {
                setAfterMovies(data);
                setLoading(false);
            })
            .catch(err => console.error("Erreur lors du chargement:", err));
    }, []);
    console.log(afterMovies)

    if (loading) return <p className="text-center py-10">Chargement des films...</p>;

    function addToCart(movie) {
        if (cartItems.find(m => m.id === movie.id)) return;
        setCartItems([...cartItems, movie]);
    }

    function onRemoveFromCart(id) {
        setCartItems(cartItems.filter(m => m.id !== id));
    }

    return (
        <div>
            <Navbar movies={populareMovies.data} cartItems={cartItems} onRemoveFromCart={onRemoveFromCart} />

            <MovieHero movie={populareMovies.data[0]} />

            <section className="py-8">
                <h1 className="text-2xl font-bold px-4">Films populaires</h1>
                <MovieList movies={populareMovies.data} addToCart={addToCart} />
            </section>

            <section className="py-8">
                <MovieFilter
                    movies={populareMovies.data}
                    onFilter={setFilteredMovies}
                />

                <h1 className="text-2xl font-bold px-4">Films disponibles</h1>
                <MovieList movies={filteredMovies} addToCart={addToCart} />
            </section>

            <section className="py-8">
                <h1 className="text-2xl font-bold px-4">Films récents</h1>
                <MovieList movies={afterMovies.data} addToCart={addToCart} />
            </section>
        </div>
    );
}

export default Home;