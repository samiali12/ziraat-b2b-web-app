import React, { useState } from "react";
import { Link } from "react-router-dom";

const menuItems = [
    { name: "Home", path: "/"},
    { name: "Profile", path: "/profile" },
    { name: "Settings", path: "/settings" },
    { name: "Logout", path: "/logout" },
];

const profileInfo = {
    name: "John Doe",
    email: "johndoe@example.com",
    avatar: "https://i.pravatar.cc/150?img=3",
};


const Dashboard = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const renderContent = () => {
        switch (window.location.pathname) {
            case "/profile":
                return (
                    <div className="flex flex-col items-center p-4">
                        <img
                            src={profileInfo.avatar}
                            alt="avatar"
                            className="w-32 h-32 rounded-full"
                        />
                        <h1 className="text-2xl font-bold mt-4">{profileInfo.name}</h1>
                        <p className="text-gray-600 mt-2">{profileInfo.email}</p>
                    </div>
                );
            case "/settings":
                return (
                    <div className="p-4">
                        <h1 className="text-2xl font-bold">Settings</h1>
                        <p className="text-gray-600 mt-4">Here you can change your preferences.</p>
                    </div>
                );
            case "/logout":
                return (
                    <div className="p-4">
                        <h1 className="text-2xl font-bold">Logout</h1>
                        <p className="text-gray-600 mt-4">Are you sure you want to logout?</p>
                    </div>
                );
            default:
                return (
                    <div className="p-4">
                        <h1 className="text-2xl font-bold">Home</h1>
                        <p className="text-gray-600 mt-4">Welcome to your dashboard.</p>
                    </div>
                );
        }
    };

    const [isOpen, setIsOpen] = useState(false);

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
                                active
                                className={`flex items-center px-4 py-2 hover:bg-gray-200 ${window.location.pathname === item.path
                                    ? "bg-gray-200 text-blue-600"
                                    : "text-gray-600"
                                    }`}
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex flex-col flex-grow overflow-auto">
                <div className="flex items-center justify-between h-16 px-8 border-b">
                    <h2 className="text-lg font-semibold">Dashboard</h2>
                    <div className="flex items-center space-x-4">
                        {/* Add more icons or buttons here */}
                    </div>
                </div>
                <div className="flex-grow p-6">{renderContent()}</div>
            </div>
        </div>
    );
};


export default Dashboard;