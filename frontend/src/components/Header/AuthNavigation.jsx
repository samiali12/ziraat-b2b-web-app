import React, { useEffect, useState } from 'react'
import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import LogoImage from '../../assets/img/website-logo.png';
import axios from 'axios';
import DropdownProfileMenu from '../Users/ProfileDropDownMenu/DropDownProfileMenu';
import SearchBar from '../component/SearchBar';




function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


const AuthNavigation = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState(null)

    useEffect(() => {
        // Check authentication status when the component mounts
        const checkAuthentication = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/v1/auth/check-auth',
                    { withCredentials: true });
                // Assuming your API returns a status or data indicating authentication status
                if (response.data.isAuthenticated) {
                    setIsAuthenticated(true)
                    setUserId(response.data.userId)
                }

            } catch (error) {

            }
        };

        checkAuthentication();
    }, []);

    return (
        <Disclosure as="nav" className="bg-white py-6">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-10  shadow-lg">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-[#28844b] hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:justify-start">
                                <div className="flex flex-shrink-0 items-center">
                                    <img
                                        className="h-12 w-auto"
                                        src={LogoImage}
                                        alt="Ziraat-B2B"
                                    />
                                </div>

                                <div className="flex-1">
                                    <SearchBar />

                                </div>

                            </div>

                            {
                                isAuthenticated ? (
                                    <DropdownProfileMenu userId={userId} />
                                ) : (

                                    <div className="hidden md:flex items-center space-x-6">


                                        <Link
                                            to="/login"
                                            className="text-black
                                    rounded-md px-3 py-2 text-base font-semibold">
                                            Login
                                        </Link>
                                        <Link
                                            to="/signup"
                                            className="text-[#28844b] border border-[#28844b] hover:bg-[#28844bdc] hover:text-white
                                    rounded-md px-3 py-2 text-base font-semibold">
                                            Sign up
                                        </Link>
                                    </div>

                                )
                            }


                        </div>
                    </div>
                </>
            )
            }
        </Disclosure >
    )
}


export default AuthNavigation;