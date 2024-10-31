import React, { useEffect, useState } from 'react'
import { getAccomodations } from '../services/accomodationServices'
import ModalAcommodation from './ModalAcommodation'
import { Link } from 'react-router-dom'


export default function Accomodations() {
    //modal
    const [modal, setModal] = useState(false)

    const openModal = () =>{
        setModal(true)
    }

    const closeModal = () =>{
        setModal(false)
        setActiveId("")
    }

    const [activeId, setActiveId] = useState("")

    const SelectActiveId = (id) =>{
       
       setActiveId(id)
       console.log(id);
       openModal()
       
       
        
    }

    

    const [accomodations, setAccomodations] = useState([])
    //estado para verificar si el usuario esta autenticado
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    //metodo para obtener la respuesta de la api
    const fetchData = async () => {
        const response = await getAccomodations() //si esto es un exito devolvera un arreglo de alojamientos
        setAccomodations(response);
    }

    useEffect(() => {
        //validamos si el token existe
        const session_token = sessionStorage.getItem('token_bookings');
        if (session_token) {
            setIsAuthenticated(true)
            //va poder visualizar los alojamientos
            fetchData()
        } else {
            setIsAuthenticated(false)
        }

    }, [])

    return (
        <div>
            {/** validamos si la persona esta autenticada */}
            {
                isAuthenticated ? (
                    <div className='flex'>
                        <nav className='flex flex-col w-[20vw] bg-white p-5 gap-5'>
                            <h2 className='border-b border-gray-400 pb-3'>Panel de Control</h2>
                            <Link to = "/alojamientos" className='hover:text-blue-800'>Alojamientos</Link>
                            <Link className='hover:text-blue-800'>Reservaciones</Link>

                        </nav>

                        <div className='w-[70vw] ml-10'>
                            <div className='flex justify-between mt-5'>
                                <h1 className='text-2xl mt-5'>Alojamientos</h1>
                                <ModalAcommodation
                                closeModal = {closeModal}
                                openModal ={openModal}  
                                modal ={modal}  
                                activeId ={activeId}
                                accomodations = {accomodations}
                                fetchData = {fetchData}
                                                     
                            />
                            </div>


                            {
                                //mapeando los alojamientos
                                accomodations.map((item) => {
                                    return (

                                        <div key={item.id} className='flex gap-5 p-10 bg-white rounded-md shadow-md mt-5'>
                                            <img src={item.image} alt="alojamiento" className='w-[10vw]' />
                                            <div className='flex justify-between w-full'>
                                                <div className='flex flex-col'>
                                                     <h3>{item.name}</h3>
                                                     <p className='text-sm text-gray-700'>Direccion: {item.address}</p>
                                                     <p className='text-xs text-gray-600'>{item.description}</p>
                                                </div>
                                                <button
                                                    onClick={() => SelectActiveId(item.id)}
                                                >
                                                  <i className="fa-solid fa-pen-to-square cursor-pointer"></i>
                                                </button>
                                               
                                            </div>

                                        </div>

                                        


                                    )
                                })
                            }

                            
                        </div>
                       
                    </div>
                ) : <h2>No estas autorizado, inicia sesion</h2>
            }
        </div>
    )
}
