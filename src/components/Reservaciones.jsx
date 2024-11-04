import { Link } from 'react-router-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { getBookings } from "../services/reservacionesServices";
import { useEffect, useState } from "react";
import Header from './Header';




// Crear el localizador
const localizer = momentLocalizer(moment); 

function Reservaciones() {
    const [bookings, setBookings] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
   

    const fetchData = async () => {
        const response = await getBookings();
        setBookings(response);
    };

    useEffect(() => {
        const session_token = sessionStorage.getItem('token_bookings');
        if (session_token) {
            setIsAuthenticated(true);
            fetchData();
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    const events = bookings.map(booking => ({
        id: booking.id,
        title: `Reserva desde ${booking.check_in_date} hasta ${booking.check_out_date} - Estado: ${booking.status}`,
        start: new Date(booking.check_in_date),
        end: new Date(booking.check_out_date)
    }));

    return (
        <div>
            {isAuthenticated ? (
                <div className='flex gap-5'>
                    <Header/>


                    <div className='w-full lg:w-[80vw] lg:ml-[20vw] mt-5'>

                        <div className='mt-28 lg:mt-0'>
                            <Calendar
                                localizer={localizer}
                                events={events}
                                startAccessor="start"
                                endAccessor="end"
                                style={{
                                    height: '75vh',
                                    width : "90%",
                                    
                                   
                                   
                                }}

                                className="rounded-lg shadow-md "
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <p>No está autorizado</p>
            )}
        </div>
    );
}

export default Reservaciones;
