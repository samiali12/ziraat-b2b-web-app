import React, { useEffect, useState, } from 'react';
import { Controller, set, useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LogoImage from '../../../../app/LogoImage';
import MetaData from '../../../../app/MetaData';

const SupplierForm = () => {

    const [userData, setUserData] = useState({
        firstName: '', lastName: '', email: '',
        password: '',
        companyName: '', phoneNo: '',
        location: { country: '', state: '', city: '' }

    })

    const { control, register, handleSubmit, watch, formState: { errors } } = useForm();


    const { user, isError, isSuccess, isLoading, message } = useSelector(state => state.auth)

    const handleChanges = (event) => {

        const { name, value } = event.target;

        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

    }

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <>
            <MetaData title="Supplier Sign up" />
            <div className="flex flex-col lg:flex-row">
                {/* Left Section: Image */}
                <div className="lg:w-1/2 bg-gray-200 flex justify-center items-center">
                    <img
                        src="https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
                        alt="Signup"
                        className="w-full h-auto object-cover"
                    />
                </div>
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-5 lg:px-8">

                    <LogoImage title="Register to become supplier on Ziraat-B2B" />
                    <form noValidate className="w-full max-w-lg mx-auto mt-10" onSubmit={handleSubmit(onSubmit)} method="POST">
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
                                    First Name
                                </label>
                                <div className="mt-2">
                                    <input

                                        {...register("firstName", {
                                            required: "First Name is required",
                                        })}
                                        id="firstName"
                                        name="firstName"
                                        value={userData.firstName}
                                        onChange={handleChanges}
                                        type="text"
                                        autoComplete="firstName"
                                        required
                                        placeholder='E.g Sami'
                                        className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-gray-500 sm:text-sm sm:leading-6"
                                    />
                                    {
                                        errors.firstName && (
                                            <p className="text-red-500">{errors.firstName.message}</p>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0">
                                <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">
                                    Last Name
                                </label>
                                <div className="mt-2">
                                    <input

                                        {...register("lastName", {
                                            required: "Last Name is required",
                                        })}
                                        id="lastName"
                                        name="lastName"
                                        value={userData.lastName}
                                        onChange={handleChanges}
                                        type="text"
                                        autoComplete="lastName"
                                        required
                                        placeholder='E.g Ali'
                                        className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-gray-500 sm:text-sm sm:leading-6"
                                    />
                                    {
                                        errors.lastName && (
                                            <p className="text-red-500">{errors.lastName.message}</p>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email
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
                                        value={userData.email}
                                        onChange={handleChanges}
                                        type="email"
                                        autoComplete="email"
                                        required
                                        placeholder='E.g samiali@example.com'
                                        className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-gray-500  sm:text-sm sm:leading-6"
                                    />
                                    {
                                        errors.email && (
                                            <p className="text-red-500">{errors.email.message}</p>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
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
                                        value={userData.password}
                                        onChange={handleChanges}
                                        type="password"
                                        autoComplete="password"
                                        required
                                        placeholder='Type password'
                                        className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-gray-500 sm:text-sm sm:leading-6"
                                    />
                                    {
                                        errors.password && (
                                            <p className="text-red-500">{errors.password.message}</p>
                                        )
                                    }
                                </div>
                            </div>

                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
                                    Confirm Password
                                </label>
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
                                        placeholder='Type confirm password'
                                        className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-gray-500 sm:text-sm sm:leading-6"
                                    />
                                    {
                                        errors.confirmPassword && (
                                            <p className="text-red-500">{errors.confirmPassword.message}</p>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label htmlFor="companyName" className="block text-sm font-medium leading-6 text-gray-900">
                                    Company Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        {...register("companyName", {
                                            required: "company name is required",
                                        })}
                                        id="companyName"
                                        name="companyName"
                                        type="text"
                                        onChange={handleChanges}
                                        value={userData.companyName}
                                        required
                                        placeholder='E.g Agro Market Place'
                                        className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-gray-500 sm:text-sm sm:leading-6"
                                    />
                                    {
                                        errors.companyName && (
                                            <p className="text-red-500">{errors.companyName.message}</p>
                                        )
                                    }
                                </div>
                            </div>

                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label htmlFor="phoneNo" className="block text-sm font-medium leading-6 text-gray-900">
                                    Phone No
                                </label>
                                <div className="mt-2">
                                    <input
                                        {...register("phoneNo", {
                                            required: "Phone No is required",
                                        })}
                                        id="phoneNo"
                                        name="phoneNo"
                                        type="text"
                                        required
                                        onChange={handleChanges}
                                        value={userData.phoneNo}
                                        placeholder='E.g +(92) 3449543'
                                        className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-gray-500 sm:text-sm sm:leading-6" />
                                    {
                                        errors.confirmPassword && (
                                            <p className="text-red-500">{errors.phoneNo.message}</p>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                    Country
                                </label>
                                <div className="relative mt-2">

                                    <Controller
                                        name="country"
                                        control={control}
                                        defaultValue={userData.location.country}
                                        rules={{ required: 'Please select a country' }}
                                        render={({ field }) => (
                                            <select
                                                {...field}
                                                value={userData.location.country}
                                                onChange={(e) => setUserData({
                                                    ...userData,
                                                    location: { ...userData.location, country: e.target.value }
                                                })}
                                                className="block appearance-none w-full border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            >
                                                <option value="Pakistan">Pakistan</option>
                                                <option value="UK">UK</option>
                                                {/* Add more country options here */}
                                            </select>
                                        )}
                                    />
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                                    State
                                </label>
                                <div className="relative mt-2">
                                    <Controller
                                        name="state"
                                        control={control}
                                        defaultValue={"Punjab"}
                                        rules={{ required: 'Please select a state' }}
                                        render={({ field }) => (
                                            <select
                                                {...field}
                                                value={userData.location.state}
                                                onChange={(e) => setUserData({
                                                    ...userData,
                                                    location: { ...userData.location, state: e.target.value }
                                                })}
                                                className="block appearance-none w-full border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            >
                                                <option value="Pakistan">Punjab</option>
                                                <option value="UK">Karachi</option>
                                                {/* Add more country options here */}
                                            </select>
                                        )}
                                    />
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                    City
                                </label>
                                <div className="relative mt-2">
                                    <Controller
                                        name="city"
                                        control={control}
                                        defaultValue={"Islamabad"}
                                        rules={{ required: 'Please select a city' }}
                                        render={({ field }) => (
                                            <select
                                                {...field}
                                                value={userData.location.city}
                                                onChange={(e) => setUserData({ ...userData, location: { ...userData.location, city: e.target.value } })}
                                                className="block appearance-none w-full border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            >
                                                <option value="Pakistan">Islamabad</option>
                                                <option value="UK">Rawalpindi</option>
                                                {/* Add more country options here */}
                                            </select>
                                        )}
                                    />
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="flex items-center mt-5">

                            <label
                                htmlFor="link-checkbox"
                                className="flex items-center text-sm font-medium text-gray-500">

                                <Controller
                                    name="myCheckbox"
                                    control={control}
                                    defaultValue={false} // Set default value to false
                                    rules={{ required: 'You must agree to the terms and conditions' }}
                                    render={({ field }) => (
                                        <input
                                            type="checkbox"
                                            id="link-checkbox"
                                            value=""
                                            className="w-4 h-4 mr-1 text-blue-600 bg-gray-100 border-gray-300 rounded"
                                            {...field}
                                        />
                                    )}
                                />
                                I agree with the
                                <a href="#" className="ml-1 text-blue-600 hover:underline">
                                    terms and conditions
                                </a>.
                            </label>

                        </div>
                        {
                            errors.myCheckbox && (
                                <p className="text-red-500">{errors.myCheckbox.message}</p>
                            )
                        }

                        <div>
                            <button
                                type="submit"
                                className={`${isLoading ? 'hidden' : ''} w-full justify-center rounded-md bg-[#28844b] px-3 py-1.5 mt-5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                            >
                                Sign up
                            </button>

                            <button
                                disabled={isLoading ? true : false}
                                type="submit"
                                className={`${isLoading ? '' : 'hidden'} w-full justify-center rounded-md bg-[#28844b] px-3 py-1.5 mt-5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                            >
                                <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                </svg>

                            </button>
                        </div>

                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Already have account?{' '}
                        <Link to="/login" className="font-semibold leading-6 text-[#28844b] underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}

export default SupplierForm;