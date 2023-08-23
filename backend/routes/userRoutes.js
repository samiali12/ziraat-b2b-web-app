const express = require('express')

const { userRegistration, userLogin, getUserDetails,
    userLogout, passwordResettingUrl, updatePassword,
    deleteUser, profileUpdate, passwordResetting, emailVerification, sendEmailVerification } = require('../controllers/userController')

const { isAuthenticated } = require('../middleware/authentication')

const router = express.Router()

// router.route("/login").get((request, response) => {
//          console.log("Hello")
//   response.status("200").json({
//     success: true,
//     message: "Hello World"
//   })})

router.route("/signup").post(userRegistration)
router.route("/login").post(userLogin)
router.route("/logout").get(userLogout)
router.route("/user/verify-email/:token").put(emailVerification)
router.route("/sendEmailVerification").post(sendEmailVerification)
router.route("/password/forget").post(passwordResettingUrl)
router.route("/password/reset/:token").put(passwordResetting)
router.route("/password/update").put(updatePassword)
router.route("/user/:id").get(getUserDetails)

router.route("/profile/update/user/:id")
    .put(isAuthenticated, profileUpdate)
    .delete(isAuthenticated, deleteUser)

module.exports = router