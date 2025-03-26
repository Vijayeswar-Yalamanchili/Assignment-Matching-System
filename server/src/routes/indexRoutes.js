import express from 'express'
import userRoutes from './userRoutes.js'
import adminRoutes from './adminRoutes.js'
import orderRoutes from './orderRoutes.js'

const router = express.Router()

router.use('/candidates',userRoutes)
router.use('/admin',adminRoutes)
// router.use('/payment',paymentRoutes)
router.use('/orders',orderRoutes) 

export default router