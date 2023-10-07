import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import DropDownProfileMenu from "../../../ProfileDropDownMenu/DropDownProfileMenu";
import useUserDetails from '../../../../../hooks/users/useUserDetails';
import useAuthentication from '../../../../../hooks/auth/useAuthentication';
import { FaUserCircle } from 'react-icons/fa';

let imagePlaceHolder = "https://www.bing.com/images/blob?bcid=qCCzbgX-ZCoG9BZPAkcRKKceWo7p.....5E"

const ProfileInfo = () => {

    const dispatch = useDispatch()
    const [userDetails, setUserDetails] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [updatedUser, setUpdatedUser] = useState({});

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Use the useUserDetails hook to fetch user details and handle errors
    const { user, isSuccess, isError, error } = useUserDetails()

    const { authenticated, userId } = useAuthentication();

    const handleEditClick = () => {
        console.log(user.user)
        setIsEditing(true);
        setUpdatedUser({ ...user.user });
    };

    const handleCancelClick = () => {
        setIsEditing(false);
    };

    const handleSaveClick = async () => {
        try {

        } catch (error) {
            console.error('Error saving user data:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedUser({
            ...updatedUser,
            [name]: value,
        });
    };

    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // You can use this file for further processing (e.g., uploading to the server)
            // For now, let's update the state to display the selected image (you might need additional code to handle image uploads)
            const reader = new FileReader();
            reader.onload = (e) => {
                const image_url = e.target.result;
                setUpdatedUser({
                    ...updatedUser,
                    profilePicture: {
                        image_url,
                    },
                });
            };
            reader.readAsDataURL(file);
        }
    };



    const logoutUser = () => {
        dispatch(logoutUser())
    }

    return (

        (userId === null) ? (
            // If userId is defined, render the component for that case
            <div>
                {/* Your content when userId is defined */}
            </div>
        ) : (
            // If userId is not defined, render the component for the else case
            <div className="flex flex-col flex-grow overflow-auto ">
                <div className="flex items-center justify-between h-16 px-8 border-b">
                    <h2 className="text-lg font-semibold">Profile Information</h2>
                    <div className="flex items-center space-x-4">

                        <DropDownProfileMenu userId={userId} />
                    </div>
                </div>
                <div className="flex-grow p-6">
                    {/* Your content when userId is not defined */}

                    <div className="mx-auto py-6 px-8">

                        <div>
                            <div className="md:flex md:items-center justify-between md:space-x-4 shadow-lg">


                                <div className="flex items-center">
                                    {user?.profilePicture?.image_url ? (
                                        <img
                                            src={user.user?.profilePicture?.image_url}
                                            alt="Profile"
                                            className="w-20 h-20 md:w-32 md:h-32 object-cover rounded-full ml-4"
                                        />
                                    ) : (
                                        <img
                                        alt="Profile"
                                        className="w-20 h-20 md:w-20 md:h-20 object-cover rounded-full m-4"
                                        src={updatedUser.profilePicture?.image_url || imagePlaceHolder}

                                    />)}
                                   
                                    <div className="flex ml-4">
                                        {isEditing ? (

                                            <div className="flex">
                                                <input
                                                    id="profilePicture"
                                                    type="file"
                                                    name="profilePicture"
                                                    accept="image/*"
                                                    onChange={handleProfilePictureChange}
                                                    className="hidden"
                                                    style={{
                                                        display: 'none', // Hide the default button
                                                    }}
                                                />
                                                <label
                                                    htmlFor="profilePicture"
                                                    className="cursor-pointer bg-[#35aa62] text-white px-4 py-2 rounded whitespace-nowrap"
                                                >
                                                    Upload Image
                                                </label>


                                            </div>



                                        ) : null}
                                    </div>
                                </div>

                                {/* Buttons */}
                                <div className="md:w-1/2 text-center flex mr-10">
                                    {isEditing ? (
                                        <>
                                            <button
                                                className="bg-[#35aa62] text-white px-4 py-2 rounded mr-2"
                                                onClick={handleSaveClick}
                                            >
                                                Save
                                            </button>
                                            <button
                                                className="bg-[#28844b] text-white px-4 py-2 rounded"
                                                onClick={handleCancelClick}
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            className="bg-[#35aa62] text-white px-4 py-2 rounded"
                                            onClick={handleEditClick}
                                        >
                                            Edit Profile
                                        </button>
                                    )}
                                </div>


                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10  shadow-lg p-6">
                                <div className="mb-4">
                                    <label className="block text-gray-600">Full Name</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={updatedUser.fullName || ''}
                                            onChange={handleInputChange}
                                            className="form-input w-full"
                                        />
                                    ) : (
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={user.user?.fullName || ''}
                                            readOnly
                                            className="form-input w-full"
                                        />
                                    )}
                                </div>

                                <div className="mb-4 ">
                                    <label className="block text-gray-600">Email</label>
                                    {isEditing ? (
                                        <input
                                            type="email"
                                            name="email"
                                            value={updatedUser.email || ''}
                                            onChange={handleInputChange}
                                            className="form-input w-full"
                                        />
                                    ) : (
                                        <input
                                            type="email"
                                            name="email"
                                            value={user.user?.email || ''}
                                            readOnly
                                            className="form-input w-full"
                                        />
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-600">Phone Number</label>
                                    {
                                        isEditing ? (
                                            <input
                                                type="text"
                                                name="phoneNumber"
                                                value={updatedUser.phoneNumber || ''}
                                                onChange={handleInputChange}
                                                readOnly={!isEditing}
                                                className="form-input w-full"
                                            />
                                        ) : (
                                            <input
                                                type="text"
                                                name="phoneNumber"
                                                value={user.user?.phoneNumber || ''}
                                                onChange={handleInputChange}
                                                readOnly={!isEditing}
                                                className="form-input w-full"
                                            />
                                        )
                                    }

                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-600">Company Name</label>
                                    {
                                        isEditing ? (
                                            <input
                                                type="text"
                                                name="companyName"
                                                value={updatedUser.companyName || ''}
                                                onChange={handleInputChange}
                                                readOnly={!isEditing}
                                                className="form-input w-full"
                                            />
                                        ) : (
                                            <input
                                                type="text"
                                                name="companyName"
                                                value={user.user?.companyName || ''}
                                                onChange={handleInputChange}
                                                readOnly={!isEditing}
                                                className="form-input w-full"
                                            />
                                        )
                                    }

                                </div>

                                <div id="location" className="">
                                    <label className="block text-gray-600 mb-4">Location</label>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {/* Country Select */}
                                        <div className="mb-4">
                                            <label className="block text-gray-600 mb-1">Country</label>
                                            <select
                                                name="country"
                                                value={updatedUser.country || ''}
                                                onChange={handleInputChange}
                                                className="form-select w-full"
                                                disabled={!isEditing}
                                            >
                                                <option value="USA">USA</option>
                                                <option value="Canada">Canada</option>
                                                {/* Add more country options as needed */}
                                            </select>
                                        </div>

                                        {/* City Select */}
                                        <div className="mb-4">
                                            <label className="block text-gray-600 mb-1">City</label>
                                            <select
                                                name="city"
                                                value={updatedUser.city || ''}
                                                onChange={handleInputChange}
                                                className="form-select w-full"
                                                disabled={!isEditing}
                                            >
                                                <option value="New York">New York</option>
                                                <option value="Los Angeles">Los Angeles</option>
                                                {/* Add more city options as needed */}
                                            </select>
                                        </div>

                                        {/* State Select */}
                                        <div className="mb-4">
                                            <label className="block text-gray-600 mb-1">State</label>
                                            <select
                                                name="state"
                                                value={updatedUser.state || ''}
                                                onChange={handleInputChange}
                                                className="form-select w-full"
                                                disabled={!isEditing}
                                            >
                                                <option value="New York">New York</option>
                                                <option value="California">California</option>
                                                {/* Add more state options as needed */}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        )
    )
}

export default ProfileInfo;