import React, { useContext } from 'react';
import { format } from 'date-fns/esm';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';
import toast from 'react-hot-toast';

const BookingModal = ({ treatment, selectedDate, setTreatment, refetch }) => {

    const { user } = useContext(AuthContext)

    const { name: treatmentName, slots } = treatment

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
            treatment: treatmentName,
            email,
            phone,
            slot
        }

        fetch('http://localhost:5000/bookings', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    setTreatment(null)
                    toast.success("Booking Confirm")
                    refetch()
                }
                else {
                    toast.error(data.message)
                }
            })
            .catch(e => console.log(e))
    }

    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{treatmentName}</h3>
                    <form onSubmit={handleBooking} className='mt-6'>
                        <input type="text" disabled value={date} className="input mt-4 input-bordered w-full" />
                        <select name='slot' className="select select-bordered w-full mt-4">
                            {
                                slots.map((slot, i) => <option key={i} value={slot}>{slot}</option>)
                            }
                        </select>
                        <input name='name' type="text" defaultValue={user?.displayName} disabled placeholder="Your Name" className="input mt-4 input-bordered w-full" />
                        <input name='email' type="email" defaultValue={user?.email} disabled placeholder="Email" className="input mt-4 input-bordered w-full" />
                        <input name='phone' type="number" placeholder="Phone Number" className="input mt-4 input-bordered w-full" />
                        <input type="submit" value="Submit" className="btn btn-primary bg-gradient-to-r from-primary to-secondary w-full mt-6 text-white" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;