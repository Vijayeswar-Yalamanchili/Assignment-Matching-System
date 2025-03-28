import AssignmentsModel from '../models/assignmentsModel.js'
import UserAuthModel from '../models/userAuthModel.js'
import SubmissionsModel from '../models/submissionsModel.js'

const submittask = async(req,res) => {
    try {
        const {userName,userId,assignmentName, assignmentId, githubrepo, demolink, submissionDate } = req.body   
        const submission = await SubmissionsModel.findOneAndUpdate(
            { userId, assignmentId },
            { userName, assignmentName, githubrepo, demolink, submissionDate },
            { new: true, upsert: true } 
        )
        let assignmentsubmissionData = await AssignmentsModel.findOneAndUpdate(
            { _id : req.body.assignmentId},
            { $addToSet: { taskSubmittedBy : req.body.userId } }, 
            { new: true, upsert: true  }
        )
        res.status(200).send({
            submission,
            assignmentsubmissionData
        }) 
    } catch (error) {console.log(error)
        res.status(500).send({
            message : "Internal server error in adding new product"
        })
    }
}

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

// const getSubmittedAssignment = async(req,res) => {
//     try {
//         console.log(req.params)
//         // const {userId, assignmentId} = req.params
//         let submittedAssignment = await AssignmentsModel.findById({_id : assignmentId})
//         console.log(submittedAssignment)
//         // res.status(200).send({
//         //     submittedAssignment
//         // })
//     } catch (error) {
//         console.log(error)
//         res.status(500).send({
//             message : "Internal server error in getting product list"
//         })
//     }
// }

export default {
    submittask,
    getCurrentassignment,
    allAssignments,
    currentUserData,
    // getSubmittedAssignment,
}