import React, { useState } from 'react';
import { FiHome, FiBox, FiShoppingCart, FiUsers, FiUser, FiLogOut } from 'react-icons/fi'; // Import icons from react-icons
import { Link } from 'react-router-dom';


const Sidebar = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`fixed h-full ${isOpen ? 'w-60' : 'w-18'} border-r border-gray-300 border- text-gray-700 transition-all duration-1000 ease-in-out`}>
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

            <div className={`text-center my-2 ${isOpen ? 'block' : 'hidden'} `}>
                <img className="h-12 w-12 rounded-full border-4 border-white mx-auto my-2" src="https://randomuser.me/api/portraits/women/21.jpg" alt="" />
                <div className="py-1">
                    <h3 className="font-bold text-lg mb-1">Cait Genevieve</h3>
                </div>
            </div>

            <nav className={`mt-4 p-4`}>
                <ul>
                    <li className="mb-6">
                        <a href="#" className="p-2 flex items-center space-x-2 hover:bg-gray-100 hover:text-black transition-all duration-600 ease-in-out">
                            <FiHome className={`text-xl ${isOpen ? 'mr-6' : ''}`} /> {/* Home Icon */}
                            {isOpen ? <span>Dashboard</span> : null}
                        </a>
                    </li>
                    <li className="mb-6">
                        <Link to="/profile/212121212" className="p-2 flex items-center space-x-2 hover:bg-gray-100 hover:text-black transition-all duration-600 ease-in-out">
                            <FiUser className={`text-xl ${isOpen ? 'mr-6' : null}`} /> {/* Home Icon */}
                            {isOpen ? <span>Profile</span> : null}
                        </Link>
                    </li>
                    <li className="mb-6">
                        <a href="#" className="p-2 flex items-center space-x-2 hover:bg-gray-100 hover:text-black transition-all duration-600 ease-in-out">
                            <FiBox className={`text-xl ${isOpen ? 'mr-6' : null}`} /> {/* Added margin to the right of the icon */}
                            {isOpen ? <span>Product</span> : null}
                        </a>
                    </li>
                    <li className="mb-6">
                        <a href="#" className="p-2 flex items-center space-x-2 hover:bg-gray-100 hover:text-black transition-all duration-600 ease-in-out">
                            <FiShoppingCart className={`text-xl ${isOpen ? 'mr-6' : null}`} /> {/* Added margin to the right of the icon */}
                            {isOpen ? <span>Order</span> : null}
                        </a>
                    </li>
                    <li className="mb-6">
                        <a href="#" className="p-2 flex items-center space-x-2 hover:bg-gray-100 hover:text-black transition-all duration-600 ease-in-out">
                            <FiUsers className={`text-xl ${isOpen ? 'mr-6' : null}`} /> {/* Users Icon */}
                            {isOpen ? <span>Customers</span> : null} {/* Display text conditionally */}
                        </a>
                    </li>
                </ul>
            </nav>

            <div className={`mt-auto p-4 ${isOpen ? 'block' : 'hidden'}`}>

                {
                    isOpen ? (
                        <button className="bg-[#28844b] hover:bg-[#28844bee] text-white px-4 py-2 rounded-full w-full">
                            Logout
                        </button>
                    ) : (
                        <FiLogOut className="text-xl" />
                    )
                }

            </div>

        </div>
    );
};

export default Sidebar;