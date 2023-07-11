const express = require('express')
const { userRegistration, userLogin , userLogout} = require('../controllers/userController')

const router = express.Router()

router.route("/register").post(userRegistration)
router.route("/login").post(userLogin)
router.route("/logout").get(userLogout)

module.exports = router