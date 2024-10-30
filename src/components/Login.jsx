import React from 'react'
import { useForm } from 'react-hook-form'
import { login } from '../services/loginServices';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    //entrada de datos del formulario
    const { register, handleSubmit} = useForm()

    const navigate = useNavigate()

    //metodo para validar el usuario
    const loginForm = async (data) => {
        console.log(data); //{email, password}
        const response = await login(data);
        //validando la respuesta del login
        if(response?.token){
            //si esta autorizada, guardamos el token en el sessionstorage
            sessionStorage.setItem('token_bookings', response.token)
        }
        //redireccione a los alojamientos
        navigate('/alojamientos')
        console.log(response);
        
    }

    return (
        <div className='flex flex-col justify-center items-center h-screen w-screen'>
            <div className='w-[30vw] h-[65vh] bg-white rounded-lg shadow-lg'>
            <h1 className='text-center text-xl mt-5'>Iniciar Sesion</h1>
            <p className='text-gray-600 text-xs mt-3 text-center mb-5'>Ingresa tus credenciales para acceder al sistema</p>
            <form  onSubmit={handleSubmit(loginForm)} className='flex flex-col mx-10 gap-8 '>
                <div className='flex flex-col'>
                    <label className='text-xs' htmlFor="email">Correo Electrónico</label>
                    <input className='border border-gray-500 w-full placeholder:text-xs p-1 text-xs' id='email' type="email" 
                    placeholder='correo@ejemplo.com'
                    {...register('email')} />
                </div>
                
                <div className='flex flex-col'>
                    <label className='text-xs' htmlFor="password">Contraseña</label>
                    <input className='border border-gray-500 w-full p-1' id='password' type="password"
                    placeholder='.........'
                     {...register('password')}/>
                </div>
                <div>
                    <button className='bg-black hover:bg-slate-700 rounded-md text-white w-full p-2 text-xs' type='submit'>Iniciar sesion</button>
                </div>
                
            </form>
            </div>
            <p className='text-gray-600 text-xs mt-3'>Este es un sistema seguro. Tus datos esta protegidos.</p>

        </div>
        
    )
}
