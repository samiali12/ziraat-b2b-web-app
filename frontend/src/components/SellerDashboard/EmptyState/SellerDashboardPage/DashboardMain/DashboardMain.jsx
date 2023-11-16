import BarChart from "../../../../Charts/BarChart";

const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'Sales',
            data: [65, 59, 80, 81, 56, 55, 40], // Replace with your seller's sales data
            backgroundColor: 'rgba(40, 132, 75, 0.7)', // Bar color
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
        },
    ],
};


const DashboardMain = () => {
    return (

        <div className="max-w-screen-xl grid grid-cols-2 gap-8 max-auto p-4 m-4">
            <div className="">
                <h1 className="font-semibold text-lg text-center mb-4">Total Sales</h1>
                <BarChart data={data} />
            </div>

            <BarChart data={data} />
        </div>

    )
}

export default DashboardMain;