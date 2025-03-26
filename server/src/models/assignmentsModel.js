import mongoose from "./indexModel.js"

const assignmentSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    requirements : {
        type : String,
        required : true
    },
    submissionGuidelines : {
        type : String,
        required : true
    },
    startDate: {
        type: Date,
        default: Date.now, 
    },
    endDate: {
        type: Date,
        required: true
    },
    taskAvailableStatus : {
        type : String,
        required : true
    },
},
{ timestamps : true },
{ collection : 'assignments'})

const AssignmentsModel = mongoose.model("assignments",assignmentSchema)

export default AssignmentsModel