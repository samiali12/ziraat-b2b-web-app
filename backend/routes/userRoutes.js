const express = require('express')
const { userRegistration, userLogin , forgetPassword, userLogout} = require('../controllers/userController')

const router = express.Router()

router.route("/register").post(userRegistration)
router.route("/login").post(userLogin)
router.route("/logout").get(userLogout)
router.route("/forgot-password").post(forgetPassword)

module.exports = router