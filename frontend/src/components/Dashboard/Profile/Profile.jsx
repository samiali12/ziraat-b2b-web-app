import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const Profile = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`fixed h-full ${isOpen ? 'w-60' : 'w-18'} border-r border-gray-300 border- text-gray-700 transition-all duration-1000 ease-in-out`}>
        
        
        </div>
    )
}

export default Profile;