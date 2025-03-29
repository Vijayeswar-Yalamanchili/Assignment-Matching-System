import SubmissionsModal from '../models/submissionsModel.js'
import AssignmentsModel from '../models/assignmentsModel.js'

const addAssignments = async(req,res) => {
    try {
        const { name,description,requirements, submissionGuidelines, startDate, endDate,taskAvailableStatus } = req.body   
        const addAssignment = await AssignmentsModel.create({name : name, description : description, requirements : requirements, submissionGuidelines : submissionGuidelines, startDate : startDate, endDate : endDate, taskAvailableStatus : taskAvailableStatus})
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
            res.status(200).send({
                assignmentsList,
            })
        }
    } catch (error) {
        res.status(500).send({
            message : "Internal server error in getting all product data"
        })
    }
}

const getCurrentassignment = async(req,res) => {
    try {
        let currentassignment = await AssignmentsModel.findById({_id : req.params.assignmentId})
        res.status(200).send({
            currentassignment
        }) 
    } catch (error) {
        res.status(500).send({
            message : "Internal error in fetching Users list"
        })
    }
}

const getSubmittedAssignment = async(req,res) => {
    try {
        const {submittedUserId, assignmentId} = req.params
        let submittedAssignment = await SubmissionsModal.findOne({ userId : submittedUserId, assignmentId: assignmentId })
        // console.log(submittedAssignment)
        res.status(200).send({
            submittedAssignment
        }) 
    } catch (error) {
        res.status(500).send({
            message : "Internal error in fetching Users list"
        })
    }
}

const reviewsubmission = async(req,res) => {
    try {
        // console.log(result)
        const {result} = req.body
        const {currentsubmissionId, assignmentId,userId,submittedUser} = req.params
        let updatedSubmission = await SubmissionsModal.findByIdAndUpdate({ _id : currentsubmissionId}, {$set : req.body}, {new : true})
        await AssignmentsModel.findOneAndUpdate(
            { _id: assignmentId, "taskSubmittedBy.userId": submittedUser },
            { $set: { "taskSubmittedBy.$.reviewStatus": "Completed", "taskSubmittedBy.$.result" : result } },
            { new: true }
        );
        res.status(200).send({
            updatedSubmission
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
    getCurrentassignment,
    getSubmittedAssignment,
    reviewsubmission
}