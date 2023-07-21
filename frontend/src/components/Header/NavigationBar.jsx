import { React, useState } from 'react'
import websiteLogo from '../../assets/img/website-logo.png'

const NavigationBar = () => {

  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (

    <div>
      <nav class="bg-white">
        <div class="max-w-6xl mx-auto px-4 ">
          <div class="flex justify-between">
            <div class="flex space-x-7">

              <div>
                <a href="#" class="flex items-center py-4 px-2">
                  <img src={websiteLogo} alt="Logo" class="h-auto w-40 mr-2" />
                </a>
              </div>

              <div class="hidden md:flex items-center space-x-3">
                <a
                  href="/"
                  class="py-4 px-2 text-gray-500 hover:text-[#28844b] font-semibold transition duration-300"
                >Home</a
                >
                <a
                  href="/services"
                  class="py-4 px-2 text-gray-600 hover:text-[#28844b] font-semibold transition duration-300"
                >Services</a
                >
                 <a
                  href="/products"
                  class="py-4 px-2 text-gray-600  hover:text-[#28844b] font-semibold transition duration-300"
                >Products</a
                >

                <a
                  href="/news"
                  class="py-4 px-2 text-gray-600  hover:text-[#28844b] font-semibold transition duration-300"
                >News
                </a>
                <a
                  href="/blogs"
                  class="py-4 px-2 text-gray-600 hover:text-[#28844b] font-semibold transition duration-300"
                >Blogs</a
                >
              </div>

            </div>

            {/* Secondary Menu */}
            <div class="hidden md:flex items-center space-x-4 ">
              <a
                href=""
                class="py-2 px-2 font-medium text-gray-500 rounded border hover:bg-gray-200 transition duration-300"
              >Log In</a
              >
              <a
                href=""
                class="py-2 px-2 font-medium text-white bg-[#28844b] rounded transition duration-300"
              >Become Seller</a
              >
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
            >Become Seller</a
            >
          </div>
        </div>
      </nav>

    </div>
  );
}

export default NavigationBar;