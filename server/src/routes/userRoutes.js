import express from 'express'
import userAuthController from '../controller/userAuthController.js'
import userController from '../controller/userController.js'
import auth from '../helper/auth.js'
// import addressController from '../controller/addressController.js'

const router = express.Router()

router.post('/login',userAuthController.login)
router.post('/register',userAuthController.register)
router.post('/forgotpassword',userAuthController.forgotPassword)
router.put('/logout/:id',userAuthController.logout)

// //user
router.get('/getcurrentassignment/:userId/:assignmentId',auth.authenticate,userController.getCurrentassignment)
router.get('/allassignments/:id', auth.authenticate,userController.allAssignments)
router.get('/currentuser/:id', auth.authenticate,userController.currentUserData)
// router.put('/profileupdate/:id', auth.authenticate,userController.userprofileUpdate)

// //address
// router.post('/addaddress/:id',auth.authenticate, addressController.addAddress)
// router.get('/getaddress/:id',auth.authenticate, addressController.getAddress)
// router.put('/editaddress/:id/:addressId',auth.authenticate, addressController.editAddress)
// router.delete('/deleteaddress/:id/:addressId',auth.authenticate, addressController.deleteAddress)

// //Products
// router.get('/cartitems/:id', auth.authenticate,userController.cartItemsList)
// router.get('/allproducts/:id',auth.authenticate, userController.getAllProducts)
// router.put('/addcart/:productId/:id', auth.authenticate, userController.addCartList)
// router.put('/removecart/:productId/:id', auth.authenticate, userController.removeCartList)
// router.put('/clearcart/:id', auth.authenticate, userController.clearCartItems)
// router.put('/updatequantity/:productId/:id', auth.authenticate, userController.updateQuantity)

export default router