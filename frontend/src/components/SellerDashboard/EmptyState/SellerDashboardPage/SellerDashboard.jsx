
import Chart from 'chart.js/auto'
import { CategoryScale } from 'chart.js/auto'
import BarChart from '../../../Charts/BarChart';
import useAuthentication from '../../../../hooks/auth/useAuthentication';
import useUserDetails from '../../../../hooks/users/useUserDetails';
import MetaData from '../../../../app/MetaData';
import DashboardProfileMenu from '../../../Users/ProfileDropDownMenu/DashboardProfileMenu';
import SummaryBoard from './SummaryBoard/SummaryBoard';
import DashboardMain from './DashboardMain/DashboardMain';

const SellerDashboard = () => {



    return (

        <div className="flex flex-col flex-grow overflow-auto">
            <SummaryBoard />
            <DashboardMain />
        </div>

    )
}

export default SellerDashboard;