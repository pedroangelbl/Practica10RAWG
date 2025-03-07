import { NavLink, Link } from 'react-router-dom';
import { useState } from 'react';
import foto_perfil from '../assets/foto_perfil.png';

const links = [
    { name: 'Catalogo', path: '/catalogo' },
    { name: 'Publishers', path: '/publishers' }
];

export default function AppNavBar() {
    const [menuVisible, setMenuVisible] = useState(false);

    return (
        <nav className='bg-neutral-900 rounded-lg relative'>
            <div className='navBar flex items-center justify-between p-4'>
                <Link to='/'>
                    <h1 className='text-3xl font-black'>RAWG</h1>
                </Link>

                <ul className='flex gap-2 items-center'>
                    {links.map((link, index) => (
                        <li key={index}>
                            <NavLink className='link font-extrabold' to={link.path}>
                                {link.name}
                            </NavLink>
                        </li>
                    ))}
                    <li className="relative">
                        <button onClick={() => setMenuVisible(!menuVisible)} className='flex items-center'>
                            <img src={foto_perfil} className='w-14 cursor-pointer rounded-full' alt="Perfil" />
                        </button>
                        {menuVisible && (
                            <div className='absolute right-0 mt-2 w-40 bg-white text-black rounded-lg shadow-lg p-2'>
                                <Link to="perfil/favoritos" className="block px-4 py-2 hover:bg-gray-200 rounded">
                                    Favoritos
                                </Link>
                                <Link to="perfil/eventos" className="block px-4 py-2 hover:bg-gray-200 rounded">
                                    Eventos
                                </Link>
                            </div>
                        )}
                    </li>
                </ul>
            </div>
        </nav>
    );
}
