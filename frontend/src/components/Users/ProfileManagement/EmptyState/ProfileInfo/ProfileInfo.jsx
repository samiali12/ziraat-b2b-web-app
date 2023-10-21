import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import DropDownProfileMenu from "../../../ProfileDropDownMenu/DropDownProfileMenu";
import useUserDetails from '../../../../../hooks/users/useUserDetails';
import useAuthentication from '../../../../../hooks/auth/useAuthentication';
import { FaUserCircle } from 'react-icons/fa';
import { updateUserProfile } from '../../../../../features/UserManagementFeatures/userManageSlice';
import DashboardProfileMenu from '../../../ProfileDropDownMenu/DashboardProfileMenu';

let imagePlaceHolder = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAlgMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQYCAwQBB//EADAQAAICAQIEAwcDBQAAAAAAAAABAgMEETEFIUFRElJxEyIjMmFywUKRsRUzgZLR/8QAFwEBAQEBAAAAAAAAAAAAAAAAAAIBA//EABwRAQEBAQACAwAAAAAAAAAAAAABAhESMSFBUf/aAAwDAQACEQMRAD8A+4gAAAAAAAGLkorVtJd2cGbxONLddOk7Fu+kSIuusvets3J/XYqYtZ1Pyz8WL0d0f8czZTkU3f2rIy9GVg9TaaabTWzRXhGdWsFd/qGXpp7Z/wCq/wCGyriuTB++1YuzWhnhW9TwOfFyq8qGtb5reL3R0ENAAAAAAAAAAAAAAjOK5jr+BU9Jte8+yJC2arrlN7RWpWJzdk3Ob1k3qysTrLWIAOqQAAAABsx7pY9qshuunddiy0zjbVGcPlktUVYmeCW+KidT3g9V6MjcbEmADmoAAAAAAAAAAGjNWuJal5GVotVkVKEovZrQq2jXJ7rky8JrwAHRgAAAAAEjwSWmROPeH5I4keCR1yZvtD8k69ETYAOSwAAAAAAAAAAeMrOTKEsiyVfyuTaLMyqyi4ylF7p6MvCa8AB0YAAAAABMcEUPZWNfP4l4vToQ5McDi/Z2y6OSSJ16bEoADkoAAAAAAAAAAAgOLUOrKc9Pds5r16k+YW1Qtg42RUk+jNl5WVVgZ3Vum2Vct4vQwOyQAAAAAW6S3LHw+l0YsISWkt5epw8FojLx2yinzSjquxLnPV+lSAAIaAAAAAAAAAAAAAIrjGL4oq+C5x5S9O5EFk4g9MK77StnTF+E0ABbAyrhKycYRWspPRGJvweWZT9xlFgxqVRTGuO0UbQDisAAAAAAAAAAAAAADzX6gcXGJ+HClHrJpfkgTt4nlrItUYc64bPuziOuZyJoACmBnXLwWRn5WmYAC1p6npH8Ky1bUqptKyC/dEgcLOLAAAAAAAAAAAPG0lq3ojhzOJVUNwh8SxdOi9SIyMm7IfxZaryrkkVM2s6l8jilNfKtOx/Tb9yLyc2/ITU2lHyx2OYFzMjOgAKYAAAAAPU2mmt0d9HFbq+VqVi77MjwZZKLDj8Qx7+Sk4y7S5HVqVQ6cfOvx9FGTlDyy2JuPxvVjBx4mfVkNR+Szyv8HYc+cUAAARXFc2UZOip+F/rkt/QlJNRi29lzZVrJuyyU5fNJ6srM6y1j00AB1SAAAAAAAAAAAAAAAAEvwvOlZNUXPWX6Zd/oRBuxJeHKql2mjNTsIswAOK2nMemLa15H/BWQDphNAAWwAAAAAAAAAAAAAAAAMquVsPuX8gCkWoAHBb//2Q=="

const ProfileInfo = () => {

    const dispatch = useDispatch()
    const [userDetails, setUserDetails] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [updatedUser, setUpdatedUser] = useState({});
    const [IsLoading, setIsLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isDataUpdated, setIsDataUpdated] = useState(false);
    const [imageFile, setImageFile] = useState(null)


    // Use the useUserDetails hook to fetch user details and handle errors
    const { user, isSuccess, isError, error } = useUserDetails()

    const { authenticated, userId } = useAuthentication();

    // Function to display success message and hide it after a delay
    const displaySuccessMessage = () => {
        setIsDataUpdated(true);

        // Reset the state after 3 seconds (adjust the delay as needed)
        setTimeout(() => {
            setIsDataUpdated(false);
        }, 3000); // 3 seconds
    };

    const handleEditClick = () => {
        console.log(user)
        setIsEditing(true);
        setUpdatedUser({ ...user.user });
    };

    const handleCancelClick = () => {
        setIsEditing(false);
    };


    const handleSaveClick = async () => {
        try {

            setIsLoading(true); // Set loading state to true;

            if (imageFile) {

                const imageData = new FormData()
                imageData.append("file", imageFile)

                console.log(imageData)

                // Use Axios for the POST request
                const cloudinaryResponse = await axios.post('http://localhost:8000/api/v1/cloudinary-upload', imageData, {
                    headers: {
                        'Content-Type': 'multipart/form-data', // Set the content type for form data
                    },
                });

                if (cloudinaryResponse.status === 200) {
                    const cloudinaryData = cloudinaryResponse.data;
                    const cloudinaryImageUrl = cloudinaryData.secure_url;
                    const cloudinaryImagePublicId = cloudinaryData.public_id

                    // Update the image URL in the user profile data
                    setUpdatedUser((prevUser) => ({
                        ...prevUser,
                        profilePicture: {
                            image_url: cloudinaryImageUrl,
                            public_id: cloudinaryImagePublicId
                        },
                    }));
                } else {
                    console.error('Cloudinary image upload failed');
                    // Handle the error (e.g., display an error message)
                }
            }

            // Dispatch the updateUserProfile action with userId and formData
            const action = await dispatch(updateUserProfile({ userId: userId, formData: updatedUser }));

            setIsEditing(false);
            setIsLoading(false); // Set loading state to false

            // Check if the action was fulfilled successfully
            if (updateUserProfile.fulfilled.match(action)) {
                const responseData = action.payload; // Access the data returned by the action
                const isSuccess = responseData.success; // Check the success property
                // Handle success
                if (isSuccess) {
                    // Data was updated successfully, you can show a success message
                    displaySuccessMessage();
                } else {
                    // Handle the case where success is false (update failed)
                    console.error('Data update failed:', responseData.message);
                }
            }
        } catch (error) {
            console.error('Error saving user data:', error);
            setIsEditing(false);
            setIsLoading(false); // Set loading state to false in case of an error
            // Show an error message to the user (you can implement this part)
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
            setImageFile(file)
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


    // Render the profile picture based on edit mode and profile data
    const renderProfilePicture = () => {

        if (updatedUser.profilePicture && updatedUser.profilePicture.image_url) {

            return (
                <img
                    src={updatedUser.profilePicture.image_url}
                    alt="Profile"
                    className="w-30 h-30 md:w-20 md:h-20 object-cover rounded-full m-4 ring ring-[#28844b]"
                />
            );
        } else if (user?.user && user?.user.profilePicture && user?.user.profilePicture.image_url) {

            return (
                <img
                    src={user?.user?.profilePicture?.image_url}
                    alt="Profile"
                    className="w-30 h-30 md:w-20 md:h-20 object-cover rounded-full m-4 ring ring-[#28844b]"
                />
            );
        } else {

            return (
                <img
                    alt="ProfileSecond"
                    className="w-30 h-30 md:w-20 md:h-20 object-cover rounded-full m-4 ring ring-[#28844b]"
                    src={imagePlaceHolder}
                />
            );
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
                {isDataUpdated && (
                    <div
                        className="absolute z-10 top-3 left-0 right-0 bg-[#2fa55cec]  text-white text-center p-4 rounded-md shadow-md mt-4 transform -translate-y-8 transition-transform ease-in-out duration-1000"
                    >
                        User Profile is updated successfully.
                    </div>
                )}
                <div className="flex items-center justify-between h-16 px-8 border-b">
                    <h2 className="text-lg font-semibold">Profile Information</h2>
                    <div className="flex items-center space-x-4 p-4">

                        <DashboardProfileMenu userId={userId} />
                    </div>
                </div>
                <div>
                    <div className="flex-grow p-6">
                        {/* Your content when userId is not defined */}

                        <div className="mx-auto py-6 px-8">

                            <div className="md:flex md:items-center justify-between md:space-x-4 border shadow-lg">


                                <div className="flex items-center">

                                    {renderProfilePicture()}


                                    <div className="flex ml-4">
                                        {isEditing ? (

                                            <div className="flex">
                                                <input
                                                    id="profilePicture"
                                                    type="file"
                                                    name="file"
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

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10  shadow-lg border p-6">
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
                                            value={user?.user?.fullName || ''}
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
                                            value={user?.user?.email || ''}
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
                                                value={user?.user?.phoneNumber || ''}

                                                readOnly
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
                                                value={user?.user?.companyName || ''}
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