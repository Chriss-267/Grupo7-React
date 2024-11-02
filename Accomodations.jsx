import React, { useEffect, useState } from 'react'
import { getAccomodations } from '../services/accomodationServices'
import ModalAcommodation from './ModalAcommodation'
import { Link } from 'react-router-dom'

export default function Accomodations() {
    const [modal, setModal] = useState(false)
    const [activeId, setActiveId] = useState("")
    const [accomodations, setAccomodations] = useState([])
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    // Estado para la búsqueda
    const [searchTerm, setSearchTerm] = useState('')
    const [filteredAccommodations, setFilteredAccommodations] = useState([])

    const openModal = () => {
        setModal(true)
    }

    const closeModal = () => {
        setModal(false)
        setActiveId("")
    }

    const SelectActiveId = (id) => {
        setActiveId(id)
        openModal()
    }

    const fetchData = async () => {
        const response = await getAccomodations()
        setAccomodations(response)
        setFilteredAccommodations(response) // Inicialmente mostramos todos los alojamientos
    }

    // Efecto para filtrar los alojamientos
    useEffect(() => {
        const filtered = accomodations.filter(accommodation => 
            accommodation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            accommodation.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
            accommodation.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setFilteredAccommodations(filtered)
    }, [searchTerm, accomodations])

    useEffect(() => {
        const session_token = sessionStorage.getItem('token_bookings');
        if (session_token) {
            setIsAuthenticated(true)
            fetchData()
        } else {
            setIsAuthenticated(false)
        }
    }, [])

    return (
        <div>
            {
                isAuthenticated ? (
                    <div className='flex'>
                        <nav className='flex flex-col w-[20vw] bg-white p-5 gap-5'>
                            <h2 className='border-b border-gray-400 pb-3'>Panel de Control</h2>
                            <Link to="/alojamientos" className='hover:text-blue-800'>Alojamientos</Link>
                            <Link className='hover:text-blue-800'>Reservaciones</Link>
                        </nav>

                        


                        <div className='w-[70vw] ml-10'>
                            <div className='flex justify-between mt-5'>
                                <h1 className='text-2xl mt-5'>Alojamientos</h1>
                                <ModalAcommodation
                                    closeModal={closeModal}
                                    openModal={openModal}
                                    modal={modal}
                                    activeId={activeId}
                                    accomodations={accomodations}
                                    fetchData={fetchData}
                                />
                            </div>

                            {/* Barra de búsqueda */}
                            <div className='mt-5 mb-8'>
                                <input
                                    type="text"
                                    placeholder="Buscar por nombre, dirección o descripción..."
                                    className='w-full border border-gray-300 rounded-lg p-3 text-sm shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            {/* Resultados de búsqueda */}
                            {filteredAccommodations.length === 0 ? (
                                <div className='text-center py-8 text-gray-500'>
                                    No se encontraron alojamientos que coincidan con tu búsqueda
                                </div>
                            ) : (
                                filteredAccommodations.map((item) => (
                                    <div key={item.id} className='flex gap-5 p-10 bg-white rounded-md shadow-md mt-5'>
                                        <img src={item.image} alt="alojamiento" className='w-[10vw]' />
                                        <div className='flex justify-between w-full'>
                                            <div className='flex flex-col'>
                                                <h3>{item.name}</h3>
                                                <p className='text-sm text-gray-700'>Dirección: {item.address}</p>
                                                <p className='text-xs text-gray-600'>{item.description}</p>
                                            </div>
                                            <button onClick={() => SelectActiveId(item.id)}>
                                                <i className="fa-solid fa-pen-to-square cursor-pointer"></i>
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                ) : <h2>No estas autorizado, inicia sesión</h2>
            }
        </div>
    )
}