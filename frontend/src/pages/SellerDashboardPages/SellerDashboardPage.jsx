import useAuthentication from "../../hooks/auth/useAuthentication";
import useUserDetails from "../../hooks/users/useUserDetails";
import MetaData from '../../app/MetaData';
import DashboardProfileMenu from "../../components/Users/ProfileDropDownMenu/DashboardProfileMenu";
import SummaryWidget from "../../components/SellerDashboard/Dashboard/SummaryWidget";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SalesChart from "../../components/Charts/SalesChart";


const SellerDashboardPage = () => {

    const [totalSales, setTotalSales] = useState(null);
    const [revenuePercentage, setRevenuePercentage] = useState(null);
    const [salesData, setSalesData] = useState({
        labels: [],
        datasets: [],
    });

    const { authenticated, userId } = useAuthentication();
    const { user, isSuccess, isError, error } = useUserDetails()

    useEffect(() => {
        // Function to fetch total sales for a user
        const fetchTotalSales = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/v1/users/${userId}/total-sales`);
                // Assuming your backend returns the totalSales value in the response data
                const sales = response.data.userSales;
                 // Assuming the response contains sales data in the 'sales' field
                // Manipulate the fetched sales data into the format suitable for the chart
                const formattedData = {
                    labels: sales.map((sale) => {
                        const saleDate = new Date(sale.date);
                        return saleDate.toLocaleString('default', { month: 'long' }); // Extract the month name
                        
                    }), // Assuming each sale has a 'month' field
                    datasets: [
                        {
                            label: 'Sales',
                            data: sales.map((sale) => sale.amount), // Assuming each sale has an 'amount' field
                            backgroundColor: 'rgba(40, 132, 75, 1)',
                        },
                    ],
                };
                setSalesData(formattedData);
                setTotalSales(response.data.totalSales);
                setRevenuePercentage(response.data.percentageChange)
            } catch (error) {
                console.error('Error fetching total sales:', error);
                // Handle error scenarios, display an error message, etc.
            }
        };

        // Function to fetch sales data from your backend API
        const fetchSalesData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/v1/users/${userId}/sales`); // Replace USER_ID_HERE with the actual user ID
                const sales = response.data.sales; // Assuming the response contains sales data in the 'sales' field
                // Manipulate the fetched sales data into the format suitable for the chart
                const formattedData = {
                    labels: sales.map((sale) => sale.month), // Assuming each sale has a 'month' field
                    datasets: [
                        {
                            label: 'Sales',
                            data: sales.map((sale) => sale.amount), // Assuming each sale has an 'amount' field
                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        },
                    ],
                };
                setSalesData(formattedData);
            } catch (error) {
                console.error('Error fetching sales data:', error);
            }
        };

        fetchTotalSales(); // Invoke the function when the component mounts
        fetchSalesData(); // Fetch sales data when the component mounts

    }, [userId]);

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
                            <SummaryWidget amount={true} percentage={revenuePercentage} value={totalSales} heading={"Revenue"} color={"rgb(0,115,255"} />

                            <SummaryWidget amount={true} percentage={-20} value={30000} heading={"Order"} color={"rgb(0,115,255"} />

                            <SummaryWidget amount={true} percentage={100} value={30000} heading={"Revenue"} color={"rgb(0,115,255"} />

                        </div>

                        <div className="my-6 flex items-center gap-8">
                            <div className="bg-white p-8 w-[100%] shadow-md rounded-md">
                                <h2 className="text-center tracking-3 font-normal uppercase">Revenue & Transaction</h2>
                                <SalesChart data={salesData} />
                            </div>
                        </div>

                    </div>
                </div>

            )

    )
}

export default SellerDashboardPage;