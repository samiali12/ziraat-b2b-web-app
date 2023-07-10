
// userController.js

const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const asyncErrorHandler = require('../middleware/asyncErrorHandler');
const Features = require('../utils/features');

// Products Controller Functions for getting all products 
const getAllProducts = async (request, response) => {

    const resultPerPage = 5;
    const productsCount = Product.countDocuments()

    const apiFeatures = new Features(Product.find(), request.query).search().filter().pagination(resultPerPage)

    const productsData = await apiFeatures.query;

    response.status(200).json({
        success: true,
        productsData,
        productsCount
    })
}

// Product Controller Functions For Creating New Product
const productCreation = asyncErrorHandler(async (request, response) => {

    const product = await Product.create(request.body)

    response.status(201).json({
        success: true,
        product
    })
})


// Product Controller Fucntion For Reading Specific Product 
const getSpcificProduct = asyncErrorHandler(async (request, response, next) => {

    const product = await Product.findById(request.params.id)

    if (!product) {
        return (next(new ErrorHandler('Product Not Found', 404)))
    }

    response.status(200).json({
        success: true,
        product
    })
})

// Product Controller Function For Updating Existing Product
const productUpdate = asyncErrorHandler(async (request, response, next) => {


    let product = await Product.findById(request.params.id)

    if (!product) {
        return (next(new ErrorHandler('Product Not Found', 404)))
    }


    product = await Product.findByIdAndUpdate(request.params.id, request.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    response.status(200).json({
        sccess: true,
        product,
    })
})


// Product Controller Function to Delete  Product
const productDeletion = asyncErrorHandler(async (request, response) => {

    const product = await Product.findById(request.params.id)

    if (!product) {
        return (next(new ErrorHandler('Product Not Found', 404)))
    }

    await Product.findByIdAndRemove(request.params.id)

    response.status(200).json({
        success: true,
        message: "Product Deleted Successfully"
    })
})

// Export the controller functions
module.exports = {
    getAllProducts,
    productCreation,
    productUpdate,
    productDeletion,
    getSpcificProduct
}