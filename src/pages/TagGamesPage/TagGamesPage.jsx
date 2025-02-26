import { useEffect, useState } from "react"
import { useLoaderData,Link } from "react-router-dom"
import { getGamesByTag, getTagDetails } from "../../services/fetchsApi"

export async function loader({params}){
    const id = params.id
    return { id }
}

export default function TagGamesPage(){
    const [tag,setTag] = useState()
    const [games,setGames] = useState([])
    const { id } = useLoaderData()

    useEffect(()=>{
        fetchTagData()
    }, [id])

    const fetchTagData = async () => {
        try {
            const tagData = await getTagDetails(id)
            setTag(tagData)

            const result = await getGamesByTag(id)
            setGames(result.results)
        } catch (error) {
            console.error("Error fetching tag data:", error)
            setGames([])
        }
    }

    return(
        <>
            <section className="container mx-auto px-4 py-10">
                <div className="text-center mb-10">
                    <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl">{tag?.name || "Tag"}</h1>
                    {tag?.description && (
                    <div
                        className="mt-4 max-w-3xl mx-auto text-gray-300"
                        dangerouslySetInnerHTML={{ __html: tag.description }}
                    />
                    )}
                </div>
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