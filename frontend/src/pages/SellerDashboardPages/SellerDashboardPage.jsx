import useAuthentication from "../../hooks/auth/useAuthentication";
import useUserDetails from "../../hooks/users/useUserDetails";
import MetaData from '../../app/MetaData';
import DashboardProfileMenu from "../../components/Users/ProfileDropDownMenu/DashboardProfileMenu";
import SummaryWidget from "../../components/SellerDashboard/Dashboard/SummaryWidget";


const SellerDashboardPage = () => {

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
                        <h2 className="text-lg font-semibold">Dashboard</h2 >
                        <div className="flex items-center space-x-4 p-4">

                            <DashboardProfileMenu userId={userId} />
                        </div>
                    </div >

                    <div className="mx-10 my-6">
                        <div className="flex justify-between items-center gap-8">
                            <SummaryWidget amount={true} percentage={40} value={30000} heading={"Revenue"} color={"rgb(0,115,255"} />

                            <SummaryWidget amount={true} percentage={-20} value={30000} heading={"Revenue"} color={"rgb(0,115,255"} />

                            <SummaryWidget amount={true} percentage={50} value={30000} heading={"Revenue"} color={"rgb(0,115,255"} />

                            <SummaryWidget amount={true} percentage={100} value={30000} heading={"Revenue"} color={"rgb(0,115,255"} />

                        </div>

                        <div className="my-6 flex items-center gap-8">
                            <div className="bg-white p-8 w-[100%] shadow-md rounded-md">
                                <h2 className="text-center tracking-3 font-normal uppercase">Revenue & Transaction</h2>
                            </div>
                            <div className="bg-white max-w-[64] w-[30%]  p-8 shadow-md rounded-md">
                                <h2>Inventory</h2>
                            </div>
                        </div>

                    </div>
                </div>

            )

    )
}

export default SellerDashboardPage;