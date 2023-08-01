
// src/components/PasswordReset.js
import React, { useEffect, useState, } from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetUser, passwordResetUrl } from '../../../features/authFeatures/authSlice';


const PasswordResetUrl = () => {


    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)
    const [email, setEmail] = useState('');
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    
    const {isError, isSuccess, isLoading, message } = useSelector(state => state.auth)

    const onSubmit = async (data) => {
        await dispatch(passwordResetUrl(data))
    }

    useEffect(() => {

        if (isSuccess) {
            setSuccessMessage("Password reset link sent on email. ")
        }

        if (isError) {
            setErrorMessage(message)
        }

       dispatch(resetUser())

    }, [isError, isSuccess, message, navigate, dispatch, resetUser])

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Reset Your Password</h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form noValidate className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <div className="mt-1">
                                <input

                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi,
                                            message: "Email address is required"
                                        }
                                    })}
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required=""

                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                                {
                                    errors.email && (
                                        <p className="text-red-500">{errors.email.message}</p>
                                    )
                                }
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#28844b] focus:outline-none focus:ring-2 focus:ring-offset-2"
                            >
                                Reset Password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PasswordResetUrl;
