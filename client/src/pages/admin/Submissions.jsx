import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import ApiRoutes from '../../utils/ApiRoutes'
import AxiosService from '../../utils/AxiosService'
import { useDispatch } from 'react-redux'
import { jwtDecode } from 'jwt-decode'

function Submissions() {
  
  const params = useParams()
  const dispatch = useDispatch()
  const [assignmentNameData, setassignmentNameData] = useState("")
  const [assignmentDetails, setassignmentDetails] = useState("")
  const getLoginToken = localStorage.getItem('adminLoginToken')
  let decodedToken = jwtDecode(getLoginToken)
  let userId = decodedToken.id

  const handleGetCurrentAssignment = async() => {
    try {
      let res = await AxiosService.get(`${ApiRoutes.ADMINCURRENTASSIGNMENT.path}/${params.assignmentId}/${userId}`, {headers : { 'Authorization' : `${getLoginToken}` }})
      if(res.status === 200){
        setassignmentDetails(res.data.currentassignment)
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message)        
    }
  }

  useEffect(() => {
    handleGetCurrentAssignment()
  }, [])

  return <>
    <div className="p-4">
      <h2 className="text-lg font-semibold">{assignmentDetails.name} - Submitted By:</h2>
      {
        assignmentDetails.taskSubmittedBy ? (
          <ol className="list-decimal ml-6">
            {assignmentDetails.taskSubmittedBy.map((id, index) => (
              <li key={index} className="text-gray-800">{id}</li>
            ))}
          </ol>
        ) : (
          <p>Loading...</p>
        )
      }
    </div>
  </>
}

export default Submissions