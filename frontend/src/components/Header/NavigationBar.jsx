import { React, useState } from 'react'
import websiteLogo from '../../assets/img/website-logo.png'

const NavigationBar = () => {

    return (

        <nav class="bg-white">
            <div class="flex p-4 max-auto max-w-7xl m-0 items-center justify-between">

                <div class="ml-8">
                    <a class="" href="">
                        <img class="w-40" src={websiteLogo} alt="Workflow" />
                    </a>
                </div>


                <div class="hidden md:block">
                    <div class="flex items-baseline ml-10 space-x-4">
                        <a class="text-gray-600  hover:text-[#28844b]  px-3 py-2 rounded-md text-base font-medium" href="/#">
                            Home
                        </a>
                        <a class="text-gray-600  hover:text-[#28844b]  px-3 py-2 rounded-md text-base font-medium" href="/#">
                            Services
                        </a>
                        <a class="text-gray-600  hover:text-[#28844b]  px-3 py-2 rounded-md text-base font-medium" href="/#">
                            Products
                        </a>
                        <a class="text-gray-600  hover:text-[#28844b]  px-3 py-2 rounded-md text-base font-medium" href="/#">
                            Blogs
                        </a>
                    </div>
                </div>

                <div class="relative flex items-center w-full h-full lg:w-64 group">
                    <div class="absolute z-50 flex items-center justify-center block w-auto h-10 p-3 pr-2 text-sm text-gray-500 uppercase cursor-pointer sm:hidden">
                        <svg fill="none" class="relative w-5 h-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z">
                            </path>
                        </svg>
                    </div>
                    <svg class="absolute left-0 z-20 hidden w-4 h-4 ml-4 text-gray-500 pointer-events-none fill-current group-hover:text-gray-400 sm:block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z">
                        </path>
                    </svg>
                    <input type="text" class="block w-full py-1.5 pl-10 pr-4 leading-normal rounded-2xl focus:border-transparent focus:outline-none focus:ring-1 focus:ring-[#28844b] ring-opacity-40 bg-gray-100 text-gray-400 aa-input" placeholder="Search" />

                </div>

                <div class="block">
                    <div class="flex ml-6 md:block">
                        <button class="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-[#28844b] rounded-lg shadow-md hover:bg-[#28844b] outline-gray-800 focus:outline-none " type="submit">
                            Sell on Ziraat
                        </button>
                        <button class="bg-white ml-8 rounded-lg border border-gray-500 py-2 px-4 hover:bg-gray-100 focus:outline-none focus:border-gray-600">
                            Sign In
                        </button>
                    </div>
                </div>

                {/* Mobile menu button */}
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-white focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                            )}
                        </svg>
                    </button>
                </div>

            </div>

        </nav>

    )
}

export default NavigationBar;