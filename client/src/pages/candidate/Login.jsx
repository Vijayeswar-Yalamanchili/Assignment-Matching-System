import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Navbar from '../../components/candidate/Navbar'
import Footer from '../../components/candidate/Footer'
import AxiosService from '../../utils/AxiosService'
import ApiRoutes from '../../utils/ApiRoutes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'



function Login() {

    let navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    let formik = useFormik({
        initialValues:{
        email:'',
        password:''
        },
        validationSchema:Yup.object({          
        email:Yup.string().required('Email is required').email('Enter a valid email'),
        password:Yup.string().required('Password is required').matches(/^[a-zA-Z0-9!@#$%^&*]{8,15}$/,'Enter a valid Password')
        }),
        onSubmit : async(values) => {
            try {
                setLoading(true)
                let res = await AxiosService.post(`${ApiRoutes.LOGIN.path}`,values)
                if(res.status === 200){
                    localStorage.setItem('loginToken',res.data.loginToken)
                    navigate('/dashboard')
                }
                setLoading(false)
            } catch (error) {
                toast.error(error.response.data.message || error.message)
                setLoading(false)
            }
        }
    })

    return <>
        <Navbar/>
        <div className="w-full max-w-sm m-auto my-20">
            <form className="bg-white outline outline-stone-300 rounded-3xl p-12 mb-4" onSubmit={formik.handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" for="username">Email</label>
                    <input id="email" type='email' name='email' placeholder="Email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur}/>
                    {formik.touched.email && formik.errors.email ? (<p className="text-sm text-red-500">{formik.errors.email}</p>) : null}
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
                    <input id="password" type="password" name='password' placeholder="**************" className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur}/>
                    {formik.touched.password && formik.errors.password ? (<p className="text-sm text-red-500">{formik.errors.email}</p>) : null}
                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" disabled={loading}>{ loading ? <FontAwesomeIcon icon={faSpinner}/> : 'Login'}</button>
                    <Link to={'/forgotpassword'} className="inline-block align-baseline text-sm text-blue-500 hover:text-blue-800">Forgot Password?</Link>
                </div>
            </form>
        </div>
        <Footer/>
    </>
}

export default Login