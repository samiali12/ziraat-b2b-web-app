
const express = require('express')

const { getAllProducts, productCreation, productUpdate, productDeletion, getSpcificProduct,   } = require('../controllers/productsController')
const { isAuthenticated } = require('../middleware/authentication')
const {authorizationRoles} = require('../controllers/userController')


const router = express.Router()

router.route("/products").get(isAuthenticated , getAllProducts)
router.route("/product/new").post( isAuthenticated ,productCreation)
router.route("/product/:id")
    .put(isAuthenticated, productUpdate)
    .delete(isAuthenticated, productDeletion)
    .get( isAuthenticated, getSpcificProduct)

module.exports = router