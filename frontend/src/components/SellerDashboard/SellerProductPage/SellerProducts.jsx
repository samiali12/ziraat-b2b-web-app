import { useState, useEffect } from "react";
import useAuthentication from "../../../hooks/auth/useAuthentication";
import DashboardProfileMenu from "../../Users/ProfileDropDownMenu/DashboardProfileMenu";
import SellerProductList from "./SellerProductList";
import MetaData from "../../../app/MetaData";
import useUserDetails from '../../../hooks/users/useUserDetails'
import Alert from "../../Alert/Alert";


const SellerProducts = () => {


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
            )
            : (

                <div className="flex flex-col flex-grow overflow-auto">
                    {alert && <Alert type={alert.type} message={alert.message} onClose={closeAlert} />}

                    <MetaData title={`${user?.user?.email}`} />
                    <div className="flex items-center justify-between h-16 px-8 border-b">
                        <h2 className="text-lg font-semibold">Product Management</h2 >
                        <div className="flex items-center space-x-4 p-4">

                            <DashboardProfileMenu userId={userId} />
                        </div>
                    </div >

                    <div className="m-4 shadow-lg">
                        <SellerProductList setFlag={setFlag} />
                    </div>

                </div>

            )


    )
}

export default SellerProducts;