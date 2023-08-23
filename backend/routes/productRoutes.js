const passport = require('passport')
const express = require('express')

const { getAllProducts, productCreation, 
    productUpdate, productDeletion, 
    getSpcificProduct, createProductReviews,
    getProductReviews , deleteProductReviews } = require('../controllers/productsController')

const { isAuthenticated } = require('../middleware/authentication')
const {authorizationRoles} = require('../controllers/userController')


const router = express.Router()

router.route("/products").get(getAllProducts)
router.route("/product/new").post( productCreation)
router.route("/product/:id")
    .put(isAuthenticated, productUpdate)
    .delete(isAuthenticated, productDeletion)
    .get(getSpcificProduct)

router.route("/reviews/").put(createProductReviews)
router.route("/review/").get(getProductReviews).delete(deleteProductReviews)

module.exports = router