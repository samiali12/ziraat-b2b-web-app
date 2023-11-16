import React, { useState } from "react";
import { Link } from "react-router-dom";

const menuItems = [
    { name: "Dashboard", path: "/seller/dashboard" },
    { name: "Products", path: "/seller/products" },
    { name: "Settings", path: "dashboard/settings" },
    { name: "Logout", path: "dashboard/logout" },
];


const DashboardSidebar = () => {


    const [isOpen, setIsOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };


    return (
        <div className="flex h-screen bg-gray-100">
            <div className="flex flex-col w-64 bg-white shadow-lg">
                <div className="flex items-center justify-between h-16 px-4 border-b">
                    <h1 className="text-xl font-bold">Dashboard</h1>
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
                </div>
                <ul
                    className={`${isMenuOpen ? "block" : "hidden lg:block"
                        } flex flex-col py-4`}
                >
                    {menuItems.map((item) => (
                        <li key={item.name}>
                            <Link
                                to={item.path}
                                active
                                className={`flex items-center m-2 px-4 py-2  hover:text-white hover:bg-[#28844b] ${window.location.pathname === item.path
                                    ? "bg-[#28844b] text-white"
                                    : "text-gray-600"
                                    }`}
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default DashboardSidebar;