import OrderModel from '../models/orderModel.js'

const getAllOrders = async(req,res) => {
    try {
        let ordersList = await OrderModel.find()
        if(ordersList){
            let ordersCount = await OrderModel.countDocuments()
            res.status(200).send({
                ordersList,
                ordersCount
            })
        }
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in getting all Orders data"
        })
    }
}

export default {
    getAllOrders
}
