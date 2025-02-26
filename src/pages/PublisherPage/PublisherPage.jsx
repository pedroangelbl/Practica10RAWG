import { useEffect, useState } from "react"
import { useLoaderData,Link } from "react-router-dom"
import { getPublisherDetails, getGamesByPublisher } from "../../services/fetchsApi"

export async function loader({params}){
    const id = params.id
    return { id }
}

export default function PublisherPage(){
    const [publisher,setPublisher] = useState()
    const [games,setGames] = useState([])
    const { id } = useLoaderData()

    useEffect(()=>{
        fetchPublisherData()
    }, [id])

    const fetchPublisherData = async () => {
        try {
            const publisherData = await getPublisherDetails(id)
            setPublisher(publisherData)

            const result = await getGamesByPublisher(id)
            setGames(result.results)
        } catch (error) {
            console.error("Error fetching publisher data:", error)
            setGames([])
        }
    }

    return(
        <>
            <section className="container mx-auto px-4 py-10">
                <div className="bg-neutral-800 rounded-lg p-6 mb-10">
                    <div className="flex flex-col md:flex-row gap-8">
                        {publisher?.image_background && (
                            <div className="md:w-1/3">
                            <img
                                src={publisher.image_background}
                                alt={publisher.name}
                                className="w-full h-auto rounded-lg object-cover"
                            />
                            </div>
                        )}
                        <div className="md:w-2/3">
                            <h1 className="text-4xl font-bold mb-4">{publisher?.name}</h1>

                            {publisher?.description && (
                            <div className="mb-4 text-gray-300" dangerouslySetInnerHTML={{ __html: publisher.description }} />
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                            {publisher?.games_count && (
                                <div>
                                <h3 className="text-lg font-medium text-gray-400">Total de juegos</h3>
                                <p className="text-2xl font-bold">{publisher.games_count}</p>
                                </div>
                            )}
                            </div>
                        </div>
                    </div>
                </div>

                <h2 className="text-3xl font-bold mb-6">Juegos de {publisher?.name}</h2>

                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {games.map((game) => (
                        <Link
                        to={`/gameDetail/${game.id}`}
                        key={game.id}
                        className="card group block rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105"
                        >
                        <img
                            src={game.background_image || "/placeholder.svg"}
                            alt={game.name}
                            className="w-full h-48 object-cover group-hover:opacity-80 transition-opacity"
                        />
                        <div className="p-4">
                            <div className="text-yellow-400 font-bold text-lg">⭐ {game.rating}</div>
                            <h2 className="text-xl font-semibold text-white truncate">{game.name}</h2>
                            {game.genres && (
                                <div className="flex flex-wrap gap-1 mt-2">
                                    {game.genres.slice(0, 2).map((genre) => (
                                    <span key={genre.id} className="text-xs bg-neutral-700 text-white px-2 py-1 rounded">
                                        {genre.name}
                                    </span>
                                    ))}
                                </div>
                            )}
                        </div>
                        </Link>
                    ))}
                </div>  
            </section>
        </>
    )
}