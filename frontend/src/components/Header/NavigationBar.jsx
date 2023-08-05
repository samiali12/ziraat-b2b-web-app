import { React, useState,  } from 'react'
import websiteLogo from '../../assets/img/website-logo.png'
import SearchBar from '../Searchbar/Searchbar';
import { Link } from 'react-router-dom';

const NavigationBar = () => {

  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };


  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Add your search functionality here (e.g., API call, filtering, etc.)
    console.log('Search query:', searchQuery);
  };

  return (

    <div>
  
      <nav class="bg-white">
        <div class="max-w-7xl mx-auto px-4 py-10">
          <div class="flex justify-between">
            <div class="flex space-x-7">

              <div class="block items-center">
                <a href="#" class="flex items-center p-3">
                  <img src={websiteLogo} alt="Logo" class="h-auto w-40 mr-2" />
                </a>
              </div>

            </div>

            <SearchBar />

            {/* Secondary Menu */}
            <div class="hidden md:flex items-center space-x-4 ">
              <Link
                to="/login"
                class="p-3 font-medium text-gray-500 rounded border hover:bg-gray-200 transition duration-300"
              >Log In</Link>
              <Link
                to="/signup"
                class="p-3 font-medium text-white bg-[#28844b] rounded transition duration-300"
              >Join</Link>
            </div>

            <div class="md:hidden flex items-center">
              <button onClick={toggleMenu} class="outline-none mobile-menu-button">
                <svg
                  class="w-6 h-6 text-gray-500"
                  x-show="!showMenu"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>


        <div class={`md:hidden ${showMenu ? '' : 'hidden'}`}>
          <a
            href=""
            class="block py-4 px-4 text-gray-500 hover:text-[#28844b] font-semibold transition duration-300"
          >Home</a
          >
          <a
            href=""
            class="block py-4 px-4 text-gray-600 hover:text-[#28844b] font-semibold transition duration-300"
          >Services</a
          >
          <a
            href=""
            class="block py-4 px-4 text-gray-600  hover:text-[#28844b] font-semibold transition duration-300"
          >About</a
          >
          <a
            href=""
            class="block py-4 px-4 text-gray-600 hover:text-[#28844b] font-semibold transition duration-300"
          >Contact Us</a
          >

          <div class="m-3 md:flex items-center space-x-6 ">
            <a
              href=""
              class="py-2 px-2 font-medium text-gray-500 rounded border hover:bg-gray-200 transition duration-300"
            >Log In</a
            >
            <a
              href=""
              class="py-2 px-2 font-medium text-white bg-[#28844b] rounded transition duration-300"
            >Join</a
            >
          </div>
        </div>
      </nav>

    </div>
  );
}

export default NavigationBar;