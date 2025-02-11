import { Carousel } from "flowbite-react";
import { useState,useEffect } from "react";
import { getGames } from "../../services/fetchsApi";

export default function Home(){
    const [games, setGames] = useState([])

    useEffect(()=>{
        getGames(setGames)
    }, [])

    
    return(
        <>
        <section className="text-center py-10">
            <h1 className='font-bold text-4xl md:text-5xl lg:text-6xl'>NEW GAMES</h1>

            <p className="text-lg md:text-xl text-gray-500 mt-3">
                Descubre los videojuegos más recientes y explora títulos populares con nuestra herramienta de búsqueda.
            </p>

            <div className="h-96 mb-2 mt-6 sm:h-64 xl:h-80 2xl:h-96">
                <Carousel slideInterval={2000} className='mb-3 mt-3'>
                {
                    games.map((game,index)=>(
                        <div key={index}>
                            <img src={game.background_image} alt={game.name} />
                        </div>
                    ))
                }
                </Carousel>
            </div>
        </section>
        </>
    )
}