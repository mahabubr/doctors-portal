import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import AppointmentOptions from '../Appointment/AppointmentOptions/AppointmentOptions';
import BookingModal from '../BookingModal/BookingModal';

const AvailableAppointments = ({ selectedDate }) => {

    const [appointmentOptions, setAppointmentOptions] = useState([])
    const [treatment, setTreatment] = useState(null)

    useEffect(() => {
        fetch('appointmentOptions.json')
            .then(res => res.json())
            .then(data => setAppointmentOptions(data))
            .catch(e => console.log(e))
    }, [])

    return (
        <section className='my-20'>
            <p className='text-center text-xl font-bold text-secondary'>Available Appointments On {format(selectedDate, "PP")}</p>
            <div className='mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-10/12 mx-auto'>
                {
                    appointmentOptions.map(option => <AppointmentOptions key={option._id} appointmentOption={option} setTreatment={setTreatment} />)
                }
            </div>
            {
                treatment &&
                <BookingModal treatment={treatment} setTreatment={setTreatment} selectedDate={selectedDate}></BookingModal>
            }
        </section>
    );
};

export default AvailableAppointments;