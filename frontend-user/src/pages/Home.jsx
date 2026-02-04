import MovieHero from "../components/movies/MovieHero.jsx";
import MovieList from "../components/movies/MovieList.jsx";

const randomMovies = (arr, n) => {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
};

function Home() {
    const movies = fetch('http://localhost:5000/api/movies').then(res => res.json());

    return <div>
            <MovieHero movie={movies[0]}/>
            <section className="py-8">
                <h1>Films populaires</h1>
                <MovieList movies={randomMovies(movies, 5)}/>
            </section>
        </div>
}

export default Home;