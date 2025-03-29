import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronDown, ChevronUp } from "lucide-react"
import AxiosService from '../../utils/AxiosService'
import ApiRoutes from '../../utils/ApiRoutes'
import { jwtDecode } from 'jwt-decode'
import { toast } from 'react-toastify'

function TaskDataAccordion({assignmentDetails, assignmentIdData}) {

    let navigate = useNavigate()
    const [openIndex, setOpenIndex] = useState(null)
    const [formData, setFormData] = useState({ githubrepo: "", demolink: "" })
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [currentSubmittedAssignment, setCurrentSubmittedAssignment] = useState(null)
    const getLoginToken = localStorage.getItem('loginToken')
    let decodedToken = jwtDecode(getLoginToken)
    let userid = decodedToken.id
    let assignmentID = assignmentDetails && assignmentDetails?._id

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    const toggleFormAccordion = () => {
        setIsFormOpen(!isFormOpen)
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        const submissionData = {
            ...formData,
            assignmentName : `${assignmentDetails.name}`,
            assignmentId : `${assignmentDetails._id}`,
            userName: `${decodedToken.firstName} ${decodedToken.lastName}`,
            userId : `${decodedToken.id}`
        }
        try {
            let res = await AxiosService.post(`${ApiRoutes.SUBMITASSIGNMENT.path}/${assignmentID}/${userid}`,submissionData, {headers : { 'Authorization' : `${getLoginToken}` }})
            if(res.status === 200){
                setFormData({ githubrepo: "", demolink: "" })
                navigate('/dashboard')
            }
        } catch (error) {
            toast.error(error.response.data.message || error.message)
        }
    }

    const handleGetCurrentSubmission = async() => {
        try {
            console.log(assignmentIdData)
            let res = await AxiosService.get(`${ApiRoutes.CURRENTSUBMITTEDASSIGNMENT.path}/${assignmentIdData}/${userid}`, {headers : { 'Authorization' : `${getLoginToken}` }})
            if(res.status === 200){
                setCurrentSubmittedAssignment(res.data.submittedAssignment)
            }
        } catch (error) {
          toast.error(error.response.data.message || error.message)        
        }
    }

    const accordionItems = [
        { title: "Description", content: `${assignmentDetails.description}`},
        { title: "Requirements", content: `${assignmentDetails.requirements}` },
        { title: "Submission Methods", content: `${assignmentDetails.submissionGuidelines}`}    
    ]

    useEffect(()=> {
        handleGetCurrentSubmission()
    },[])

    return <>
        <div className="w-full px-25 mx-auto mb-16">
            {
                accordionItems.map((item, index) => (
                    <div key={index} className="border-b border-gray-300">
                        <button className="flex justify-between items-center w-full p-4 text-lg font-medium text-left bg-gray-100 hover:bg-gray-200 transition" onClick={() => toggleAccordion(index)}>
                            {item.title}
                            {
                                openIndex === index ? <ChevronUp className="w-5 h-10" /> : <ChevronDown className="w-5 h-10" />                                    
                            }
                        </button>
                        {
                            openIndex === index && <div className="p-4 bg-white text-gray-700 border-t border-gray-200">{item.content}</div>
                        }
                    </div>
                ))
            }

            {currentSubmittedAssignment?.feedback && (
                <div className="border-b border-gray-300 mt-4">
                    <button className="flex justify-between items-center w-full p-4 text-lg font-medium text-left bg-gray-100 hover:bg-gray-200 transition"
                        onClick={() => toggleAccordion("feedback")}>
                        Feedback
                        {openIndex === "feedback" ? <ChevronUp className="w-5 h-10" /> : <ChevronDown className="w-5 h-10" />}
                    </button>
                    {openIndex === "feedback" && (
                        <div className="p-4 bg-white text-gray-700 border-t border-gray-200">
                            {currentSubmittedAssignment?.feedback}
                        </div>
                    )}
                </div>
            )}


            <div className="border-b border-gray-300 mt-4">
                <button className="flex justify-between items-center w-full p-4 text-lg font-medium text-left bg-gray-100 hover:bg-gray-200 transition" onClick={toggleFormAccordion}>
                    {isFormOpen ? "Task Submission" : "Task Submission"} 
                    {isFormOpen ? <ChevronUp className="w-5 h-10" /> : <ChevronDown className="w-5 h-10" />}
                </button>
                {isFormOpen && (
                    <div className="p-4 bg-white text-gray-700 border-t border-gray-200">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input type="text" name="githubrepo" placeholder="Github Repo Link" value={formData.githubrepo} onChange={handleChange} className="w-full p-2 border rounded-md" required/>
                            <input type="text" name="demolink" placeholder="Demo Link" value={formData.demolink} onChange={handleChange} className="w-full p-2 border rounded-md"/>
                            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">Submit</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    </>
}

export default TaskDataAccordion