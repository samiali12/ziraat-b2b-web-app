import React from "react";
import NavigationBar from "../components/Header/NavigationBar"
import Footer from "../components/Footer/Footer";
import CategoryProductExplore from "../components/CategoryProductExplorer/CategoryProductExplorer";

const CategoryProductPage = () => {
    return (
        <React.Fragment>
            <NavigationBar />
            <CategoryProductExplore />
            <Footer />
        </React.Fragment>

    )
}


export default CategoryProductPage;