import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { useState,useEffect } from "react"
import { getPublishers, searchPublishers } from "../../services/fetchsApi"

export default function PublishersPage(){
    const [publishers, setPublishers] = useState([])
    const [searchParams] = useSearchParams()
    const searchQuery = searchParams.get("search") || ""
    const navigate = useNavigate()
  
    const handleSearch = (e) => {
        const query = e.target.value
        navigate(`/publishers?search=${query}`)
    }

    useEffect(() => {
        fetchPublishersData()
    }, [searchQuery])

    const fetchPublishersData = async () => {
        try {
            if (searchQuery) {
                const searchResults = await searchPublishers(searchQuery)
                setPublishers(searchResults)
            } else {
                const fetchPublishers = await getPublishers()
                setPublishers(fetchPublishers)
            }
        } catch (error) {
            console.error("Error fetching publishers:", error)
            setPublishers([])
        }
    }

    return(
        <>
            <section className="flex flex-col items-center gap-10 py-10">
                <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl text-center">Publishers</h1>

                <input
                        type="text"
                        onChange={handleSearch}
                        placeholder="Buscar publishers..."
                        className="px-4 py-2 rounded-md border-none text-gray-900 focus:ring-2 focus:ring-blue-500"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-7xl px-5">
                    {publishers.map((publisher) => (
                        <Link
                        to={`/publisher/${publisher.id}`}
                        key={publisher.id}
                        className="card group block rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105"
                        >
                        <div className="relative h-48">
                            <img
                            src={publisher.image_background}
                            alt={publisher.name}
                            className="w-full h-48 object-cover group-hover:opacity-80 transition-opacity"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                            <div className="absolute bottom-0 left-0 right-0 p-4">
                            <h2 className="text-xl font-semibold text-white">{publisher.name}</h2>
                            </div>
                        </div>
                        <div className="p-4">
                            <div className="flex justify-between items-center">
                            <span className="text-gray-300">Juegos: {publisher.games_count}</span>
                            </div>
                        </div>
                        </Link>
                    ))}    
                </div>
            </section>
        </>
    )
}