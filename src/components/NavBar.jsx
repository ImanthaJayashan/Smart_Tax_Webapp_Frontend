import React from 'react'
import { useNavigate } from "react-router-dom";

const NavBar = () => {
    const navigate = useNavigate();
    return (
        <header style={{ backgroundColor: '#2b2d78' }} className="text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo and Name */}
                <div className="flex items-center space-x-4">
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs7vZKGmx5-WlrJ-539bkuDt9Bz2gtG_CxrA&s"
                        alt="Tax Logo"
                        className="h-16 w-16 rounded-full border-2 border-white" // Circular logo with border
                    />
                    <h1 className="text-lg font-bold">Smart Tax Webapp</h1>
                </div>
                {/* Navigation Bar */}
                <nav className="flex justify-center items-center w-full space-x-6">
                    <ul className="flex space-x-6">
                        <li><a href="#" className="hover:text-gray-300">Home</a></li>
                        <li><a href="#" className="hover:text-gray-300">About</a></li>
                        <li><a href="#" className="hover:text-gray-300">Services</a></li>
                        <li><a href="#" className="hover:text-gray-300">Contact</a></li>
                    </ul>
                    {/* Search Bar */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="py-2 px-4 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                    </div>
                    {/* profile icon */}
                    <div className="flex items-center space-x-1" onClick={() => navigate("/profile")}>
                        <svg class="w-[45px] h-[45px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.4" d="M15 9h3m-3 3h3m-3 3h3m-6 1c-.306-.613-.933-1-1.618-1H7.618c-.685 0-1.312.387-1.618 1M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm7 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
                        </svg>

                        <span className="text-white">Profile</span>
                    </div>

                    {/* Tax Learning Hub Button */}
                    <div className="absolute right-4">
                        <button
                            style={{ backgroundColor: '#eeb029' }}
                            className="hover:opacity-90 text-white py-2 px-4 rounded"
                        >
                            Tax Learning Hub
                        </button>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default NavBar