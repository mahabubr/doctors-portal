import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import useToken from '../../Hooks/useToken';

const Login = () => {

    const { register, formState: { errors }, handleSubmit } = useForm();
    const [loginError, setLoginError] = useState('')
    const [loginUserEmail, setLoginUserEmail] = useState('')
    const [token] = useToken(loginUserEmail)

    const { signIn, signInWithGoogle } = useContext(AuthContext)

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'

    if (token) {
        navigate(from, { replace: true })
    }

    console.log(loginUserEmail);

    const handleLogin = (data) => {
        setLoginError('')
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user
                setLoginUserEmail(data.email)
            })
            .catch(e => {
                console.log(e.message)
                setLoginError(e.message)
            })
    }

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => console.log(result.user))
            .then(e => console.log(e))
    }

    return (
        <div className='h-screen flex justify-center items-center'>
            <div className='w-96 p-7 border-x-2 border-y rounded-lg border-secondary'>
                <h3 className="text-3xl font-bold text-center">Login</h3>
                <form onSubmit={handleSubmit(handleLogin)}>
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
                        <input {...register("password", { required: "Password is required", minLength: { value: 6, message: "Your Password Must Be 6 Characters" } })} className="input input-bordered w-full" type="password" placeholder="Password" />
                        {errors.password && <p className='mt-2 text-red-600 font-bold text-sm' role="alert">{errors.password?.message}</p>}
                        <label className="label">
                            <span className="label-text cursor-pointer">Forget Password</span>
                        </label>
                    </div>
                    <input className="btn btn-primary bg-gradient-to-r from-primary to-secondary  text-white w-full mt-4" type="submit" value='Login' />
                    <div>
                        {loginError && <p className='mt-2 text-sm text-center text-red-500 font-bold'>{loginError}</p>}
                    </div>
                </form>
                <p className='text-sm mt-3 text-center'>New To Doctors Portal <Link to="/signup" className='text-primary font-bold'>Create New Account</Link></p>
                <div className="divider my-4">OR</div>
                <p onClick={handleGoogleSignIn} className='btn btn-outline btn-accent w-full'>Continue With Google</p>
            </div>
        </div>
    );
};

export default Login;