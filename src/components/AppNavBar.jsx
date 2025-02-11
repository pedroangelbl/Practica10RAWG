import { NavLink, Link, useNavigate, useSearchParams } from 'react-router'
import { useState } from 'react'
import logoCine from '../assets/logo-cine.png'

const links = [
    { name:'Home', path:'/' },
    { name: 'Catalogo', path: '/catalogo' }
]

export default function AppNavBar() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const [search, setSearch] = useState(searchParams.get("search") || "");

    const handleSearch = (e) => {
        const query = e.target.value
        setSearch(query)
        navigate(`/catalogo?search=${query}`)
    }

    return(
        <nav className='bg-neutral-900 rounded-lg'>
            <div className='navBar flex items-center justify-between p-4'>
                <Link className='flex items-center' to='/'>
                    <img src={logoCine} className='w-28' alt="Logo de cine" />
                    <h1 className='text-3xl font-black'>RAWG</h1>
                </Link>

                <input
                    type="text"
                    value={search}
                    onChange={handleSearch}
                    placeholder="Buscar juegos..."
                    className="px-4 py-2 rounded-md border-none text-gray-900 focus:ring-2 focus:ring-blue-500"
                />

                <ul className='flex gap-2'>
                    {
                        links.map((link, index) => (
                            <li key={index}>
                                <NavLink className='link font-extrabold' key={index} to={link.path}> 
                                    {link.name}
                                </NavLink>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </nav>
    )
}