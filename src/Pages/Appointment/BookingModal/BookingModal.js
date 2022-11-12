import { format } from 'date-fns/esm';
import React from 'react';

const BookingModal = ({ treatment, selectedDate, setTreatment }) => {

    const { name, slots } = treatment

    const date = format(selectedDate, "PP")

    const handleBooking = (event) => {
        event.preventDefault()

        const form = event.target

        const slot = form.slot.value
        const name = form.name.value
        const email = form.email.value
        const phone = form.phone.value

        const booking = {
            appointmentDate: date,
            patient: name,
            treatment: name,
            email,
            phone,
            slot
        }

        console.log(booking);

        setTreatment(null)
    }

    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{name}</h3>
                    <form onSubmit={handleBooking} className='mt-6'>
                        <input type="text" disabled value={date} className="input mt-4 input-bordered w-full" />
                        <select name='slot' className="select select-bordered w-full mt-4">
                            {
                                slots.map((slot, i) => <option key={i} value={slot}>{slot}</option>)
                            }
                        </select>
                        <input name='name' type="text" placeholder="Your Name" className="input mt-4 input-bordered w-full" />
                        <input name='email' type="email" placeholder="Email" className="input mt-4 input-bordered w-full" />
                        <input name='phone' type="number" placeholder="Phone Number" className="input mt-4 input-bordered w-full" />
                        <input type="submit" value="Submit" className="btn btn-primary bg-gradient-to-r from-primary to-secondary w-full mt-6 text-white" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;