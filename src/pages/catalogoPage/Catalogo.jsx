import { useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { getGamesThunk, searchGamesThunk, getGamesByDateThunk, getGamesByNameThunk } from '../../redux/gameRedux/gameThunks';
import { setSortBy, addFavorite, removeFavorite, setCurrentPage } from "../../redux/gameRedux/gameSlice";
import { Pagination } from "flowbite-react"; 

export default function Catalogo() {
    const dispatch = useDispatch();
    const { games, sortBy, favorites, currentPage, gamesPerPage } = useSelector(state => state.games);

    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("search") || "";
    const navigate = useNavigate();

    // Calcular los juegos que se muestran en la página actual
    const indexOfLastGame = currentPage * gamesPerPage;
    const indexOfFirstGame = indexOfLastGame - gamesPerPage;
    const currentGames = games.slice(indexOfFirstGame, indexOfLastGame);

    const handlePageChange = (page) => {
        dispatch(setCurrentPage(page)); 
    };

    const handleSearch = (e) => {
        const query = e.target.value;
        navigate(`/catalogo?search=${query}`);
    };

    const handleSortChange = (e) => {
        const selectedSort = e.target.value;
        dispatch(setSortBy(selectedSort));

        switch (selectedSort) {
            case "name":
                dispatch(getGamesByNameThunk(currentPage));
                break;
            case "released":
                dispatch(getGamesByDateThunk(currentPage));
                break;
            case "rating":
                dispatch(getGamesThunk(currentPage));
                break;
            default:
                dispatch(getGamesThunk(currentPage));
                break;
        }
    };

    const handleFavorite = (game) => {
        if (favorites.some(fav => fav.id === game.id)) {
            dispatch(removeFavorite(game.id));
        } else {
            dispatch(addFavorite(game));
        }
    };

    useEffect(() => {
        if (searchQuery) {
            dispatch(searchGamesThunk(searchQuery));
        } else {
            dispatch(getGamesThunk());
        }
    }, [searchQuery, currentPage, dispatch]);

    return (
        <section className="flex flex-col items-center gap-10 py-10">
            <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl text-center">All Games</h1>

            <div className="flex gap-4">
                <input
                    type="text"
                    onChange={handleSearch}
                    placeholder="Buscar juegos..."
                    className="px-4 py-2 rounded-md border-none text-gray-900 focus:ring-2 focus:ring-blue-500"
                />

                <select
                    value={sortBy}
                    onChange={handleSortChange}
                    className="px-4 py-2 rounded-md border-none bg-gray-800 text-white"
                >
                    <option value="rating">Mejor valorados</option>
                    <option value="name">Nombre (A-Z)</option>
                    <option value="released">Más recientes</option>
                </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-7xl px-5">
                {currentGames.map((game) => (
                    <div key={game.id} className="relative card group block rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
                        <button 
                            onClick={() => handleFavorite(game)}
                            className="absolute top-2 right-2 text-xl z-10"
                        >
                            {favorites.some(fav => fav.id === game.id) ? '❤️' : '🤍'}
                        </button>
                        <Link to={`/gameDetail/${game.id}`} className="block">
                            <img 
                                src={game.background_image} 
                                alt={game.name} 
                                className="w-full h-48 object-cover group-hover:opacity-80 transition-opacity"
                            />
                            <div className="p-4">
                                <div className="text-yellow-400 font-bold text-lg">⭐ {game.rating}</div>
                                <h2 className="text-xl font-semibold text-white truncate">{game.name}</h2>
                            </div>
                            <div className="flex flex-wrap gap-1 p-4">
                                {game.genres?.slice(0, 2).map((genre) => (
                                    <span key={genre.id} className="text-xs bg-neutral-700 text-white px-2 py-1 rounded">
                                    {genre.name}
                                    </span>
                                ))}
                            </div>
                        </Link>
                    </div>
                ))}
            </div>

            <div className="flex overflow-x-auto sm:justify-center mt-8">
                <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(games.length / gamesPerPage)} 
                    onPageChange={handlePageChange}
                />
            </div>
        </section>
    );
}