import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';

const AddDoctor = () => {

    const { register, formState: { errors }, handleSubmit } = useForm();

    const navigate = useNavigate()

    const imageHostKey = process.env.REACT_APP_imageBB_key

    const { data: specialties = [], isLoading } = useQuery({
        queryKey: ['appointmentSpecialty'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/appointmentSpecialty')
            const data = await res.json()
            return data
        }
    })

    if (isLoading) {
        return <Loading />
    }

    const handleAddDoctor = (data) => {
        const image = data.photo[0]

        const formData = new FormData()
        formData.append('image', image)

        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    const doctor = {
                        name: data.name,
                        email: data.email,
                        specialty: data.select,
                        image: imgData.data.url
                    }
                    fetch('http://localhost:5000/doctors', {
                        method: "POST",
                        headers: {
                            "content-type": "application/json",
                            authorization: `bearer ${localStorage.getItem('access-token')}`
                        },
                        body: JSON.stringify(doctor)
                    })
                        .then(res => res.json())
                        .then(addedData => {
                            if (addedData.acknowledged) {
                                toast.success(`${data.name} Added Successfully`)
                                navigate('/dashboard/manege-doctors')
                            }
                        })
                        .catch(e => {
                            toast.error("Doctors Not Created")
                        })
                }
            })
    }

    return (
        <div>
            <h3 className="text-3xl font-bold mb-6">Add A Doctor</h3>
            <div>
                <form onSubmit={handleSubmit(handleAddDoctor)} className='w-2/4 mx-auto'>
                    <div className="form-control w-full mx-auto">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input {...register("name", { required: "Name is required" })} className="input input-bordered w-full" type="text" placeholder="Name" />
                        {errors.name && <p className='mt-2 text-red-600 font-bold text-sm' role="alert">{errors.name?.message}</p>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input {...register("email", { required: "Email Address is required" })} className="input input-bordered w-full" type="email" placeholder="Email" />
                        {errors.email && <p className='mt-2 text-red-600 font-bold text-sm' role="alert">{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Specialty</span>
                        </label>
                        <select {...register("select", { required: "Select is required" })} className="select select-bordered w-full">
                            {specialties.map(specialty =>
                                <option
                                    key={specialty._id}
                                    value={specialty.name}
                                >
                                    {specialty.name}
                                </option>
                            )
                            }
                        </select>
                    </div>
                    <div className="form-control w-full mx-auto">
                        <label className="label">
                            <span className="label-text">Photo</span>
                        </label>
                        <input {...register("photo", { required: "Photo is required" })} className="" type="file" />
                        {errors.photo && <p className='mt-2 text-red-600 font-bold text-sm' role="alert">{errors.photo?.message}</p>}
                    </div>
                    <input className="btn btn-primary bg-gradient-to-r from-primary to-secondary  text-white w-full mt-4" type="submit" value='Add Doctor' />
                </form>
            </div>
        </div>
    );
};

export default AddDoctor;