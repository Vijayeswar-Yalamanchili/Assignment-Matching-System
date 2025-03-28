import AssignmentsModel from '../models/assignmentsModel.js'
import UserAuthModel from '../models/userAuthModel.js'

const getCurrentassignment = async(req,res) => {
    try {
        let currentassignment = await AssignmentsModel.findById({_id : req.params.userId})
        res.status(200).send({
            currentassignment
        }) 
    } catch (error) {
        res.status(500).send({
            message : "Internal error in fetching Users list"
        })
    }
}
const allAssignments = async(req,res) => {
    try {
        let assignmentsList = await AssignmentsModel.find()
        if(assignmentsList){
            res.status(200).send({
                assignmentsList
            })
        }
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in getting users data"
        })
    }
}

const currentUserData = async(req,res) => {
    try {
        const currentUser = await UserAuthModel.findById({_id : req.params.id})
        res.status(200).send({
            currentUser
        })
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in getting current User data"
        })
    }
}

const userprofileUpdate = async(req,res) => {
    try {
        const updatedProfile = await UserAuthModel.findByIdAndUpdate({_id : req.params.id}, {$set : req.body},{new :true})
        res.status(200).send({
            updatedProfile
        })
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in updating profile data"
        })
    }
}

// const getAllProducts = async(req,res) => {
//     try {
//         let productsList = await ProductModel.find()
//         res.status(200).send({
//             productsList
//         })
//     } catch (error) {
//         res.status(500).send({
//             message : "Internal server error in getting product list"
//         })
//     }
// }

const addCartList = async(req,res) => {
    try {
        let user = await UserAuthModel.findById({_id : req.params.id})
        if(user){
            if(!user.cartList.includes(req.params.productId)){
                let addToCart = await UserAuthModel.findByIdAndUpdate({_id:req.params.id},{$push : {cartList : {productId : req.params.productId}}})
                await ProductModel.findByIdAndUpdate({_id : req.params.productId}, {$set : {productQuantity : 1}},{new : true})
                res.status(200).send({
                    addToCart
                })
            }
        }else{
            res.status(400).send({
                message : "Something went wrong in adding to cart"
            })
        }
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in adding to cart"
        })
    }
}

const removeCartList = async(req,res) => {
    try {
        let user = await UserAuthModel.findById({_id : req.params.id})
        if(user){
            if(!user.cartList.includes(req.params.productId)){
                let removeFromCart = await UserAuthModel.findByIdAndUpdate({_id:req.params.id},{$pull : {cartList : {productId : req.params.productId}}})
                await ProductModel.findByIdAndUpdate({_id : req.params.productId}, {$set : {productQuantity : 0}},{new : true})
                res.status(200).send({
                    removeFromCart
                })
            }
        }else{
            res.status(400).send({
                message : "Something went wrong in removing to cart"
            })
        }
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in removing to cart"
        })
    }
}

const clearCartItems = async(req,res) => {
    try {
        // let user = await UserAuthModel.findById({_id : req.params.id})
        // if(user){
        //     if(!user.cartList.includes(req.params.productId)){
                let clearCart = await UserAuthModel.findByIdAndUpdate({_id:req.params.id},{$set : {cartList : []}})
                
                res.status(200).send({
                    clearCart
                })
        
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in clearing to cart"
        })
    }
}

const cartItemsList = async(req,res) => {
    try {
        let user = await UserAuthModel.findById({_id : req.params.id})
        if(user) {
            let cartItems = await Promise.all(
                user.cartList.map((e) => {
                    return ProductModel.findById(e.productId)
                })
            )
            res.status(200).send({
                cartItems
            })
        }else {
            res.status(400).send({
                message : "No Items in cart"
            }) 
        }        
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in getting product list"
        })
    }
}

// const updateQuantity = async(req,res) => {
//     try {
//         const { value } = req.body
//         let product = await ProductModel.findById({_id : req.params.productId})
//         if(product){
//             let quantity = await ProductModel.findByIdAndUpdate({_id : req.params.productId}, {$set : {productQuantity : product.productQuantity + value}},{new : true})
//             res.status(200).send({
//                 quantity
//             })
//         }        
//     } catch (error) {
//         res.status(500).send({
//             message : "Internal server error in getting product quantity"
//         })
//     }
// }

export default {
    getCurrentassignment,
    allAssignments,
    currentUserData,
    userprofileUpdate,
    // getAllProducts,
    addCartList,
    removeCartList,
    clearCartItems,
    cartItemsList,
    // updateQuantity
}