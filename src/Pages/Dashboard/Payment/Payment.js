import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CheckOutForm from './CheckOutForm/CheckOutForm';


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK)

console.log(stripePromise);

const Payment = () => {

    const booking = useLoaderData()
    console.log(booking);

    return (
        <div>
            <h3 className="text-3xl font-bold mb-6">Payment For {booking.treatment}</h3>
            <p className="text-xl text-blue-600">Please Pay ${booking.price} For Your Appointment on {booking.appointmentDate}</p>
            <div className='w-96 my-12'>
                <Elements stripe={stripePromise}>
                    <CheckOutForm />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;