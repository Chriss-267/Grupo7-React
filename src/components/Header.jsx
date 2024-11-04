import React from 'react'
import { Link } from 'react-router-dom'


function Header() {
    return (
        <div >
            <nav className=' w-full flex lg:flex-col lg:w-[20vw] bg-white p-5 gap-5 lg:h-screen fixed '>
                <h2 className='border-b border-gray-400 pb-3'>Panel de Control</h2>
                <Link to="/alojamientos" className='border-b border-gray-400 lg:border-none hover:text-blue-800'>Alojamientos</Link>
                <Link to="/reservaciones" className='border-b border-gray-400 lg:border-none hover:text-blue-800'>Reservaciones</Link>
            </nav>

        </div>
    )
}

export default Header