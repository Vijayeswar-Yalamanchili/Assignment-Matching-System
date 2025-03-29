import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import ApiRoutes from '../../utils/ApiRoutes'
import AxiosService from '../../utils/AxiosService'
import { useDispatch } from 'react-redux'
import { jwtDecode } from 'jwt-decode'
import AdminNavbar from '../../components/admin/AdminNavbar'
import AdminFooter from '../../components/admin/AdminFooter'

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
    <AdminNavbar/>
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-5">{assignmentDetails.name} - Submitted By:</h2>
      {
        assignmentDetails?.taskSubmittedBy && assignmentDetails.taskSubmittedBy.length > 0 ? <>
          <ol className="list-decimal ml-6">
            {
              assignmentDetails.taskSubmittedBy.map((user) => {
                return <li key={user._id} className="text-gray-800">
                  {user.userName} {'=>'}  {user.userId}
                </li>
              })
            }
          </ol>
        </> : <>
          <p>No submissions yet.</p>
        </>
      }
    </div>
    <AdminFooter/>
  </>
}

export default Submissions