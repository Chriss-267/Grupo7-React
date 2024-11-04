import axios from "axios";



const token = sessionStorage.getItem('token_bookings')

const getBookings = async () => {
    try{

        const response = await axios.get("https://apibookingsaccomodations-production.up.railway.app/api/V1/bookings", {
            headers: {
                //agregamos el token para la autorizacion
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data ;
        
        
    }catch(error){
        console.error("Error al obtener las reservaciones", error);
    }
}



export{getBookings}