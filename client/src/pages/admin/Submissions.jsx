import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { jwtDecode } from 'jwt-decode'
import { openModal } from '../../redux/modalSlice'
import ApiRoutes from '../../utils/ApiRoutes'
import AxiosService from '../../utils/AxiosService'
import AdminNavbar from '../../components/admin/AdminNavbar'
import AdminFooter from '../../components/admin/AdminFooter'
import ReviewModal from '../../components/admin/ReviewModal'

function Submissions() {
  
  const params = useParams()
  const dispatch = useDispatch()
  const [assignmentDetails, setassignmentDetails] = useState("")
  const [currentSubmission, setCurrentSubmission] = useState(null)
  const [submittedUser, setsubmittedUser] = useState(null)
  const getLoginToken = localStorage.getItem('adminLoginToken')
  let decodedToken = jwtDecode(getLoginToken)
  let userId = decodedToken.id

  const isModalOpen = useSelector(state => state.modal.isOpen)

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

  const handleReview = async (submittedUserId) => {
    try {
      let res = await AxiosService.get(`${ApiRoutes.ADMINGETSUBMITTEDTASK.path}/${params.assignmentId}/${submittedUserId}/${userId}`, { headers: { 'Authorization': `${getLoginToken}` } })
      setsubmittedUser(submittedUserId)
      dispatch(openModal())
      if (res.status === 200) {
        setCurrentSubmission(res.data.submittedAssignment)
        
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    }
  }

  let gitRepo = currentSubmission?.githubrepo
  let ratingData = currentSubmission?.rating
  let feedbackData = currentSubmission?.feedback

  useEffect(() => {
    handleGetCurrentAssignment()
  }, [params.assignmentId, userId])

  return <>
    <AdminNavbar/>
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-5">{assignmentDetails.name} - Submitted By:</h2>
      {
        assignmentDetails?.taskSubmittedBy && assignmentDetails.taskSubmittedBy.length > 0 ? <>
          <table className="table-auto border-collapse border border-gray-300 w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">S.No</th> 
                <th className="border border-gray-300 p-2">User Name</th>
                <th className="border border-gray-300 p-2">Status</th>
                <th className="border border-gray-300 p-2">Actions</th>
                <th className="border border-gray-300 p-2">Result</th>
              </tr>
            </thead>
            <tbody>
              {assignmentDetails.taskSubmittedBy.map((user,i) => (
                <tr key={user.userId} className="text-center border border-gray-300">
                  <td className="border border-gray-300 p-2">{i+1}</td>
                  <td className="border border-gray-300 p-2">{user.userName}</td>
                  <td className="border border-gray-300 p-2">{user.taskStatus}</td>
                  <td className="border border-gray-300 p-2">
                    {
                      user.reviewStatus === "Completed" ? <button onClick={() => handleReview(user.userId)} className="outline px-3 py-1 border border-gray-500 rounded">Review Completed</button> : <button onClick={() => handleReview(user.userId)} className="outline px-3 py-1 border border-gray-500 rounded">Review</button>
                    }                    
                  </td>
                  <td className={`border border-gray-300 p-2 ${ user.result === "Shortlisted" ? "text-green-500" :  user.result === "Not Shortlisted" ? "text-red-500" :  "text-black"}`}>{user.result ? user.result : "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </> : <>
          <p>No submissions yet.</p>
        </>
      }
    </div>
    <AdminFooter/>

    {isModalOpen && <ReviewModal assignmentId={params.assignmentId} currentSubmission ={currentSubmission} gitRepo ={gitRepo} ratingData={ratingData} feedbackData={feedbackData} submittedUser={submittedUser}/>}

  </>
}

export default Submissions