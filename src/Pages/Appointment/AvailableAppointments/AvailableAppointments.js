import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import React, { useState } from 'react';
import Loading from '../../Shared/Loading/Loading';
import AppointmentOptions from '../Appointment/AppointmentOptions/AppointmentOptions';
import BookingModal from '../BookingModal/BookingModal';

const AvailableAppointments = ({ selectedDate }) => {

    // const [appointmentOptions, setAppointmentOptions] = useState([])
    const [treatment, setTreatment] = useState(null)

    const date = format(selectedDate, "PP")

    const { data: appointmentOptions = [], refetch, isLoading } = useQuery({
        queryKey: ['appointmentOptions', date],
        queryFn: () => fetch(`https://doctors-portal-server-gules.vercel.app/appointmentOptions?date=${date}`)
            .then(res => res.json())
    })

    if (isLoading) {
        return <Loading />
    }

    // useEffect(() => {
    //     fetch('https://doctors-portal-server-gules.vercel.app/appointmentOptions')
    //         .then(res => res.json())
    //         .then(data => setAppointmentOptions(data))
    //         .catch(e => console.log(e))
    // }, [])

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
                <BookingModal treatment={treatment} setTreatment={setTreatment} selectedDate={selectedDate} refetch={refetch}></BookingModal>
            }
        </section>
    );
};

export default AvailableAppointments;