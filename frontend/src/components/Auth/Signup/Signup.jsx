import React, { useEffect, useState, } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userRegister, resetUser } from '../../../features/authFeatures/authSlice';
import Logo from '../../../assets/img/ziraat-logo.png';
import MetaData from '../../../app/MetaData';


const Signup = () => {


    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)
    const [userData, setUserData] = useState({ email: '', password: '' })
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user, isError, isSuccess, isLoading, message } = useSelector(state => state.auth)

    const handleChanges = (event) => {
        const { name, value } = event.target;
       
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
          }));

        setErrorMessage(null)
        setSuccessMessage(null)


    }

    const onSubmit = async (data) => {
        await setUserData({ email: data.email, password: data.password })
        await dispatch(userRegister(userData))
    }

    useEffect(() => {
        
        if (isSuccess || user) {
            console.log(user)
            setSuccessMessage(message)
            const {email} = user.user
            navigate(`/user/verify-email/${email}`)
        }

        if (isError) {
            setErrorMessage(message)
        }

        dispatch(resetUser)
        
    }, [user, isError, isSuccess, message, navigate, dispatch, userData])


    return (
        <>
        <MetaData title="Sign up | Ziraat B2B" />
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-20 w-auto"
                        src={Logo}
                        alt="Ziraat B2b"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Create an account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form  noValidate className="space-y-6" onSubmit={handleSubmit(onSubmit)} method="POST">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi,
                                            message: "Please include the @ in the email address"
                                        }
                                    })}
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={userData.email}
                                    onChange={handleChanges}
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {
                                    errors.email && (
                                        <p className="text-red-500">{errors.email.message}</p>
                                    )
                                }

                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>

                            </div>
                            <div className="mt-2">
                                <input
                                    {...register("password", {
                                        required: "Password is required",
                                        pattern: {
                                            value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                                            message: ` - Password must contain at least one special character 
                                        one number \n
                                        - one capital letter \n
                                        - be at least 8 characters long`
                                        }

                                    })}

                                    id="password"
                                    name="password"
                                    type="password"
                                    value={userData.password}
                                    onChange={handleChanges}
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {
                                    errors.password && (
                                        <p className="text-red-500">{errors.password.message}</p>
                                    )
                                }
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Confirm Password
                                </label>

                            </div>
                            <div className="mt-2">
                                <input
                                    {...register("confirmPassword", {
                                        required: "Confirm password is required",
                                        validate: (value, formValues) => value == formValues.password || "Password does not match"
                                    })}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {
                                    errors.confirmPassword && (
                                        <p className="text-red-500">{errors.confirmPassword.message}</p>
                                    )
                                }
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className={`${isLoading ? 'hidden' : ''} w-full justify-center rounded-md bg-[#28844b] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                            >
                                Sign up
                            </button>

                            <button
                                disabled= {isLoading ? true : false}
                                type="submit"
                                className={`${isLoading ? '' : 'hidden'} w-full justify-center rounded-md bg-[#28844b] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                            >
                                <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                </svg>

                            </button>
                        </div>
                    </form>

                    <div className={`${errorMessage == null ? 'hidden' : ''} bg-red-100 border border-red-400 text-red-700 px-4 py-2 mt-5 rounded relative`} role="alert">
                        <span className="block sm:inline">{errorMessage}</span>
                    </div>

                    <div className={`${successMessage == null ? 'hidden' : ''} bg-green-50 border border-green-400 text-green-700 px-4 py-2 mt-5 rounded relative`} role="alert">
                        <span className="block sm:inline">{successMessage}</span>
                    </div>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Already have account?{' '}
                        <Link to="/login" className="font-semibold leading-6 text-[#28844b] underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}

export default Signup;