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

router.get('/getcurrentuser/:id', auth.adminAuthenticate, auth.adminGuard, adminUserController.getCurrentUser)

router.get('/getallassignments/:id', auth.adminAuthenticate,auth.adminGuard, adminAssignmentController.getAllAssignment)
router.get('/getcurrentassignment/:assignmentId/:userId',auth.adminAuthenticate,auth.adminGuard,adminAssignmentController.getCurrentassignment)
router.post('/addassignment/:id', auth.adminAuthenticate,auth.adminGuard, adminAssignmentController.addAssignments) 
router.get('/getsubmittedassignment/:assignmentId/:submittedUserId/:userId', auth.adminAuthenticate, adminAssignmentController.getSubmittedAssignment)
router.put('/reviewsubmission/:currentsubmissionId/:assignmentId/:submittedUser/:userId', auth.adminAuthenticate, adminAssignmentController.reviewsubmission)

export default router