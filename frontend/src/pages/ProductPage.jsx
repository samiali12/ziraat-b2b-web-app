import {React, Fragment} from 'react'

import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import FeaturedProducts from '../components/main/FeaturedProducts';
import MetaData from '../app/MetaData';
import ProductPageById from '../components/Product/ProductPageById';
import NavigationBar from '../components/Header/NavigationBar';


const ProductPage = () => {
    return (
        <>
         <Fragment>
            <NavigationBar />
            <ProductPageById />
            <Footer />
        </Fragment>
        </>
    )
}

export default ProductPage;