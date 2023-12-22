import useAuthentication from "../../hooks/auth/useAuthentication";
import useUserDetails from "../../hooks/users/useUserDetails";
import MetaData from '../../app/MetaData';
import DashboardProfileMenu from "../../components/Users/ProfileDropDownMenu/DashboardProfileMenu";
import SellerRFQPage from "../../components/SellerDashboard/SellerRFQPage/SellerRFQPage";

const SellerRFQSPage = () => {

    const { authenticated, userId } = useAuthentication();
    const { user, isSuccess, isError, error } = useUserDetails()

    return (
        (userId === null) ?
            (
                <div className="flex items-center justify-center text-bold ">Loading...</div>
            ) : (

                <div className="flex flex-col flex-grow overflow-auto h-screen bg-[#F7F7F7]">
                    <div className="flex items-center justify-between h-16 px-8 border-b bg-white">
                        <MetaData title={`${user?.user?.email}`} />
                        <h2 className="text-lg font-semibold">Order List</h2 >
                        <div className="flex items-center space-x-4 p-4">

                            <DashboardProfileMenu userId={userId} />
                        </div>
                    </div >
                    <div className="mx-10 my-6">
                        <SellerRFQPage userId={userId}/>
                    </div>
                </div>
            )
    )
}

export default SellerRFQSPage;