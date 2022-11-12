import React from 'react';

const Review = ({ review }) => {

    const { name, location, img, reviews } = review

    return (
        <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
                <p>{reviews}</p>
                <div className='flex justify-start mt-4 items-center'>
                    <div className="avatar">
                        <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src={img} alt='' />
                        </div>
                    </div>
                    <div className='ml-4'>
                        <h3 className="text-xl">{name}</h3>
                        <p className="text-lg">{location}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Review;