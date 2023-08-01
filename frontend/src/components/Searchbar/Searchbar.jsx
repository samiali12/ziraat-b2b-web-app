import React, { useState } from 'react';

const SearchBar = () => {


    return (

        <div class="md:flex items-center hidden">
            <div class="bg-gray-100 font-normal flex items-center justify-between p-3 text-gray-500 cursor-pointer border border-[#28844b] border-r-0 rounded-tl-md rounded-bl-md">
                <span>Category</span>

                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
            </div>
            <div class="flex bg-gray-100 p-3 w-80 space-x-4 border border-[#28844b]">
                <input class="bg-gray-100 outline-none" type="text" placeholder="Enter Product / Service To Search" />
            </div>

            <div class=" rounded-tr-md rounded-br-md border border-[#28844b] flex items-center justify-between bg-[#28844b] px-5 py-3 text-white font-semibold hover:shadow-lg transition duration-3000 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
        </div>

    );
};

export default SearchBar;
