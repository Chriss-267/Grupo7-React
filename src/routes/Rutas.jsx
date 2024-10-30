import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../components/Login'
import Accomodations from '../components/Accomodations'

export default function Rutas() {
    return (
        <BrowserRouter>
            <div className='flex '>
                
                <div className='flex flex-col w-[20vw] bg-white p-5 gap-5'>
                    <h2 className='border-b border-gray-400 pb-3'>Panel de Control</h2>
                    <a href="#">Alojamientos</a>
                    <a href="#">Reservaciones</a>

                </div>
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/alojamientos' element={<Accomodations />} />
                </Routes>
            </div>

        </BrowserRouter>
    )
}
