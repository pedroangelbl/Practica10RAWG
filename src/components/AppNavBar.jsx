import { NavLink, Link } from 'react-router'
import logoCine from '../assets/logo-cine.png'

const links = [
    { name:'Home', path:'/' },
    { name: 'Catalogo', path: '/catalogo' },
    { name: 'Publishers', path: '/publishers' }
]

export default function AppNavBar() {
    return(
        <nav className='bg-neutral-900 rounded-lg'>
            <div className='navBar flex items-center justify-between p-4'>
                <Link className='flex items-center' to='/'>
                    <img src={logoCine} className='w-28' alt="Logo de cine" />
                    <h1 className='text-3xl font-black'>RAWG</h1>
                </Link>

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