import useAuthentication from "../../../../../hooks/auth/useAuthentication";
import useUserDetails from "../../../../../hooks/users/useUserDetails";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import DashboardProfileMenu from "../../../ProfileDropDownMenu/DashboardProfileMenu";
import { useForm } from "react-hook-form";
import { updatePassword } from "../../../../../features/authFeatures/authSlice";

const PasswordSetting = () => {


    // Use the useUserDetails hook to fetch user details and handle errors
    const { user, isSuccess, isError, error } = useUserDetails()
    const { authenticated, userId } = useAuthentication(); // Use the authentication custom hook


    const { register, handleSubmit, watch, formState: { errors } } = useForm()

    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)
    const [userData, setUserData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' })

    const dispatch = useDispatch()

    const { } = useSelector

    const onSubmit = async (data) => {

        if (userId) {

            try {
                const response = await axios.put(`http://localhost:8000/api/v1/users/update-password/${userId}`, userData)

                console.log(response.data)
                if (response.data.success) {
                    setSuccessMessage(response.data.message)
                }
            }
            catch (error) {
                console.log(error.response.data)
                setErrorMessage(error.response.data.message)
            }

        }

    }

    const handleChanges = (event) => {
        const { name, value } = event.target;

        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        setErrorMessage(null)
        setSuccessMessage(null)
    }


    return (

        (userId === null) ? (
            <div>

            </div>
        ) : (
            <div className="flex flex-col flex-grow overflow-auto ">
                <div className="flex items-center justify-between h-16 px-8 border-b">
                    <h2 className="text-lg font-semibold">Password Setting</h2>
                    <div className="flex items-center space-x-4 p-4">

                        <DashboardProfileMenu userId={userId} />
                    </div>
                </div>
                <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">

                    <div className="sm:mx-auto sm:w-full sm:max-w-md">
                        <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-700">Change Your Password</h2>
                    </div>

                    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                        <div className="bg-white py-8 px-4 shadow-lg border sm:rounded-lg sm:px-10">

                            <div className={`${errorMessage == null ? 'hidden' : ''} bg-red-100 border border-red-400 text-red-700 px-4 py-2 mt-5 rounded relative`} role="alert">
                                <span className="block sm:inline">{errorMessage}</span>
                            </div>
                            <div className={`${successMessage == null ? 'hidden' : ''} bg-green-50 border border-green-400 text-green-700 px-4 py-2 mt-5 rounded relative`} role="alert">
                                <span className="block sm:inline">{successMessage}</span>
                            </div>


                            <form noValidate onSubmit={handleSubmit(onSubmit)} className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                                <div className="mb-4">
                                    <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 mb-2">
                                        Current Password
                                    </label>
                                    <input
                                        id="current-password"
                                        name="currentPassword"
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        type="password"
                                        value={userData.currentPassword}
                                        onChange={handleChanges}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-2">
                                        New Password
                                    </label>
                                    <input
                                        {...register("newPassword", {
                                            required: "Password is required",
                                            pattern: {
                                                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                                                message: ` - Password must contain at least one special character 
                                    one number \n
                                    - one capital letter \n
                                    - be at least 8 characters long`
                                            }

                                        })}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        name="newPassword"
                                        id="new-password"
                                        type="password"
                                        value={userData.newPassword}
                                        onChange={handleChanges}
                                    />
                                </div>
                                {
                                    errors.newPassword && (
                                        <p className="text-red-500">{errors.newPassword.message}</p>
                                    )
                                }
                                <div className="mb-4">
                                    <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-2">
                                        Confirm Password
                                    </label>
                                    <input
                                        {...register("confirmPassword", {
                                            required: "Confirm password is required",
                                            validate: (value, formValues) => value == formValues.newPassword || "Password does not match"
                                        })}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        name="confirmPassword"
                                        id="confirm-password"
                                        type="password"
                                        value={userData.confirmPassword}
                                        onChange={handleChanges}
                                    />
                                    {
                                        errors.confirmPassword && (
                                            <p className="text-red-500">{errors.confirmPassword.message}</p>
                                        )
                                    }
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#28844b] focus:outline-none focus:ring-2 focus:ring-offset-2"
                                    >
                                        Change Password
                                    </button>
                                </div>
                            </form>

                        </div>
                    </div>

                </div>
            </div>
        )

    )
}

export default PasswordSetting;