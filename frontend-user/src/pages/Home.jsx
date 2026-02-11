import MovieHero from "../components/movies/MovieHero.jsx";
import MovieList from "../components/movies/MovieList.jsx";
import {useEffect, useState} from "react";

function Home() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/api/movies/random/5')
            .then(res => res.json())
            .then(data => {
                setMovies(data);
                setLoading(false);
            })
            .catch(err => console.error("Erreur lors du chargement:", err));
    }, []);
    console.log(movies)

    if (loading) return <p className="text-center py-10">Chargement des films...</p>;
    if (movies.length === 0) return <p>Aucun film trouvé.</p>;

    return (
        <div>
            <MovieHero movie={movies.data[0]} />

            <section className="py-8">
                <h1 className="text-2xl font-bold px-4">Films populaires</h1>
                <MovieList movies={movies.data} />
            </section>
        </div>
    );
}

export default Home;