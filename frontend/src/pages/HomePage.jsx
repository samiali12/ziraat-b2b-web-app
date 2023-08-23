import {React, Fragment} from 'react'

import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import FeaturedProducts from '../components/main/FeaturedProducts';
import MetaData from '../app/MetaData';


const HomePage = () => {
    return (
        <Fragment>
            <MetaData title="Home | Ziraat B2B"/>
            <Header />
            {/*<FeaturedProducts />*/}
            <Footer />
        </Fragment>
    )
}

export default HomePage;