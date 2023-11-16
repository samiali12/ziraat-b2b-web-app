import { Link } from "react-router-dom";

const AccountCard = ({ cardDetail }) => {
    return (
        <Link to={cardDetail.path}>
            <div className="min-width-600 flex items-center justify-start border rounded-lg p-4 hover:bg-gray-100 shadow-md">
                <div className="text-[50px] text-[#28844b]">
                    {cardDetail.icon}
                </div>
                <div className="flex flex-col ml-4">
                    <h2 className="font-medium ">{cardDetail.title}</h2>
                    <p className="font-normal text-gray-800">{cardDetail.description}</p>
                </div>
            </div>
        </Link>

    )
}

export default AccountCard;