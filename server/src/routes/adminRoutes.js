import express from 'express'
import auth from '../helper/auth.js'
import adminAuthController from '../controller/adminAuthController.js'
import adminUserController from '../controller/adminUserController.js'
import adminAssignmentController from '../controller/adminAssignmentController.js'

const router = express.Router()

router.post('/login',adminAuthController.login)
router.post('/register',adminAuthController.register)
router.post('/forgotpassword',adminAuthController.forgotPassword)
router.put('/logout/:id',adminAuthController.logout)

router.get('/allusers/:id',auth.adminAuthenticate,auth.adminGuard,adminUserController.allUsers)
router.get('/getcurrentuser/:id', auth.adminAuthenticate, auth.adminGuard, adminUserController.getCurrentUser)
router.put('/edituser/:userId/:id',auth.adminAuthenticate,adminUserController.editUser)
router.delete('/deleteuser/:userId/:id',auth.adminAuthenticate,adminUserController.deleteUser)

router.get('/getallassignments/:id', auth.adminAuthenticate,auth.adminGuard, adminAssignmentController.getAllAssignment)
router.get('/getcurrentassignment/:assignmentId/:userId',auth.adminAuthenticate,auth.adminGuard,adminAssignmentController.getCurrentassignment)
router.post('/addassignment/:id', auth.adminAuthenticate,auth.adminGuard, adminAssignmentController.addAssignments) 
// router.get('/getallproducts/:id', auth.adminAuthenticate, adminProductController.getAllProducts)
// router.put('/editproduct/:id', auth.adminAuthenticate,productImageUpload.imageUpload.single('imagefile'), adminProductController.updateProduct)
// router.delete('/deleteproduct/:id', auth.adminAuthenticate, adminProductController.removeProduct)

router.put('/updatecurrentuser/:id', auth.adminAuthenticate, adminUserController.updateProfileData)

export default router