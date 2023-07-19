
// userController.js

const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const asyncErrorHandler = require('../middleware/asyncErrorHandler');
const Features = require('../utils/features');

// Products Controller Functions for getting all products 
const getAllProducts = async (request, response) => {

    const resultPerPage = 5;

    const apiFeatures = new Features(Product.find(), request.query).search().filter().pagination(resultPerPage)

    const productsData = await apiFeatures.query;

    response.status(200).json({
        success: true,
        productsData,
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


// User reviews on product 
const createProductReviews = asyncErrorHandler(async (request, response, next) => {

    const { rating, comment, productId } = request.body

    console.log(request.user)
   

    newReview = {
        user: request.user._id,
        name: request.user.fullName,
        rating: Number(rating),
        comment
    }

   
    const product = await Product.findById(productId)

    
    const isReviewed = product.reviews.find((rev) => {
        console.log(rev)
        if (rev.user.toString() === request.user._id.toString()) {
            
            return true
        }
    })

    if (isReviewed) {
        product.reviews.forEach((review) => {
            if (review.user.toString() === request.user._id.toString()) {
                review.rating = rating
                review.comment = comment
            }
        })
    }
    else {
        product.reviews.push(newReview)
        product.numberReviews = product.reviews.length
    }

    let avg = 0
    product.rating = product.reviews.forEach(review => {
        avg = avg + review.rating
    })

    product.rating = avg / product.numberReviews

    await product.save({ validateBeforSave: false })

    response.status(200).json({
        success: true,
        message: "Reviews add successfully"
    })

})


const getProductReviews = asyncErrorHandler(async (request, response, next) => {

    const product = await Product.findById(request.query.productId)

    if (!product) {
        return next(new ErrorHandler("Product Not Found"))
    }

    productReviews = product.reviews
    response.status(200).json({
        sucess: true,
        productReviews
    })

})

const deleteProductReviews = asyncErrorHandler(async (request, response, next) => {

    const product = await Product.findById(request.query.productId)

    if (!product) {
        return next(new ErrorHandler("Product Not Found"))
    }

    const notDeletedProductReviews = product.reviews.filter(
        (rev) => {
            return rev._id.toString() !== request.query.id.toString()
        }
    )


    let avg = 0
    notDeletedProductReviews.forEach(review => {
        avg = avg + review.rating
    })


    const numberReviews = notDeletedProductReviews.length
    const rating = avg / numberReviews

    const reviews = { ...notDeletedProductReviews }

    await Product.findByIdAndUpdate(request.query.productId, {
        reviews: reviews,
        rating: 4.9,
        numberReviews: numberReviews,
    }, {
        new: true,
        validateBeforSave: true,
        useFindAndModify: false
    }, (error, updatedReviews) => {
        if (error) {
            return response.status(200).json({
                success: true,
                message: "Reviews Not be deleted successfully"
            })
        }
        else {
            response.status(200).json({
                success: true,
                message: "Reviews deleted successfully",
                updatedReviews

            })
        }
    })


})

// Export the controller functions
module.exports = {
    getAllProducts,
    productCreation,
    productUpdate,
    productDeletion,
    getSpcificProduct,
    createProductReviews,
    getProductReviews,
    deleteProductReviews
}