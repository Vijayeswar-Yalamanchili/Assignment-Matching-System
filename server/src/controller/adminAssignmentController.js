import AssignmentsModel from '../models/assignmentsModel.js'

const addAssignments = async(req,res) => {
    try {
        // console.log(req.body)
        const { name,description,requirements, submissionGuidelines, startDate, endDate } = req.body    
        const addAssignment = await AssignmentsModel.create({name : name, description : description, requirements : requirements, submissionGuidelines : submissionGuidelines, startDate : startDate, endDate : endDate})
        res.status(200).send({
            addAssignment
        }) 
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in adding new product"
        })
    }
}

const getAllAssignment = async(req,res) => {
    try {
        let assignmentsList = await AssignmentsModel.find()
        if(assignmentsList){
            // let productsCount = await ProductsModel.countDocuments()
            res.status(200).send({
                productsList,
                // productsCount
            })
        }
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in getting all product data"
        })
    }
}

// const updateProduct = async(req,res) => {
//     try {
//         const { title,weight,description,price } = req.body
//         const { filename } = req.file
//         let editedProduct = await ProductsModel.findByIdAndUpdate({_id : req.params.id}, {$set : {productTitle : title, productWeight : weight, productDescription : description, productPrice : price,productImage : filename}},{new : true})
//         res.status(200).send({
//             editedProduct
//         })
//     } catch (error) {
//         res.status(500).send({
//             message : "Internal server error in editing product"
//         })
//     }
// }

// const removeProduct = async(req,res) => {
//     try {
//         let deletedProduct = await ProductsModel.findByIdAndDelete({_id: req.params.id})
//         res.status(200).send({
//             deletedProduct
//         })
//     } catch (error) {
//         res.status(500).send({
//             message : "Internal server error in deleting product"
//         })
//     }
// }

const getCurrentassignment = async(req,res) => {
    try {
        console.log(req.params)
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

export default {
    addAssignments,
    getAllAssignment,
    // updateProduct,
    // removeProduct,
    getCurrentassignment
}