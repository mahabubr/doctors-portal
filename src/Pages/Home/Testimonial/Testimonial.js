import React from 'react';
import quote from '../../../assets/icons/quote.svg'
import people1 from '../../../assets/images/people1.png'
import people2 from '../../../assets/images/people2.png'
import people3 from '../../../assets/images/people3.png'
import Review from './Review/Review';

const Testimonial = () => {

    const reviews = [
        {
            id: 1,
            name: "Winson Herry",
            img: people1,
            reviews: "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
            location: "California"
        },
        {
            id: 2,
            name: "Peter Watson",
            img: people2,
            reviews: "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
            location: "Florida"
        },
        {
            id: 3,
            name: "Tom Man",
            img: people3,
            reviews: "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
            location: "Washington"
        }
    ]

    return (
        <section className='my-20'>
            <div className='flex justify-between items-start'>
                <div>
                    <h4 className='font-bold text-xl mb-2 text-primary'>Testimonial</h4>
                    <h1 className="text-4xl font-bold">What Our Patients Say</h1>
                </div>
                <figure>
                    <img src={quote} className="w-24 lg:w-48" alt="" />
                </figure>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6'>
                {
                    reviews.map(review => <Review key={review.id} review={review} />)
                }
            </div>
        </section>
    );
};

export default Testimonial;