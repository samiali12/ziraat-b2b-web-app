import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";

const RatingStars = ({ ratings }) => {
    return (
        <ul className="flex list-none gap-1  mt-4" data-te-rating-init>
            {
                Array.from({ length: 5 }, (star, index) => {
                    const rating = ratings; // Replace with your actual rating value
                    let starIcon;

                    if (index < rating) {
                        starIcon = <FontAwesomeIcon icon={faStar} className="text-yellow-500" />;
                    } else if (index === Math.floor(rating) && rating % 1 !== 0) {
                        starIcon = <FontAwesomeIcon icon={faStarHalf} className="text-yellow-500" />;
                    } else {
                        starIcon = <FontAwesomeIcon icon={faStar} className="text-gray-400" />;
                    }

                    return (
                        <li key={index}>
                            <span
                                className="text-primary [&>svg]:h-5 [&>svg]:w-5"
                                title="Rating"
                                data-te-rating-icon-ref
                            >
                                {starIcon}
                            </span>
                        </li>
                    );
                })}
        </ul>
    )
}

export default RatingStars