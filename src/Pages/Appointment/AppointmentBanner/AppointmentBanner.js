import React from 'react';
import bgBanner from '../../../assets/images/bg.png'
import chair from '../../../assets/images/chair.png'
import { DayPicker } from 'react-day-picker';


const bgStyle = {
    backgroundImage: `url(${bgBanner})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
}

const AppointmentBanner = ({ selectedDate, setSelectedDate }) => {
    return (
        <div style={bgStyle} className="hero py-28">
            <div className="hero-content flex-col justify-between lg:flex-row-reverse">
                <img src={chair} className="rounded-lg lg:w-1/2 shadow-2xl" alt='' />
                <div>
                    <DayPicker
                        mode='single'
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                    />
                </div>
            </div>
        </div>
    );
};

export default AppointmentBanner;