
const express = require('express')

const { getAllProducts, productCreation, productUpdate, productDeletion, getSpcificProduct,   } = require('../controllers/productsController')
const { isAuthenticated } = require('../middleware/authentication')
const { authroizationRoles, } = require('../controllers/userController')


const router = express.Router()

router.route("/products").get(getAllProducts)
router.route("/product/new").post( isAuthenticated, authroizationRoles, productCreation)
router.route("/product/:id")
    .put(productUpdate, isAuthenticated)
    .delete(productDeletion, isAuthenticated)
    .get(getSpcificProduct, isAuthenticated)

module.exports = router