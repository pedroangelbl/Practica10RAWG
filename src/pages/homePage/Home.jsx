"use client"

import { Carousel } from "flowbite-react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getGames, getGamesByGenre, getUpcomingGames } from "../../services/fetchsApi"

export default function Home() {
    const [popularGames, setPopularGames] = useState([])
    const [actionGames, setActionGames] = useState([])
    const [upcomingGames, setUpcomingGames] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchAllGames()
    }, [])

    const fetchAllGames = async () => {
        setLoading(true)
        try {
            const popular = await getGames()
            setPopularGames(popular)

            const action = await getGamesByGenre(4)
            setActionGames(action)

            const upcoming = await getUpcomingGames()
            setUpcomingGames(upcoming)
        } catch (error) {
            console.error("Error fetching games:", error)
        } finally {
            setLoading(false)
        }
    }
    
    // Función para renderizar una tarjeta de juego
    const GameCard = ({ game }) => (
        <Link
            to={`/gameDetail/${game.id}`}
            className="card group block rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105"
        >
            <img
                src={game.background_image}
                alt={game.name}
                className="w-full h-40 object-cover group-hover:opacity-80 transition-opacity"
            />
            <div className="p-3">
                <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-white truncate">{game.name}</h3>
                <span className="text-yellow-400 font-bold">⭐ {game.rating}</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                {game.genres?.slice(0, 2).map((genre) => (
                    <span key={genre.id} className="text-xs bg-neutral-700 text-white px-2 py-1 rounded">
                    {genre.name}
                    </span>
                ))}
                </div>
            </div>
        </Link>
    )

    // Componente para sección de juegos
    const GameSection = ({ title, games, viewMoreLink }) => (
        <div className="mt-12">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{title}</h2>
            <Link to={viewMoreLink} className="text-blue-500 hover:underline">
            Ver más
            </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {games.slice(0, 4).map((game) => (
            <GameCard key={game.id} game={game} />
            ))}
        </div>
        </div>
    )

    if (loading) {
        return (
        <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        )
    }

  return (
    <div className="container mx-auto px-4 py-10">
      <section className="text-center">
        <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl">RAWG GAMES</h1>
        <p className="text-lg md:text-xl text-gray-400 mt-3 max-w-3xl mx-auto">
          Descubre los videojuegos más recientes y explora títulos populares con nuestra herramienta de búsqueda.
          ¡Encuentra información detallada sobre tus juegos favoritos!
        </p>
      </section>

      {/* Carrusel destacado con enlaces a los juegos */}
      <div className="h-96 mb-2 mt-10 sm:h-64 xl:h-80 2xl:h-96">
        <Carousel slideInterval={3000} className="rounded-lg overflow-hidden">
          {popularGames.slice(0, 5).map((game) => (
            <Link to={`/gameDetail/${game.id}`} key={game.id} className="relative w-full h-full">
              <img
                src={game.background_image}
                alt={game.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                <h2 className="text-2xl font-bold text-white">{game.name}</h2>
                <div className="flex items-center mt-2">
                  <span className="text-yellow-400 font-bold mr-2">⭐ {game.rating}</span>
                  <div className="flex gap-2">
                    {game.genres?.slice(0, 3).map((genre) => (
                      <span key={genre.id} className="text-xs bg-neutral-700 text-white px-2 py-1 rounded">
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </Carousel>
      </div>

      {/* Secciones de juegos */}
      <GameSection title="Juegos Populares" games={popularGames} viewMoreLink="/catalogo" />

      <GameSection title="Juegos de Acción" games={actionGames} viewMoreLink="/catalogo" />

      <GameSection title="Próximos Lanzamientos" games={upcomingGames} viewMoreLink="/catalogo" />

      {/* Sección de estadísticas */}
      <section className="mt-16 bg-neutral-800 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Estadísticas de Juegos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="bg-neutral-700 p-4 rounded-lg">
            <span className="text-3xl font-bold text-blue-400 block">{popularGames.length}+</span>
            <span className="text-gray-300">Juegos Populares</span>
          </div>
          <div className="bg-neutral-700 p-4 rounded-lg">
            <span className="text-3xl font-bold text-green-400 block">{actionGames.length}+</span>
            <span className="text-gray-300">Juegos de Acción</span>
          </div>
          <div className="bg-neutral-700 p-4 rounded-lg">
            <span className="text-3xl font-bold text-purple-400 block">{upcomingGames.length}+</span>
            <span className="text-gray-300">Próximos Lanzamientos</span>
          </div>
        </div>
      </section>

      {/* Sección de llamada a la acción */}
      <section className="mt-16 text-center bg-gradient-to-r from-blue-900 to-purple-900 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-3">¿Buscas un juego específico?</h2>
        <p className="mb-6 text-gray-300">
          Utiliza nuestro buscador para encontrar información detallada sobre cualquier juego
        </p>
        <Link
          to="/catalogo"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          Explorar Catálogo Completo
        </Link>
      </section>
    </div>
  )
}

