import React, { useEffect, useState } from "react";
import AdminNavbar from "../../components/admin/AdminNavbar";
import AdminFooter from "../../components/admin/AdminFooter";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AxiosService from "../../utils/AxiosService";
import ApiRoutes from "../../utils/ApiRoutes";
import { jwtDecode } from "jwt-decode";
import AdminBreadcrumb from "../../components/admin/AdminBreadcrumb";
import AdminTaskDataAccordion from "../../components/admin/AdminTaskDataAccordion";

function ProjectDetails() {
  
  const params = useParams()
  const [loading, setLoading] = useState(false)
  const [assignmentNameData, setassignmentNameData] = useState("")
  const [assignmentDetails, setassignmentDetails] = useState("")
  const getLoginToken = localStorage.getItem('adminLoginToken')
  let decodedToken = jwtDecode(getLoginToken)
  let userId = decodedToken.id

  const handleGetCurrentAssignment = async() => {
    try {
      setLoading(true)
      let res = await AxiosService.get(`${ApiRoutes.ADMINCURRENTASSIGNMENT.path}/${params.assignmentId}/${userId}`, {headers : { 'Authorization' : `${getLoginToken}` }})
      if(res.status === 200){
        setassignmentDetails(res.data.currentassignment)
        setassignmentNameData(res.data.currentassignment.name)
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
    <AdminBreadcrumb assignmentNameData={assignmentNameData}/>
    <AdminTaskDataAccordion assignmentDetails={assignmentDetails}/>
    <AdminFooter />
  </>
}

export default ProjectDetails