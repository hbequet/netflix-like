import { useEffect, useState } from 'react';

function SearchBar({ movies}) {

    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const [suggestedMovies, setSuggestedMovies] = useState([]);

    useEffect(() => {
        if (movies && searchTerm.length >= 2) {
            const filtered = movies.filter(movie =>
                movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                movie.description.toLowerCase().includes(searchTerm.toLowerCase())
            ).slice(0, 5);

            setSuggestedMovies(filtered);
            setIsOpen(true);
        } else {
            setSuggestedMovies([]);
            setIsOpen(false);
        }
    }, [searchTerm, movies]);

    const handleSelect = (movie) => {
        setSearchTerm(movie.title);
        setIsOpen(false);
        console.log(movie);
    };

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className="relative w-full max-w-md">
            <div className="relative">
                <input type="text" placeholder="Rechercher un film..."
                       className="w-full px-4 py-2 pl-10 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-primary text-white"
                       value={searchTerm}
                       onChange={handleChange}
                       onFocus={() => {
                           if (searchTerm.length >= 2) {
                               setIsOpen(true);
                           }
                       }}
                       onBlur={() => {
                           setTimeout(() => setIsOpen(false), 150);
                       }}
                />
                <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>

            {isOpen && suggestedMovies.length > 0 && (
                <div className="absolute mt-2 w-full bg-[#161824] border border-gray-700 rounded-lg z-10 shadow-xl overflow-hidden py-2">
                    {suggestedMovies.map(movie => (
                        <div
                            key={movie.id}
                            onClick={() => handleSelect(movie)}
                            className="flex items-center gap-4 px-4 py-2 hover:bg-gray-800 cursor-pointer transition-colors duration-150"
                        >
                            <img
                                src={movie.poster}
                                alt={`Image de ${movie.title}`}
                                className="w-12 h-16 object-cover rounded-md shadow-sm"
                            />

                            <div className="flex flex-col">
                <span className="text-white font-bold text-base leading-tight mb-1">
                  {movie.title}
                </span>
                                <span className="text-gray-400 text-sm">
                                    {movie.year} • {movie.genre}
                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SearchBar;
