import React, { useState } from 'react'
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import AdminNavbar from '../../components/admin/AdminNavbar'
import AdminFooter from '../../components/admin/AdminFooter'
import AxiosService from '../../utils/AxiosService'
import ApiRoutes from '../../utils/ApiRoutes'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function AdminRegister() {

  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  let formik = useFormik({
    initialValues:{
      firstName:'',
      lastName:'',
      email:'',
      mobile:'',
      password:'',
      confirmPassword:''
    },
    validationSchema:Yup.object({       
      firstName:Yup.string().required('Firstname is required').max(20,'Name can not exceed 20 characters').min(3,'firstName can not be shorter than 3 leters'),
      lastName:Yup.string().required('Lastname is required').max(20,'Name can not exceed 20 characters').min(1,'LastName can not be shorter than 3 leters'),
      email:Yup.string().required('Email is required').email('Enter a valid email'),
      mobile:Yup.string().required('Mobile is required').matches(/^\d{10}$/,'Enter a valid mobile number'),
      password:Yup.string().required('Password is required').matches(/^[a-zA-Z0-9!@#$%^&*]{8,15}$/,'Enter a valid Password'),
      confirmPassword:Yup.string().required('Confirm Password is required').matches(/^[a-zA-Z0-9!@#$%^&*]{8,15}$/,'Confirm Password should match Password')
    }),
    onSubmit : async(values) => {
        try {  
          setLoading(true)
          if(values.password === values.confirmPassword){
            let res = await AxiosService.post(`${ApiRoutes.ADMINREGISTER.path}`,values)
            if(res.status === 200){
              navigate('/admin')
            }  
            setLoading(false)   
          }else{
            toast.error("Passwords doesnt match! Please enter the same passwords")
          }
        } catch (error) {
            toast.error(error.response.data.message || error.message)
        }
    }
  })
  
  return <>
    <AdminNavbar/>
    <div className="w-full max-w-sm m-auto my-12">
      <form onSubmit={formik.handleSubmit} className="bg-white outline outline-stone-300 rounded-3xl p-12 mb-4" >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" for="firstName">First Name</label>
          <input id="firstName" type='text' name='firstName' placeholder="FirstName" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={formik.handleChange} value={formik.values.firstName} onBlur={formik.handleBlur}/>
          {formik.touched.firstName && formik.errors.firstName ? (<p className="text-sm text-red-500">{formik.errors.firstName}</p>) : null}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" for="lastName">Last Name</label>
          <input id="lastName" type='text' name='lastName' placeholder="LastName" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={formik.handleChange} value={formik.values.lastName} onBlur={formik.handleBlur}/>
          {formik.touched.lastName && formik.errors.lastName ? (<p className="text-sm text-red-500">{formik.errors.lastName}</p>) : null}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
          <input id="email" type='email' name='email' placeholder="Email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur}/>
          {formik.touched.email && formik.errors.email ? (<p className="text-sm text-red-500">{formik.errors.email}</p>) : null}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" for="mobile">Mobile</label>
          <input id="mobile" type='text' name='mobile' placeholder="Mobile" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={formik.handleChange} value={formik.values.mobile} onBlur={formik.handleBlur}/>
          {formik.touched.mobile && formik.errors.mobile ? (<p className="text-sm text-red-500">{formik.errors.mobile}</p>) : null}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
          <input id="password" type="password" name='password' placeholder="**************" className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur}/>
          {formik.touched.password && formik.errors.password ? (<p className="text-sm text-red-500">{formik.errors.password}</p>) : null}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" for="confirmPassword">Re-enter Password</label>
          <input id="confirmPassword" type='text' name='confirmPassword' placeholder="Re-enter Password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={formik.handleChange} value={formik.values.confirmPassword} onBlur={formik.handleBlur}/>
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (<p className="text-sm text-red-500">{formik.errors.confirmPassword}</p>) : null}
        </div>

        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" disabled={loading}>{ loading ? <FontAwesomeIcon icon={faSpinner}/> : 'Register'}</button>
          <Link to={'/admin'} className="inline-block align-baseline text-sm text-blue-500 hover:text-blue-800">Existing User? Login</Link>
        </div>
      </form>
    </div>
    <AdminFooter/>
  </>
}

export default AdminRegister