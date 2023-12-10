import useAuthentication from "../../hooks/auth/useAuthentication";
import useUserDetails from "../../hooks/users/useUserDetails";
import MetaData from '../../app/MetaData';
import DashboardProfileMenu from "../../components/Users/ProfileDropDownMenu/DashboardProfileMenu";
import SellerProducts from "../../components/SellerDashboard/SellerProductPage/SellerProducts";
import SellerProductList from "../../components/SellerDashboard/SellerProductPage/SellerProductList";
import { useState, useEffect } from "react";
import Alert from "../../components/Alert/Alert";

const SellerProductsPage = () => {
    
    const { authenticated, userId } = useAuthentication();
    const { user, isSuccess, isError, error } = useUserDetails()
    const [alert, setAlert] = useState(null);
    const [flag, setFlag] = useState();


    const showAlert = (type, message) => {
        setAlert({ type, message });
       
    };

    const closeAlert = () => {
        setAlert(null);
    };


    useEffect(() => {

        if (flag === 'success') {
            showAlert('success', 'Product Add Successfully')
        }

        if (flag === 'error') {
            showAlert('error', 'Something wrong happening')
        }
    }, [flag])

    return (


        (userId === null) ?
            (
                <div className="flex items-center justify-center text-bold ">Loading...</div>
            ) : (

                <div className="flex flex-col flex-grow overflow-auto h-screen bg-[#F7F7F7]">
                    <div className="flex items-center justify-between h-16 px-8 border-b bg-white">
                        <MetaData title={`${user?.user?.email}`} />
                        <h2 className="text-lg font-semibold">Dashboard</h2 >
                        <div className="flex items-center space-x-4 p-4">

                            <DashboardProfileMenu userId={userId} />
                        </div>
                    </div >

                    <div className="mx-10 my-6">
                    <SellerProductList setFlag={setFlag} />

                    </div>
                </div>

            )

    )
}

export default SellerProductsPage;