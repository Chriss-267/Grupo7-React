import axios from "axios";

//obtenemos el token que se guarda en el sessionstorage
const token = sessionStorage.getItem('token_bookings')

const getAccomodations = async () => {
    try{

        const response = await axios.get("https://apibookingsaccomodations-production.up.railway.app/api/V1/accomodations", {
            headers: {
                //agregamos el token para la autorizacion
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    }catch(error){
        console.error("Error al obtener los alojamientos", error);
    }
}

const postAccomodation = async(dataAcommodation) =>{
    try{
        const response = await axios.post("https://apibookingsaccomodations-production.up.railway.app/api/V1/accomodation", dataAcommodation, {
            
            
            headers: {
                //agregamos el token para la autorizacion
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch(error){
        console.log("Error al insertar", error);
        
    }
}

const putAccomodation = async(dataAcommodation) =>{
    try{
        const response = await axios.put(`https://apibookingsaccomodations-production.up.railway.app/api/V1/accomodation/${dataAcommodation.id}`, dataAcommodation, {
            
            
            headers: {
                //agregamos el token para la autorizacion
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch(error){
        console.log("Error al insertar", error);
        
    }
}


export { getAccomodations,postAccomodation, putAccomodation }