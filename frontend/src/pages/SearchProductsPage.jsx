import React, { useEffect } from "react";
import NavigationBar from "../components/Header/NavigationBar";
import SearchProductList from "../components/SearchProductsList/SearchProductsList";
import Footer from "../components/Footer/Footer";
import { useLocation } from "react-router-dom";

const SearchProductPage = () => {

    return(
        <React.Fragment>
            <NavigationBar />
            <SearchProductList />
            <Footer />
        </React.Fragment>
    )
}

export default SearchProductPage;