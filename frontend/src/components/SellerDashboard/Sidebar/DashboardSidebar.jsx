import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { RiShoppingBag3Fill } from "react-icons/ri";
import { BsChatQuoteFill } from "react-icons/bs";


const menuItems = [
    { name: "Dashboard", path: "/seller/dashboard", icon: <MdDashboard /> },
    { name: "Products", path: "/seller/products", icon: <RiShoppingBag3Fill />},
    { name: "Quote", path: "/seller/quotesList", icon: <BsChatQuoteFill />},
];

const DashboardSidebar = () => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`flex-col w-64 h-screen bg-white shadow-lg transition-all duration-500`}>
        
                <div className="overflow-y-auto">
                    <div className="flex items-center justify-between h-16 px-4 border-b">
                        <h1 className="text-xl font-bold transition-opacity duration-500">Dashboard</h1>
                        <div className="p-4">
                            {/* <button onClick={toggleSidebar} className="text-gray-500 focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    {!isOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    )}
                                </svg>
                            </button> */}
                        </div>
                    </div>
                    <ul className="flex flex-col py-4 ">
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
                                    {item?.icon}
                                    <span className={`mr-2 transition-opacity duration-500 ${isOpen ? '' : 'opacity-0'}`}></span>
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
