import { BiSolidUserCircle, BiSolidKey } from 'react-icons/bi'
import {FaAddressBook} from 'react-icons/fa'
import {MdPayment} from 'react-icons/md'
import AccountCard from './AccountCard/AccountCard';




const AccountMain = () => {


    const accountCategory = [
        {
            id: '1',
            title: 'Your Profile',
            description: 'Manage, add, remove user profile details',
            icon: <BiSolidUserCircle />,
            path: '/user/account/manage-profile'
        },
        {
            id: '2',
            title: 'Login & Security',
            description: 'Edit, login, name, and mobile number',
            icon: <BiSolidKey />,
            path: 'user/account/password-change'
        },
        {
            id: '3',
            title: 'Address',
            description: 'Edit, remove, default address',
            icon: <FaAddressBook />,
            path: 'user/account/change-address'
        },
        {
            id: '4',
            title: 'Payment',
            description: 'View all transactions, manage payment method and settings',
            icon: <MdPayment />,
            path: 'user/account/manage-profile'
        }
    ]


    return (
        <div className="mx-auto max-w-7xl py-5 px-10">
            <h2 className="text-[#404145] text-2xl font-semibold  py-5">
                Your Account
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-6 py-5">
                {
                    accountCategory.map((category) => (
                        <AccountCard 
                        key={category.id}
                        cardDetail={category} />
                    ))
                }
            </div>
        </div>
    )
}

export default AccountMain;