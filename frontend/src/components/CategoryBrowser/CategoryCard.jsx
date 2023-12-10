import { Link } from "react-router-dom";


const CategoryCard = ({ productCategory }) => {
    return (
        <div key={productCategory.categoryName} className="rounded-lg shadow-lg border border-gray-300 p-2">
            <Link to={`/category/${encodeURIComponent(productCategory.categoryName)}`}>
                <img src={productCategory.image} alt={productCategory.name} className="w-full h-40 object-cover rounded-sm" />
                <div className="p-2 text-center">
                    <h3 className="text-base font-normal mb-2 text-[#222325]">{productCategory.categoryName}</h3>
                </div>
            </Link>
        </div>
    )
}


export default CategoryCard;