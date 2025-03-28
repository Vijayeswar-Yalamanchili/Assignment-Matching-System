import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { setAssignments } from '../../redux/adminDashboardSlice'
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
      // setLoading(true)
      let res = await AxiosService.get(`${ApiRoutes.ADMINCURRENTASSIGNMENT.path}/${params.assignmentId}/${userId}`, {headers : { 'Authorization' : `${getLoginToken}` }})
      console.log(res.data)
      if(res.status === 200){
        setassignmentDetails(res.data.currentassignment)
        // setassignmentNameData(res.data.currentassignment.name)
      }
      // setLoading(false)
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message || error.message)        
    }
  }

  useEffect(() => {
    handleGetCurrentAssignment()
  }, [])

  return <>
    
  </>
}

export default Submissions