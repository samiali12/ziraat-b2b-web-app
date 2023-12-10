import CategoryCard from "./CategoryCard";

const CategoryBrowser = () => {

    const categories = [
        { id: 1, categoryName: "Seeds", image: "https://th.bing.com/th?id=OIP.du73i3qj_1TCb3vDQsRCpgHaFF&w=301&h=207&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2" },
        { id: 2, categoryName: "PESTICIDE", image: "https://th.bing.com/th?q=Agricultural+Pesticides&w=120&h=120&c=1&rs=1&qlt=90&cb=1&pid=InlineBlock&mkt=en-WW&cc=PK&setlang=en&adlt=moderate&t=1&mw=247" },
        { id: 3, categoryName: "BIO PRODUCTS", image: "https://th.bing.com/th/id/OIP.cPk5BrdWcGq0dVGyrkr2KwHaKc?w=129&h=180&c=7&r=0&o=5&pid=1.7" },
        { id: 4, categoryName: "SPRAY PLANTS", image: "https://th.bing.com/th?q=Plant+Shine+Spray&w=120&h=120&c=1&rs=1&qlt=90&cb=1&pid=InlineBlock&mkt=en-WW&cc=PK&setlang=en&adlt=moderate&t=1&mw=247" },
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