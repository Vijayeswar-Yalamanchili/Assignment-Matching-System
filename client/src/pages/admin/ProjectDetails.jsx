import React, { useEffect, useState } from "react";
import AdminNavbar from "../../components/admin/AdminNavbar";
import AdminFooter from "../../components/admin/AdminFooter";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AxiosService from "../../utils/AxiosService";
import ApiRoutes from "../../utils/ApiRoutes";
import { jwtDecode } from "jwt-decode";

function ProjectDetails() {
  
  const params = useParams()
  const [loading, setLoading] = useState(false)
  const [assignmentName, setassignmentName] = useState("")
  const getLoginToken = localStorage.getItem('adminLoginToken')
  let decodedToken = jwtDecode(getLoginToken)
  let userId = decodedToken.id

  const handleGetCurrentAssignment = async() => {
    try {
      setLoading(true)
      let res = await AxiosService.get(`${ApiRoutes.ADMINCURRENTASSIGNMENT.path}/${userId}/${params.assignmentId}`)
      console.log(res.data)
      // setValidUrl(true);
      // if(res.status === 200){
      //     toast.success(res.data.message)
      // }
      setLoading(false)
    } catch (error) {
      toast.error(error.response.data.message || error.message)        
    }
  }

  useEffect(() => {
    handleGetCurrentAssignment()
    }, [assignmentName])

  return <>
    <AdminNavbar />
    <div>
      <div className="container">
        <div className="w-full mb-8">
          <div className="p-4">
            <ul className="flex items-center">
              <li className="flex items-center">
                <a href="/admin/dashboard" className="flex items-center text-base font-medium hover:text-primary dark:hover:text-primary text-dark dark:text-white">Dashboard</a>
                <span className="px-3 text-body-color dark:text-dark-6">{" "}/{" "}</span>
              </li>
              <li className="text-base font-medium text-body-color dark:text-dark-6">Project Name Details</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <AdminFooter />
  </>
}

export default ProjectDetails