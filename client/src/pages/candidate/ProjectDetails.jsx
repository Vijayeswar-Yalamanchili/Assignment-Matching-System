import React, { useEffect, useState } from "react";
import AdminNavbar from "../../components/candidate/Navbar";
import AdminFooter from "../../components/candidate/Footer";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AxiosService from "../../utils/AxiosService";
import ApiRoutes from "../../utils/ApiRoutes";
import { jwtDecode } from "jwt-decode";
import Breadcrumb from "../../components/candidate/Breadcrumb";
import TaskDataAccordion from "../../components/candidate/TaskDataAccordion";

function ProjectDetails() {
  
  const params = useParams()
  const [loading, setLoading] = useState(false)
  const [assignmentNameData, setAssignmentNameData] = useState("")
  const [assignmentDetails, setassignmentDetails] = useState("")
  const [assignmentIdData, setAssignmentIdData] = useState(null)
  const getLoginToken = localStorage.getItem('loginToken')
  let decodedToken = jwtDecode(getLoginToken)
  let userId = decodedToken.id

  const handleGetCurrentAssignment = async() => {
    try {
      setLoading(true)
      let res = await AxiosService.get(`${ApiRoutes.CURRENTASSIGNMENT.path}/${params.assignmentId}/${userId}`, {headers : { 'Authorization' : `${getLoginToken}` }})
      if(res.status === 200){
        setassignmentDetails(res.data.currentassignment)
        setAssignmentNameData(res.data.currentassignment.name)
        setAssignmentIdData(res.data.currentassignment._id)
      }
      setLoading(false)
    } catch (error) {
      toast.error(error.response.data.message || error.message)        
    }
  }  

  useEffect(() => {
    handleGetCurrentAssignment()
  }, [assignmentNameData])

  return <>
    <AdminNavbar />
    <Breadcrumb assignmentNameData={assignmentNameData}/>
    <TaskDataAccordion assignmentDetails={assignmentDetails} assignmentIdData={params.assignmentId}/>
    <AdminFooter />
  </>
}

export default ProjectDetails