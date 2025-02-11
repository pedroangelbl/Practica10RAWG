import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getGames } from "../../services/fetchsApi";

export default function Catalogo() {
    const [games, setGames] = useState([]);
    const [filteredGames, setFilteredGames] = useState([]);
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("search") || "";

    useEffect(() => {
        getGames(setGames);
    }, []);

    useEffect(() => {
        if(searchQuery){
            const filtered = games.filter(game => 
                game.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            setFilteredGames(filtered)
        }else {
            setFilteredGames(games)
        }
    }, [searchQuery, games]);

    return (
        <section className="flex flex-col items-center gap-10 py-10">
            <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl text-center">All Games</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-7xl px-5">
                {filteredGames.map((game) => (
                    <Link 
                        to={`/gameDetail/${game.id}`} 
                        key={game.id} 
                        className="card group block rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105"
                    >
                        <img 
                            src={game.background_image} 
                            alt={game.name} 
                            className="w-full h-48 object-cover group-hover:opacity-80 transition-opacity"
                        />
                        <div className="p-4">
                            <div className="text-yellow-400 font-bold text-lg">⭐ {game.rating}</div>
                            <h2 className="text-xl font-semibold text-white truncate">{game.name}</h2>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
