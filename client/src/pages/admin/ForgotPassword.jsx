import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import AdminNavbar from '../../components/admin/AdminNavbar'
import AdminFooter from '../../components/admin/AdminFooter'
import AxiosService from '../../utils/AxiosService'
import ApiRoutes from '../../utils/ApiRoutes'

function ForgotPassword() {

  let navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  let formik = useFormik({
    initialValues:{
      email:'',
      password:'',      
      confirmPassword:''
    },
    validationSchema:Yup.object({          
      email:Yup.string().required('Email is required').email('Enter a valid email'),
      password:Yup.string().required('Password is required').matches(/^[a-zA-Z0-9!@#$%^&*]{8,15}$/,'Enter a valid Password'),
      confirmPassword:Yup.string().required('Confirm Password is required').matches(/^[a-zA-Z0-9!@#$%^&*]{8,15}$/,'Confirm Password should match Password')
    }),
    onSubmit : async(values) => {
        try {
          setLoading(true)
          if(values.password === values.confirmPassword){
            let res = await AxiosService.post(`${ApiRoutes.ADMINFORGOTPASSWORD.path}`,values)
            if(res.status === 200){
                navigate('/admin')
            }
            setLoading(false)
          }else{
            toast.error("Passwords doesnt match! Please enter the same passwords")
          }        
        } catch (error) {
            toast.error(error.response.data.message || error.message)
            setLoading(false)
        }
    }
  })

  return <>
    <AdminNavbar/>
      <div className="w-full max-w-sm m-auto my-16">        
        <form className="bg-white outline outline-stone-300 rounded-3xl p-12 mb-4" onSubmit={formik.handleSubmit}>
        <div className='text-xl text-center font-bold mb-4'>Forgot password</div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" for="username">Email</label>
            <input id="email" type='email' name='email' placeholder="Email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur}/>
            {formik.touched.email && formik.errors.email ? (<p className="text-sm text-red-500">{formik.errors.email}</p>) : null}
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
          <div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white w-full py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" disabled={loading}>{ loading ? <FontAwesomeIcon icon={faSpinner}/> : 'Reset Password'}</button>
          </div>
        </form>
      </div>
      <AdminFooter/>
  </>
}

export default ForgotPassword