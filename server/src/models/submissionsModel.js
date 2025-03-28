import mongoose from "./indexModel.js"

const SubmissionSchema = new mongoose.Schema({
    userName : {
        type : String,
        required : true
    },
    userId : {
        type : String,
        required : true
    },
    assignmentId : {
        type : String,
        required : true
    },
    assignmentName : {
        type : String,
        required : true
    },
    githubrepo : {
        type : String,
        required : true
    },
    demolink : {
        type : String,
        required : true
    },
    submissionDate: {
        type: Date,
        default: Date.now, 
    },
    taskSubmitted : {
        type:Boolean,
        default:true,
    }
},
{ timestamps : true },
{ collection : 'submissions'})

const SubmissionsModel = mongoose.model("submissions",SubmissionSchema)

export default SubmissionsModel