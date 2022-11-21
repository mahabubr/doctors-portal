import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import ConfirmModal from '../../Shared/ConfirmModal/ConfirmModal';

const ManageDoctors = () => {

    const [deletingDoctor, setDeletingDoctor] = useState(null)

    const { data: doctors = [], refetch } = useQuery({
        queryKey: [],
        queryFn: async () => {
            try {
                const res = await fetch('https://doctors-portal-server-gules.vercel.app/doctors', {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('access-token')}`
                    },
                })
                const data = await res.json()
                return data
            }
            catch (e) {
                console.log(e);
            }
        }
    })

    const closeModal = () => {
        setDeletingDoctor(null)
    }

    const handleDeleteDoctor = (doctor) => {

        fetch(`https://doctors-portal-server-gules.vercel.app/doctors/${doctor._id}`, {
            method: "DELETE",
            headers: {
                authorization: `bearer ${localStorage.getItem('access-token')}`
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    toast.success('Your Doctor Deleted')
                    refetch()
                }
            })
            .catch(e => console.log(e))

    }

    return (
        <div>
            <h3 className="text-3xl font-bold mb-6">Manage Doctors : {doctors?.length}</h3>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>email</th>
                            <th>Specialty</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            doctors?.map((doctor, i) =>
                                <tr key={doctor._id}>
                                    <th>{i + 1}</th>
                                    <td>
                                        <div className="avatar">
                                            <div className="w-12 rounded-full">
                                                <img src={doctor.image} alt='' />
                                            </div>
                                        </div>
                                    </td>
                                    <td>{doctor.name}</td>
                                    <td>{doctor.email}</td>
                                    <td>Quality Control Specialist</td>
                                    <td>
                                        <label onClick={() => setDeletingDoctor(doctor)} htmlFor="confirm-modal" className="btn btn-sm btn-error">Delete</label>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            {
                deletingDoctor &&
                <ConfirmModal
                    title={`are you sure you want to delete`}
                    message={`if you delete ${deletingDoctor.name}. it can not recovered`}
                    modalData={deletingDoctor}
                    successBtnName="Delete"
                    handleDeleteDoctor={handleDeleteDoctor}
                    closeModal={closeModal}
                />
            }
        </div>
    );
};

export default ManageDoctors;