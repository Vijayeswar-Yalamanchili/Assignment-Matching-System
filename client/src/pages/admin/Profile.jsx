import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { jwtDecode } from 'jwt-decode'
import { toast } from 'react-toastify'
import { fetchUserSuccess } from "../../redux/userSlice.js"
import AdminNavbar from '../../components/admin/AdminNavbar'
import AdminFooter from '../../components/admin/AdminFooter'
import AxiosService from '../../utils/AxiosService'
import ApiRoutes from '../../utils/ApiRoutes'

function Profile() {

  let dispatch = useDispatch()
  let getLoginToken = localStorage.getItem('adminLoginToken')
  const decodedToken = jwtDecode(getLoginToken)
  const id = decodedToken.id 
  const { user } = useSelector((state) => state.user)

  const fetchUser = async () => {
    try {      
      let res = await AxiosService.get(`${ApiRoutes.ADMINPROFILEUSER.path}/${id}`,{ headers : { 'Authorization' : ` ${getLoginToken}`}})
      if(res.status === 200){
        dispatch(fetchUserSuccess(res.data.profile))
      }
    } catch (error) {
        toast.error(error.response.data.message || error.message)
    }
  }

  useEffect(()=> {
    fetchUser()
  },[dispatch])

  return <>
    <AdminNavbar/>
      <div className="p-6 max-w-md mx-auto bg-white outline outline-stone-500 rounded-lg my-20">
        <h2 className="text-2xl font-bold text-gray-700 text-center">User Profile</h2>
        { user ? (
          <div className="mt-4 ">
            <div className='flex flex-row justify-center mb-3'>
              <p className="text-lg text-gray-600 w-40">Name</p>
              <p className="text-lg text-gray-600 w-40"> : {user.firstName} {user.lastName}</p>
            </div>
            <div className='flex flex-row justify-center mb-3'>
              <p className="text-lg text-gray-600 w-40">Email</p>
              <p className="text-lg text-gray-600 w-40"> : {user.email}</p>
            </div>
            <div className='flex flex-row justify-center mb-3'>
              <p className="text-lg text-gray-600 w-40">Mobile</p>
              <p className="text-lg text-gray-600 w-40"> : {user.mobile}</p>
            </div>
            
          </div>
        ): (
          <p className="text-gray-500">No user data found</p>
        )}
      </div>
    <AdminFooter/>
  </>
}

export default Profile