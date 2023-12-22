import CategoryCard from "./CategoryCard";

const CategoryBrowser = () => {

    const categories = [
        { id: 1, categoryName: "Rice", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRryRllFZSwv6zhFDOAiq9FLgt3DC_Ymu8Bz9xxgJiYE4O9g-uD5aJZZPApEGnFFki2XYw&usqp=CAU" },
        { id: 2, categoryName: "Sugarcane", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmBB0cY29eAT3WEYZuHUsu55unHfYnf3KB8Q&usqp=CAU" },
        { id: 3, categoryName: "Cotton", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlMf15hjMydhwY-Z4A1p39hHvUBBr_2UPjfQ&usqp=CAU" },
        { id: 4, categoryName: "Wheat", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhH84FLuCwelmzWHRN58PN9e8fiHSYHiuU9w&usqp=CAU" },
    ];


    return (
        <div className="mx-auto max-w-7xl py-5 px-10 mt-5">
            <h2 className="
            text-[#404145] text-[28px] font-bold text-center py-5">Browse By <span className="text-[#28844b] font-sans italic">
                    Categories</span></h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 py-5">
                {categories.map((category) => (
                    <CategoryCard key={category.id} productCategory={category} />
                ))}
            </div>
        </div>
    );
}


export default CategoryBrowser;