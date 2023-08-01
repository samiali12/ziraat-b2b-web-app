import {React, Fragment} from 'react'

import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import FeaturedProducts from '../components/main/FeaturedProducts';


const HomePage = () => {
    return (

        <Fragment>
            <Header />
            <FeaturedProducts />
            <Footer />
        </Fragment>
    )
}

export default HomePage;