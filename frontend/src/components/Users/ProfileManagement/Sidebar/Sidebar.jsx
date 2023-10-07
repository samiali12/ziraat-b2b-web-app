import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Switch, Link, useParams } from 'react-router-dom';
import { FaUser, FaKey, FaBell, FaCog } from 'react-icons/fa';
import LogoImage from '../../../../app/LogoImage';

const menuItems = [
    { name: "Profile", path: "/user/profile/my-profile", icon: <FaUser className='text-gray-700 hover:text-black mr-2' /> },
    { name: "Password Change", path: "/user/profile/password-change", icon: <FaKey className='text-gray-700 hover:text-black mr-2' /> },
    { name: "Notification", path: "/user/profile/notification", icon: <FaBell className='text-gray-700 hover:text-black mr-2' /> },
    { name: "Settings", path: "/user/profile/settings", icon: <FaCog className='text-gray-700 hover:text-black mr-2' /> },
];


const Sidebar = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [activeLink, setActiveLink] = useState(null);

    const handleLinkClick = (linkName) => {
        setActiveLink(linkName);
    };

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };


    return (

        <div className={`h-screen flex bg-orange-600 ${isOpen ? 'w-60' : 'w-10'} border-gray-300 border-r text-gray-700 transition-all duration-700 ease-in-out`}>
            <div className="flex flex-col w-64 bg-white">
                <div className="flex items-center h-16 px-4 border-b">

                    <div className={`p-4  ${isOpen ? 'text-start' : 'text-center'}`}>
                        <button onClick={toggleSidebar} className="text-gray-500 focus:outline-none">
                            {isOpen ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                    <LogoImage />
                </div>

                <nav className={`mt-4 px-6 ${isOpen ? 'transition-all duration-700 ease-in-out' : 'hidden'}`}>

                    <ul>

                        {
                            menuItems.map((item) => (
                                <li className="mb-2" key={item.path}>
                                    <Link to={item.path} className={`p-2 flex items-center space-x-2 hover:bg-gray-100 hover:text-black transition-all duration-600 ease-in-out 
                                    ${window.location.pathname === item.path ? 'bg-gray-100 text-black' : ''}
                                    `}
                                    >
                                        {item.icon}
                                        <span>{item.name}</span>
                                    </Link>
                                </li>
                            ))
                        }

                    </ul>
                </nav>
            </div>
        </div >
    )
}

export default Sidebar;