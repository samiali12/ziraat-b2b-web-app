import { Link } from "react-router-dom";
import LogoImage from "../../app/LogoImage";

import { RiDashboardFill } from 'react-icons/ri'

const navLinks = [
    { "name": "Dashboard", "link": "/seller/dashboard", icon: <RiDashboardFill /> },
    { "name": "Products", "link": "/seller/dashboard", icon: <RiDashboardFill /> },
    { "name": "Products", "link": "/seller/dashboard", icon: <RiDashboardFill /> }
]

const SellerSidebar = () => {
    return (
        <aside className="w-full bg-white p-4 z-10 overflow-auto">
            <h1>Ziraat</h1>
            <div className="mx-4 my-8">
                <h2 className="tracking-tight font-light uppercase ml-4 mt-8 mb-0">Dashboard</h2>
                <ul className="flex-col items-center justify-center">
                    {
                        navLinks.map((link) => (
                            <li className="px-2 py-4">
                                <Link to={link.link} className="flex items-center ml-4 space-x-3 text-[#000000]">
                                    <span className="mr-2">{link.icon}</span>
                                    {link.name}
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </aside>
    )
}

export default SellerSidebar;