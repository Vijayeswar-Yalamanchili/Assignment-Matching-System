import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { jwtDecode } from 'jwt-decode'
import { toast } from 'react-toastify'
import { setAssignments } from '../../redux/adminDashboardSlice'
import ApiRoutes from '../../utils/ApiRoutes'
import AxiosService from '../../utils/AxiosService'

function AssignmentLists() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [list, setList] = useState([])
    const getLoginToken = localStorage.getItem('adminLoginToken')
    let decodedToken = jwtDecode(getLoginToken)
    let userId = decodedToken.id
    const assignments  = useSelector((state) => state.adminDashboard.assignments)
    const query = useSelector((state) => state.adminDashboard.query)

    const fetchAllAssignments = async() => {
        try {
            let res = await AxiosService.get(`${ApiRoutes.ADMINALLASSIGNMENTS.path}/${userId}`, {headers : { 'Authorization' : `${getLoginToken}` }})
            if(res.status === 200) {
                setList(res.data.assignmentsList)
                dispatch(setAssignments(res.data.assignmentsList))
            }
        } catch (error) {
            toast.error(error.response.data.message || error.message)
        }
    }

    const handleProjectDetails = async(assignmentId) => {
        try {
            let res = await AxiosService.get(`${ApiRoutes.ADMINCURRENTASSIGNMENT.path}/${assignmentId}/${userId}`, {headers : { 'Authorization' : `${getLoginToken}` }})
            if(res.status === 200){
                navigate(`/admin/projectDetails/${assignmentId}`)
            }
        } catch (error) {
            toast.error(error.response.data.message || error.message)
        }
    }

    useEffect(() => {
        fetchAllAssignments()
    }, [dispatch,list])

    const filteredAssignments = list.filter((assignment) =>assignment.name.toLowerCase().includes(query.toLowerCase()))

    return <>
        <div className="w-full p-8 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-16 mx-auto mt-6">
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
                                    {new Date(assignment.endDate) < new Date() ? "Closed" : assignment.taskAvailableStatus}
                                </p>
                            </div>
                            <div className='flex flex-row justify-between'>
                                <Link to={`/admin/submissons/${assignment._id}`}><p className="text-lg text-gray-500 mr-2">Submissions : </p></Link>
                                <p className="text-sm text-gray-500 mr-2">{assignment.taskSubmittedBy.length}</p>
                            </div>
                            <div className='mt-4'>
                                <button onClick={(e)=> handleProjectDetails(assignment._id)} className={`px-4 py-2 w-full rounded-lg text-white font-semibold ${assignment.taskAvailableStatus === "Open to work" ? "bg-blue-500 hover:bg-blue-600 cursor-pointer" : "bg-gray-400 cursor-not-allowed"}`} disabled={assignment.taskAvailableStatus === "Closed"}>{assignment.taskAvailableStatus === "Open to work" ? "View Details" : "Closed"}</button>
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