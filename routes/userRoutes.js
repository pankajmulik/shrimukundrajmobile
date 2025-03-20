const express = require('express')
const router = express.Router()
const { updateUser, getUser, addUser, verifyotp, sendverificationcode, verifycode, verifyUser, authenticateJWT } = require('../smmcotroller/userController')


router.get('/', getUser)
router.post('/signup', addUser)

router.post('/login', verifyUser)
router.put('/updateuser/:id', updateUser)
router.post('/send-verification-code', sendverificationcode);
router.post('/send-otp', verifycode)

module.exports = router








