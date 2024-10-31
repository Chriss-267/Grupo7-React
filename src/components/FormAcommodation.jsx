import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Error from './Error'
import { postAccomodation, putAccomodation } from '../services/accomodationServices'
import Swal from 'sweetalert2'




function FormAcommodation({closeModal, activeId, accomodations, fetchData}) {

    const { register, handleSubmit, formState : {errors}, reset, setValue} = useForm()

    useEffect(() =>{
        if(activeId){
            const activeAcomodation = accomodations.filter(acomodation => acomodation.id === activeId)[0]
            setValue("name", activeAcomodation.name)
            setValue("address", activeAcomodation.address)
            setValue("description", activeAcomodation.description)

        }
    }, [activeId, reset, setValue])

    const sendAcommodation  = async (data) =>{
        try {
            const response = await postAccomodation(data);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Insertado con éxito",
                showConfirmButton: false,
                timer: 1500
              });
            fetchData()
        } catch (error) {
            console.error("Error al insertar alojamiento:", error);
        }
        closeModal()

        
    }

    const editAcommodation  = async (data) =>{
        const dataWithId = { ...data, id: activeId };
        try {
            const response = await putAccomodation(dataWithId);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Editado con éxito",
                showConfirmButton: false,
                timer: 1500
              });
            fetchData()
        } catch (error) {
            console.error("Error al insertar alojamiento:", error);
        }
       closeModal()

        
    }

    

  return (
    <div>
        <form className='space-y-4' onSubmit={handleSubmit(activeId ? editAcommodation : sendAcommodation)}>
            
            <h2 className='border-b border-b-gray-400 pb-3 pl-4 text-xl'>{activeId ? "Editar Alojamiento" : "Nuevo Alojamiento"}</h2>

            <div className='px-5 flex flex-col '>
                <label htmlFor="name">Nombre <span className='text-red-500'>*</span></label>
                <input type="text"
                    className='border border-gray-400 placeholder:text-gray-400 text-sm p-2'
                    placeholder='Nombre del Alojamiento'
                    {...register('name', {required : "El nombre es requerido"})}
                />
                {errors.name && (
                         <Error>{errors.name?.message}</Error>
                    )}
            </div>

            <div className='px-5 flex flex-col '>
                <label htmlFor="name">Dirección<span className='text-red-500'>*</span></label>
                <input type="text"
                    className='border border-gray-400 placeholder:text-gray-400 text-sm p-2'
                    placeholder='Dirección del Alojamiento'
                    {...register('address', {required : "La direccion es requerida"})}
                />
                {errors.address && (
                         <Error>{errors.address?.message}</Error>
                )}
            </div>
            <div className='px-5 flex flex-col border-b border-b-gray-400 pb-8'>
                <label htmlFor="name">Descripción<span className='text-red-500'>*</span></label>
                <textarea 
                    className='border border-gray-400 text-sm h-[14vh] '
                    {...register('description', {required : "La descripcion es requerida"})}
                    
                />
                {errors.description && (
                         <Error>{errors.description?.message}</Error>
                    )}
            </div>
            <div className='text-right mr-3'>
            <input type="submit"
                className='p-2 text-white rounded-lg bg-black text-sm hover:bg-slate-800 cursor-pointer'
                value= {activeId ? "Guardar Cambios" : "Guardar Registro"}

            />
            </div>
            

        </form>

    </div>
  )
}

export default FormAcommodation