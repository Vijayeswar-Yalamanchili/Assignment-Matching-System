import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

function AssignmentLists() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [currentProjectCard, setCurrentProjectCard] = useState([])
    const assignments  = useSelector((state) => state.adminDashboard.assignments)
    const query = useSelector((state) => state.adminDashboard.query)
    const filteredAssignments = assignments.filter((assignment) =>assignment.name.toLowerCase().includes(query.toLowerCase()))

    const handleProjectDetails = async(assignmentId) => {
        try {
            console.log(assignmentId)
            navigate(`/admin/projectDetails/${assignmentId}`)
            // let res = await AxiosService.get(`${ApiRoutes.GETCURRENTPROJECTCARDDATA.path}/${userId}/${projectId}`, {headers : { 'Authorization' : `${getLoginToken}` }})
            // if(res.status === 200){
            //     setCurrentProjectCard(res.data.currentProjectCardData)
            // }
        } catch (error) {
            toast.error(error.response.data.message || error.message)
        }
    }

    return <>
        <div className="w-full p-8 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-16 mx-auto mt-6">
            {
                filteredAssignments.map((assignment) => (
                    <div key={assignment.id} className="p-5 w-auto outline bg-white shadow rounded mb-4">
                        <h3 className="font-semibold text-2xl">{assignment.name}</h3>
                        <div className='flex flex-row justify-between'>
                            <p className="text-sm text-gray-500 mr-2">Task Start date : </p>
                            <p className="text-sm text-gray-500 mr-2">{assignment.startDate}</p>
                        </div>                        
                        <div className='flex flex-row justify-between'>
                            <p className="text-sm text-gray-500 mr-2">Task End date : </p>
                            <p className="text-sm text-gray-500 mr-2">{assignment.endDate}</p>
                        </div>
                        <div className='flex flex-row justify-between'>
                            <p className="text-sm text-gray-500 mr-2">Status : </p>
                            <p className={`text-sm ${assignment.status === "Open to work" ? "text-green-500" : assignment.status === "Closed" ? "text-red-500" : "text-gray-500"}`}>{assignment.status}</p>
                        </div>
                        <div className='mt-4'>
                            <button onClick={()=> handleProjectDetails(assignment.id)} className={`px-4 py-2 w-full rounded-lg text-white font-semibold ${assignment.status === "Open to work" ? "bg-blue-500 hover:bg-blue-600 cursor-pointer" : "bg-gray-400 cursor-not-allowed"}`} disabled={assignment.status !== "Open to work"}>{assignment.status === "Open to work" ? "View Details" : "Closed"}</button>
                        </div>
                    </div>
                ))
            }
        </div>
    </>
}

export default AssignmentLists