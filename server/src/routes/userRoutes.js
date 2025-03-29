import express from 'express'
import userAuthController from '../controller/userAuthController.js'
import userController from '../controller/userController.js'
import auth from '../helper/auth.js'

const router = express.Router()

router.post('/login',userAuthController.login)
router.post('/register',userAuthController.register)
router.post('/forgotpassword',userAuthController.forgotPassword)
router.put('/logout/:id',userAuthController.logout)

// //user
router.post('/submittask/:userId/:assignmentId',auth.authenticate,userController.submittask)
router.get('/getcurrentassignment/:userId/:assignmentId',auth.authenticate,userController.getCurrentassignment)
router.get('/allassignments/:id', auth.authenticate,userController.allAssignments)
router.get('/currentuser/:id', auth.authenticate,userController.currentUserData)
router.get('/getcurrentsubmittedassignment/:assignmentId/:userid', auth.authenticate,userController.getCurrentSubmittedAssignment)

export default router