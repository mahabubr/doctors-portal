import React from 'react';
import fluoride from '../../../assets/images/fluoride.png'
import cavity from '../../../assets/images/cavity.png'
import whitening from '../../../assets/images/whitening.png'
import Service from './Service/Service';

const Services = () => {

    const servicesData = [
        {
            id: 1,
            name: "Fluoride Treatment",
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi, ut?",
            icon: fluoride
        },
        {
            id: 2,
            name: "Cavity Filling",
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi, ut?",
            icon: cavity
        },
        {
            id: 3,
            name: "Teeth Whitening",
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi, ut?",
            icon: whitening
        },
    ]

    return (
        <div className='my-16'>
            <div className='text-center'>
                <h3 className='text-primary uppercase text-xl font-bold'>Our Service</h3>
                <h3 className='text-3xl font-bold'>Services We Provide</h3>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8'>
                {
                    servicesData.map(service => <Service key={service.id} service={service} />)
                }
            </div>
        </div>
    );
};

export default Services;