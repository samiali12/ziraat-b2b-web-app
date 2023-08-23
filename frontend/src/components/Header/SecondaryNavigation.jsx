const SecondaryNavigation = () => {

     const categories = [
        { id: 1, categoryName: "Seeds",},
        { id: 2, categoryName: "PESTICIDE",},
        { id: 3, categoryName: "BIO PRODUCTS", },
        { id: 4, categoryName: "SPRAY PLANTS",  },
        { id: 5, categoryName: "EQUIPMNETS",  },
      ];
      

      return (
        <div className="mx-auto max-w-7xl py-5 px-10 mt-5">
            <h2 className="text-base font-semibold text-center text-gray-700 uppercase py-5">Browse By Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 py-5">
            {categories.map((category) => (
              <div key={category.id} className="bg-white rounded-lg text-gray-700 p-5 border cursor-pointer hover:bg-gray-100 hover:ring-1 ring-[#28844b] transition duration-400">
                <h3 className="text-sm text-center font-semibold">{category.categoryName}</h3>
              </div>
            ))}
          </div>
        </div>
      );
}

export default SecondaryNavigation;