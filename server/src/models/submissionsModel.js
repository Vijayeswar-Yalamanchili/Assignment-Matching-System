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
    result : {
        type : String,
        required : false
    },
    feedback: { 
        type: String, 
        default: '' 
    },
    rating: {  
        codeQuality: { 
            type: Number, 
            default: 0 
        },  
        functionality: { 
            type: Number, 
            default: 0 
        },  
        responsiveness: { 
            type: Number, 
            default: 0 
        }
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