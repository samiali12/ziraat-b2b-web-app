import React from "react";
import RatingStars from "./Rating";

const Review = ({ reviewer, rating, comment, time }) => {


    const reviewDate = new Date(time)
    const formattedDate = `${reviewDate.getMonth() + 1}/${reviewDate.getDate()}/${reviewDate.getFullYear()}`;


    return (
        <div class="border-t border-gray-200 mt-10">
            <div className="flex mt-10">
                <div className="w-full md:w-1/2">
                    <div className="flex-1"> 
                        <div className="block mt-2">
                            <div className="text-lg font-semibold">{reviewer}</div>
                            <div className="text-base font-normal text-gray-700">{formattedDate}</div>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/2">
                    <div className="flex-1">
                        <div className="block">
                            <RatingStars ratings={rating} />
                            <p className="text-gray-700 text-justify">{comment}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};


export default Review;
