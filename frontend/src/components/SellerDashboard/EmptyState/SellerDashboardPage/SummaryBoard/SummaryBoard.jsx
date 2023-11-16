
import useAuthentication from "../../../../../hooks/auth/useAuthentication";
import useUserDetails from "../../../../../hooks/users/useUserDetails";
import DashboardProfileMenu from "../../../../Users/ProfileDropDownMenu/DashboardProfileMenu";
import MetaData from "../../../../../app/MetaData";


const SummaryBoard = () => {
    
    
    const { authenticated, userId } = useAuthentication();
    const { user, isSuccess, isError, error } = useUserDetails()

    return (
        (userId === null) ?
        (
            <div className="flex items-center justify-center text-bold ">Loading...</div>
        )
        : (
            <div className="flex flex-col flex-grow overflow-auto ">
                <MetaData title={`${user?.user?.email} | Dashboard`} />
                <div className="flex items-center justify-between h-16 px-8 border-b">
                    <h2 className="text-lg font-semibold">Dashboard</h2 >
                    <div className="flex items-center space-x-4 p-4">
                        <DashboardProfileMenu userId={userId} />
                    </div>
                </div >
                <div class="grid max-w-screen-xl grid-cols-2 gap-8 p-2 m-2  text-gray-900 sm:grid-cols-3 xl:grid-cols-4 sm:p-8">
                    <div class="flex flex-col items-center justify-center bg-gray-100 p-4 shadow-lg rounded-md">
                        <dt class="mb-2 text-3xl text-gray-800 font-extrabold">$73</dt>
                        <dd class="text-gray-800">Sales</dd>
                    </div>
                    <div class="flex flex-col items-center justify-center bg-gray-100 p-4 shadow-lg rounded-md">
                        <dt class="mb-2 text-3xl text-gray-800 font-extrabold">10</dt>
                        <dd class="text-gray-800">Products</dd>
                    </div>
                    <div class="flex flex-col items-center justify-center bg-gray-100 p-4 shadow-lg rounded-md">
                        <dt class="mb-2 text-3xl text-gray-800 font-extrabold">2</dt>
                        <dd class="text-gray-800">Users</dd>
                    </div>
                    <div class="flex flex-col items-center justify-center bg-gray-100 p-4 shadow-lg rounded-md">
                        <dt class="mb-2 text-3xl text-gray-800 font-extrabold">73M+</dt>
                        <dd class="text-gray-800">Sales</dd>
                    </div>
                </div>
            </div>
        )

    )
}

export default SummaryBoard;