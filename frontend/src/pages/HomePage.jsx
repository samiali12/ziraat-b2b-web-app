import {React, Fragment} from 'react'

import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import FeaturedProducts from '../components/main/FeaturedProducts';
import MetaData from '../app/MetaData';
import CategoryBrowser from '../components/CategoryBrowser/CategoryBrowser';


const HomePage = () => {
    return (
        <Fragment>
            <MetaData title="Home | Ziraat B2B"/>
            <Header />
            <CategoryBrowser />
            <FeaturedProducts />
            <Footer />
        </Fragment>
    )
}

export default HomePage;