import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import useToken from '../../Hooks/useToken';

const SignUp = () => {

    const { register, formState: { errors }, handleSubmit } = useForm();
    const { createUser, updateUser, signInWithGoogle } = useContext(AuthContext)
    const [createdUserEmail, setCreatedUserEmail] = useState('')
    const [token] = useToken(createdUserEmail)
    const navigate = useNavigate()

    if (token) {
        navigate('/')
    }

    const handleSignUp = (data) => {
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user
                // console.log(user);
                const userInfo = {
                    displayName: data.name
                }
                updateUser(userInfo)
                    .then(() => {
                        saveUser(data.name, data.email)
                        toast.success('Create Account Successfully')
                    })
                    .catch(e => console.log(e.message))
            })
            .catch(e => console.log(e))
    }

    const saveUser = (name, email) => {
        const user = { name, email }
        fetch('https://doctors-portal-server-gules.vercel.app/users', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                setCreatedUserEmail(email)
            })
            .catch(e => console.log(e))
    }

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => console.log(result.user))
            .then(e => console.log(e))
    }

    return (
        <div className='h-screen flex justify-center items-center'>
            <div className='w-96 p-7 border-x-2 border-y rounded-lg border-secondary'>
                <h3 className="text-3xl font-bold text-center">Sign Up</h3>
                <form onSubmit={handleSubmit(handleSignUp)}>
                    <div className="form-control w-full">
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
                            <span className="label-text">Password</span>
                        </label>
                        <input {...register("password", { required: "Password is required", minLength: { value: 6, message: "Your Password Must Be 6 Characters" }, pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, message: "Password Must Be Strong" } })} className="input input-bordered w-full" type="password" placeholder="Password" />
                        {errors.password && <p className='mt-2 text-red-600 font-bold text-sm' role="alert">{errors.password?.message}</p>}
                    </div>
                    <input className="btn btn-primary bg-gradient-to-r from-primary to-secondary  text-white w-full mt-4" type="submit" value='Sign Up' />
                </form>
                <p className='text-sm mt-3 text-center'>Old To Doctors Portal <Link to="/login" className='text-primary font-bold'>Go To Login</Link></p>
                <div className="divider my-4">OR</div>
                <p onClick={handleGoogleSignIn} className='btn btn-outline btn-accent w-full'>Continue With Google</p>
            </div>
        </div>
    );
};

export default SignUp;