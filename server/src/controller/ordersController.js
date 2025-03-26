import OrdersModel from "../models/orderModel.js"

const updateOrderDatas = async(req,res) => {
    try {
        const updateOrderData = await OrdersModel.findByIdAndUpdate({_id : req.body.id},{ $set : { orderId : req.body.orderId, paymentId : req.body.paymentId} })
        res.status(200).send({
            updateOrderData
        })
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error in Getting all stays"
        })
    }
}

const getMyOrders = async(req,res) => {
    try {
        const ordersList = await OrdersModel.find({currentUserId : req.params.id})
        res.status(200).send({
            ordersList
        })
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error in Getting all orders"
        })
    }
}

export default {
    updateOrderDatas,
    getMyOrders
}