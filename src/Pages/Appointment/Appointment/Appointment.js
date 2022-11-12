import React, { useState } from 'react';
import AppointmentBanner from '../AppointmentBanner/AppointmentBanner';
import AvailableAppointments from '../AvailableAppointments/AvailableAppointments';

const Appointment = () => {

    const [selectedDate, setSelectedDate] = useState(new Date())

    return (
        <header>
            <AppointmentBanner
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
            >
            </AppointmentBanner>
            <AvailableAppointments
                selectedDate={selectedDate}
            >
            </AvailableAppointments>
        </header>
    );
};

export default Appointment;