import { HiTrendingDown, HiTrendingUp } from 'react-icons/hi'

const CircularProgressBar = ({ percentage, color }) => {

   const circumference = 2 * Math.PI * 50; // Adjusted circumference based on radius 50

   return (
      <div className="relative flex items-center justify-center">
         <svg className="w-20 h-20">
            <circle
               className="text-gray-300"
               strokeWidth="5"
               stroke="currentColor"
               fill="transparent"
               r="30"
               cx="40"
               cy="40"
            />
            <circle
               className="text-[#28844b]"
               strokeWidth="5"
               strokeDasharray={circumference}
               strokeDashoffset={circumference - (percentage / 100) * circumference}
               strokeLinecap="round"
               stroke="currentColor"
               fill="transparent"
               r="30"
               cx="40"
               cy="40"
            />
         </svg>
         <span className="absolute text-xs">{`${percentage}%`}</span>
      </div>
   );
};

const SummaryWidget = ({ heading, amount, percentage, value, color }) => {
   return (
      <div className="bg-white w-64 p-6 shadow-md flex justify-between items-stretch gap-0 ">
         <div className="flex flex-col">
            <h2 className="text-sm">{heading}</h2>
            <h2 className="text-lg font-semibold">{amount ? `PKR ${value}` : value} </h2>
            {
               (percentage > 0) ?
                  (
                     <span className="flex items-center font-nomal text-green-[#28844b]"><HiTrendingUp color="green" className='mr-2'/> +{percentage}%{" "}</span>
                  ) : (
                     <span className="flex items-center font-nomal text-[red]"><HiTrendingDown className='mr-2' color="red" /> -{percentage}%{" "}</span>
                  )
            }
         </div>
         <CircularProgressBar color={"#28844b"} percentage={percentage} />
      </div>

   )
}

export default SummaryWidget;