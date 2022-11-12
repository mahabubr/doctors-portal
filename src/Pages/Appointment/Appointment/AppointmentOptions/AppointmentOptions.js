import React from 'react';

const AppointmentOptions = ({ appointmentOption, setTreatment }) => {

    const { name, slots } = appointmentOption

    return (
        <div className="card shadow-xl">
            <div className="card-body text-center">
                <h2 className="text-2xl font-bold text-primary">{name}</h2>
                <p>{slots.length > 0 ? slots[0] : 'Try Another Day'}</p>
                <p>{slots.length} {slots.length > 1 ? "Spaces" : "Space"} Available</p>
                <div className="card-actions justify-center">
                    <label disabled={slots.length === 0} onClick={() => setTreatment(appointmentOption)} className="btn btn-primary bg-gradient-to-r from-primary to-secondary  text-white" htmlFor="booking-modal">Book Appointment</label>
                </div>
            </div>
        </div>
    );
};

export default AppointmentOptions;