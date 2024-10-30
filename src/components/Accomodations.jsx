import React, { useEffect, useState } from 'react'
import { getAccomodations } from '../services/accomodationServices'

export default function Accomodations() {
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
        if(session_token){
            setIsAuthenticated(true)
            //va poder visualizar los alojamientos
            fetchData()
        }else{
            setIsAuthenticated(false)
        }

    }, [])

    return (
        <div>
            {/** validamos si la persona esta autenticada */}
            {
                isAuthenticated ? (
                    <>
                        
                        <div className='w-[70vw] ml-10'>
                            <div className='flex justify-between'>
                                 <h1 className='text-2xl mt-5'>Alojamientos</h1>
                                 <button className='bg-black hover:bg-slate-800 text-white px-2 rounded-md text-sm'>Nuevo alojamiento</button>
                            </div>
                             

                            {
                                //mapeando los alojamientos
                                accomodations.map((item) => {
                                    return (
                                        
                                            <div key={item.id} className='flex gap-5 p-10 bg-white rounded-md shadow-md mt-5'>
                                                 <img src={item.image} alt="alojamiento" className='w-[10vw]' />
                                                 <div className='flex flex-col'>
                                                    <h3>{item.name}</h3>
                                                    <p className='text-sm text-gray-700'>Direccion: {item.address}</p>
                                                    <p className='text-xs text-gray-600'>{item.description}</p>
                                                 </div>
                                                
                                            </div>
                                      
                                        
                                    )
                                })
                            }
                        </div>
                    </>
                ) : <h2>No estas autorizado, inicia sesion</h2>
            }
        </div>
    )
}
