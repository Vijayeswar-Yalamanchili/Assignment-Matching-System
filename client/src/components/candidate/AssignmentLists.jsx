import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import ApiRoutes from '../../utils/ApiRoutes'
import AxiosService from '../../utils/AxiosService'
import { jwtDecode } from 'jwt-decode'
import { setAssignments } from '../../redux/adminDashboardSlice'
import { openModal } from "../../redux/modalSlice.js"
import AssignmentSubmitModal from '../../components/candidate/AssignmentSubmitModal'
import { toast } from 'react-toastify'

function AssignmentLists() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [list, setList] = useState([])    
    const getLoginToken = localStorage.getItem('loginToken')
    let decodedToken = jwtDecode(getLoginToken)
    let userId = decodedToken.id
    const assignments  = useSelector((state) => state.adminDashboard.assignments)
    const query = useSelector((state) => state.adminDashboard.query)

    const fetchAllAssignments = async() => {
        try {
            let res = await AxiosService.get(`${ApiRoutes.ALLASSIGNMENTS.path}/${userId}`, {headers : { 'Authorization' : `${getLoginToken}` }})
            if(res.status === 200) {
                setList(res.data.assignmentsList)
                dispatch(setAssignments(res.data.assignmentsList))
            }
        } catch (error) {
            toast.error(error.response.data.message || error.message)
        }
    }

    const getSubmittedDatas = async() => {
        try {
            let res = await AxiosService.get(`${ApiRoutes.GETSUBMITTEDTASK.path}/${userId}`, {headers : { 'Authorization' : `${getLoginToken}` }})
            // console.log(res.data)
            if(res.status === 200) {
                setSubmittedAssignment(res.data)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message || error.message)
        }
    }

    const handleProjectDetails = async(assignmentId) => {
        try {
            let res = await AxiosService.get(`${ApiRoutes.CURRENTASSIGNMENT.path}/${assignmentId}/${userId}`, {headers : { 'Authorization' : `${getLoginToken}` }})
            if(res.status === 200){
                navigate(`/projectDetails/${assignmentId}`)
            }
        } catch (error) {
            toast.error(error.response.data.message || error.message)
        }
    }

    useEffect(() => {
        fetchAllAssignments()
        // getSubmittedDatas()
    }, [dispatch,list])

    const filteredAssignments = list.filter((assignment) =>assignment?.name?.toLowerCase().includes(query.toLowerCase()))

    return <>
        <div className="w-full p-8 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-16 mx-auto my-6">
            {
                filteredAssignments && filteredAssignments.length >= 1 ?  filteredAssignments.map((assignment) => (
                        <div key={assignment._id} className="p-5 w-auto outline bg-white shadow rounded mb-4">
                            <div className='h-16'><h3 className="font-semibold text-2xl">{assignment.name}</h3></div>
                            <div className='flex flex-row justify-between'>
                                <p className="text-sm text-gray-500 mr-2">Task Start date : </p>
                                <p className="text-sm text-gray-500 mr-2">{assignment.startDate ? format(new Date(assignment.startDate), 'dd-MM-yyyy') : ''}</p>
                            </div>                        
                            <div className='flex flex-row justify-between'>
                                <p className="text-sm text-gray-500 mr-2">Task End date : </p>
                                <p className="text-sm text-gray-500 mr-2">{assignment.endDate ? format(new Date(assignment.endDate), 'dd-MM-yyyy') : ''}</p>
                            </div>
                            <div className='flex flex-row justify-between'>
                                <p className="text-sm text-gray-500 mr-2">Status : </p>
                                <p className={`text-sm ${new Date(assignment.endDate) < new Date() ? "text-red-500" : assignment.taskAvailableStatus === "Open to work" ? "text-green-500" : assignment.taskAvailableStatus === "Closed" ? "text-red-500" : "text-gray-500"}`}>
                                    {/* {assignment.taskAvailableStatus} */}
                                    {new Date(assignment.endDate) < new Date() ? "Closed" : assignment.taskAvailableStatus}
                                </p>
                            </div>
                            <div className='mt-4'>
                                <button onClick={(e)=> handleProjectDetails(assignment._id)} className={`px-4 py-2 w-full rounded-lg font-semibold ${assignment.taskAvailableStatus === "Open to work" ? "outline outline-blue-500 bg-white text-black hover:bg-blue-600 hover:text-white cursor-pointer" : "bg-gray-400 cursor-not-allowed"}`} disabled={assignment.taskAvailableStatus === "Closed"}>{assignment.taskAvailableStatus === "Open to work" ? "View Details & Submit" : "Closed"}</button>
                                {/* <button type="button" onClick={() => {
                                    setSelectedAssignmentId(assignment._id)
                                    dispatch(openModal())
                                    }} className='mt-4 px-4 py-2 w-full rounded-lg font-semibold outline outline-green-500 bg-white text-black hover:bg-green-600 hover:text-white cursor-pointer'>Submit Task</button>
                                <AssignmentSubmitModal assignmentId = {selectedAssignmentId}/> */}
                            </div>
                        </div>
                    )) : <>
                    <div>No Assignment found</div>
                </>
            }
        </div>
    </>
}

export default AssignmentLists