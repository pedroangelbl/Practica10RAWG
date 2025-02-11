import { useLoaderData } from "react-router"
import { useState,useEffect } from "react"
import { getGame } from "../../services/fetchsApi"

export async function loader({params}){
    const id = params.id
    return { id }
}

export default function GameDetail(){
    const [game, setGame] = useState([])
    const { id } = useLoaderData();
    
    useEffect(()=>{
        getGame(setGame,id)
    }, [])

    return(
        <section className="content grid grid-cols-1 md:grid-cols-2 gap-16 px-8 py-10">
            <article className="flex flex-col gap-6 card p-6 rounded-lg">
                <div>
                    <h2 className="text-7xl font-black">{game.name}</h2>
                </div>
                
                <div>
                    <h3 className="text-3xl font-bold">About</h3>
                    <p className="text-justify" dangerouslySetInnerHTML={{ __html: game.description }} />
                </div>
            </article>
            
            <article className="flex flex-col gap-6 card p-6 rounded-lg">
                <div>
                    <img className="rounded-lg" src={game.background_image} alt={game.name} />
                </div>

                <div className="flex gap-2">
                    <h4 className="text-xl font-medium">Last modified:</h4>
                    <div>
                        <span className="mt-2 p-2 bg-blue-600 rounded-lg">{game.updated}</span>  
                    </div>
                </div>

                <div className="grid grid-cols-2">
                    <div className="flex flex-col gap-2">
                        <h4 className="text-xl font-medium">Rating</h4>
                        <div>
                            <span className="mt-2 p-2 bg-green-600 rounded-lg">{game.rating} / {game.rating_top} </span>  
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <h4 className="text-xl font-medium">Metacritic</h4>
                        <div>
                            <span className="mt-2 p-2 bg-yellow-600 rounded-lg">{game.metacritic}</span>  
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <h4 className="text-xl font-medium">Platforms</h4>
                        <div>{game.platforms?.map(p => p.platform.name).join(', ')}</div>
                    </div>

                    <div>
                        <h4 className="text-xl font-medium">Genre</h4>
                        <div>{game.genres?.map(g => g.name).join(', ')}</div>
                    </div>

                    <div>
                        <h4 className="text-xl font-medium">Release Date</h4>
                        <div>{game.released}</div>
                    </div>

                    <div>
                        <h4 className="text-xl font-medium">Playtime</h4>
                        <div>{game.playtime} hours</div>
                    </div>
                </div>
            </article>
        </section>
    )
}