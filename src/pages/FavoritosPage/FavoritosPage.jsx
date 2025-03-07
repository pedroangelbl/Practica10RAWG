import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { addFavorite, removeFavorite, setCurrentPage } from "../../redux/favoritoRedux/favoritoSlice";
import { Pagination } from "flowbite-react"; 

export default function FavoritosPage(){
    const dispatch = useDispatch()
    const { games, favorites, currentPage, gamesPerPage } = useSelector(state => state.favorito);

    // Calcular los juegos que se muestran en la página actual
    const indexOfLastGame = currentPage * gamesPerPage;
    const indexOfFirstGame = indexOfLastGame - gamesPerPage;
    const currentGames = games.slice(indexOfFirstGame, indexOfLastGame);

    const handlePageChange = (page) => {
        dispatch(setCurrentPage(page)); 
    };

    const handleFavorite = (game) => {
        if (favorites.some(fav => fav.id === game.id)) {
            dispatch(removeFavorite(game.id));
        } else {
            dispatch(addFavorite(game));
        }
    };

    return(
        <>
            <section className="flex flex-col items-center gap-10 py-10">
                <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl text-center">Favoritos</h1>

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
        </>
    )
}