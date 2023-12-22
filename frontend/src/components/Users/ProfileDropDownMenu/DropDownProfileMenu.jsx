import { Link, useNavigate } from 'react-router-dom'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon, } from '@heroicons/react/24/outline'
import React, { Fragment, createContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../../features/authFeatures/authSlice'
import { getUserDetails } from '../../../features/UserManagementFeatures/userManageSlice'
import axios from 'axios'
import { FaCartPlus } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";
import { useCart } from '../../../context/CartContext'



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const imagePlaceHolder = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAlwMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAABAUGAQIDB//EADIQAAICAQIDBgUBCQAAAAAAAAABAgMEBREhMUESIlFhcbETMlKBoUIUNGJyc5HB0fD/xAAXAQEBAQEAAAAAAAAAAAAAAAAAAgED/8QAHBEBAQEBAAIDAAAAAAAAAAAAAAECERIxIUFR/9oADAMBAAIRAxEAPwD9xAAAAAAAAONpLd8iDm6jDHbrh37PDovUp78i29t2zb8uhUzazq/nnY0HtK6H24nqrKoue1dsZPwTMyd8PLkV4RnWrBnI5+VGKirnsvFJn0r1TKg95SU14OP+jPCt6vwRMPNrylsu7PrFkshoAAAAAAAAAAAAAFfqmY6Y/Cre1klz+lE6bUYuT5JbszF1jutlZLnJ78ehWJ1led/+ZwA6pAAAAAHqE5VzU4PaUeKZo8O9ZFEbFw35rwZmiz0S3s2WVN/Mu0idxsXIAOSgAAAAAAAAAAfPJW+Pal1g/Yy5q5cVsZacexOUH+ltF4TXkAHRgAAAAAErTJdnOr891+CKStMW+dV5bv8ADMvojRIHDpxWAAAAAAAAAADjM3nODy7XW905fnqaVmXvTjfYnzU37l4TXzAB0YAAAAABZaIoO6xv51HgvLqVpY6Im8ib6KPH+5mvTZ7XR0A4qAAAAAAAAAAAKLWKHXk/ES7tnuXp4tqhbFxsipRfRmy8rKywPrk1Oi+db/S+HofI7JAAAAAAvdHpdeO5yW0pvf7dCBpOPG69uyKlCC5NdWXyW3Ijd+myAAOagAAAAAAAAAAAABWavi9uCugu9H5vNFMafK4Y1v8AI/YzB0xU0ABbA6cPUPnj6oDQafjfs+Oov5pd6XqSggcFgAAAAAAAAAAAAAAAIupz7GDb4tbL7mdLLV8pWTVNb3jF7yfmVp1xPhNAAUwAAGoomp01z+qKZ9Cr0fKTgseeykvl80Whxs5VwABgAAAAAAAAAiZefVjd1vtWfSv8lPk512RwlLsx+mJUzazq3yNQop3W/bl4RKzJ1K65OMUq4vonxf3IQLmJGdAAUwAAAAAdTae65k/H1W6tKNqVkfHkyvBlnRocfUMe/gpdmX0y4ErcyhJx82/H2UZ7x+mXFE3H43rRghYmo1X7Rfcn4Pr6E052cUAAAVuqZrqfwaeE2u9LwRYtpLd8jL3WO26dj5ye5WZ2sted922+b6nADqkAAAAAAAAAAAAAAAALLTtQlCUab25QfBSfNFaPTmZZ0avoDzTLt1QkusUwcVvOU9sa1/wv2MwAdMJoAC2AAAAAAAAAAAAAAAAAAA02F+6Uf04+wAOFW//Z'


const DropdownProfileMenu = ({ userId, isDashboard }) => {

  const navigate = useNavigate()
  const {cart, addToCart} = useCart()
  
  const { user, isError, isSuccess, isLoading, message } = useSelector(state => state.userManage.user) || {}
  const [isEmptyImageURL, setIsEmptyImageURL] = useState(true)
  const dispatch = useDispatch()
  



  useEffect(() => {

    const getUser = async () => {

      dispatch(getUserDetails(userId))
      
      if (user?.profilePicture?.image_url) {
        
        setIsEmptyImageURL(true)
       } else {
         setIsEmptyImageURL(false)
       }

    }
    getUser()
  }, [])


  const logoutUser = async () => {
     const response = await axios.get("http://localhost:8000/api/v1/users/logout")
     window.location.reload()
  }

  return (

    <div className="flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
      <Link to="/seller/dashboard" className="text-[#28844b] text-lg font-semibold mr-2">Switch selling</Link>
      <button
      onClick={() => navigate("/products/cart")}
        type="button"
        className="relative rounded-full  p-1 text-gray-400 hover:text-[#28844b] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
      >
         <span className="absolute -inset-1.5">
        {cart.length >= 0 && (
          <span className="bg-[#28844b] text-white rounded-full px-2 py-1 text-xs absolute top-1.5 right-3 transform translate-x-1/2 -translate-y-1/2">
            {cart.length}
          </span>
        )}
      </span>
        <span className="sr-only">Add Cart</span>
        <CiShoppingCart onClick={addToCart} className="h-6 w-6" aria-hidden="true" />
      </button>
      <button
        type="button"
        className="relative rounded-full  p-1 text-gray-400 hover:text-[#28844b] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
      >
        <span className="absolute -inset-1.5" />
        <span className="sr-only">View notifications</span>
        <BellIcon className="h-6 w-6" aria-hidden="true" />
      </button>

      {/* Profile dropdown */}
      <Menu as="div" className="relative ml-3">
        <div>
          <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
            <span className="absolute -inset-1.5" />
            <span className="sr-only">Open user menu</span>
            {user?.profilePicture !== null ? (
              <img
                className="h-8 w-8 rounded-full ring ring-[#28844b]"
                src={user?.profilePicture?.image_url || imagePlaceHolder}
                alt=""
              />
            ) : (
              <img
                className="h-8 w-8 rounded-full"
                src={imagePlaceHolder}
                alt="Image Placeholder"
              />
            )}

          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to={`/user/account`}
                  className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                >
                  Account
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/seller/dashboard"
                  className={classNames(active ? 'text-[#28844b] m-2' : '', 'block px-4 py-2 m-2 text-sm text-white bg-[#28844b]')}
                >
                  Dashboard
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                onClick={logoutUser}
                  to="#"
                  className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                >
                  Sign out
                </Link>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>

  )
}

export default DropdownProfileMenu;