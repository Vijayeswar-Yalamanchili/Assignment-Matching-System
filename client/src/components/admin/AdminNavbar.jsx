import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { jwtDecode } from 'jwt-decode'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical, faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { useLogout } from '../../hooks/UseLogout'
import logo from '../../assets/logo.png'
import AxiosService from '../../utils/AxiosService'
import ApiRoutes from '../../utils/ApiRoutes'

function AdminNavbar() {

    let logout = useLogout()
    let navigate = useNavigate()    
    const [openDropDown, setOpenDropDown] = useState(false)
    const getAdminLoginToken = localStorage.getItem('adminLoginToken')

    const handleEllipsisMenu = () => {
        setOpenDropDown(!openDropDown)
    }
    
    const handleLogout = async() => {
        try {     
            const decodedToken = jwtDecode(getAdminLoginToken)
            const id = decodedToken.id 
            let res = await AxiosService.put(`${ApiRoutes.ADMINLOGOUT.path}/${id}`,{ headers : { 'Authorization' : ` ${getAdminLoginToken}`}})
            if(res.status === 200){
                logout()
            }
        } catch (error) {
            toast.error(error.response.data.message || error.message)
        }
    }

    return <>
        <div className='bg-red-500 w-full h-24 flex flex-row justify-between items-center'>
            {
                getAdminLoginToken ? <>
                        <div className='w-16 h-16' onClick={()=> navigate('/admin/dashboard')}><img className="ml-4 rounded-lg" src={logo} alt="Logo"/></div>
                        <div className='w-20 mr-4 flex flex-row justify-between items-center'>
                            <div className='text-white'><FontAwesomeIcon style={{height : '1.5rem'}} icon={faUser} onClick={()=>navigate('/admin/profile')}/></div>
                            <div className='text-white'><FontAwesomeIcon style={{height : '1.5rem'}} icon={faPowerOff} onClick={handleLogout}/></div>
                        </div>
                    </> : <>
                        <div className='w-16 h-16' onClick={()=> navigate('/admin')}><img className="ml-4 rounded-lg" src={logo} alt="Logo"/></div>
                        <div className=' hidden sm:block'>
                            <Link to={'/admin'}><button type="button" className='text-white mr-5 px-4 py-2 outline rounded-md'>Login</button></Link>
                            <Link to={'/admin/register'}><button type="button" className='text-white mr-5 px-4 py-2 outline rounded-md'>Register</button></Link>
                        </div>
                        <div className='pr-5 text-white cursor-pointer sm:hidden' onClick={handleEllipsisMenu}><FontAwesomeIcon icon={faEllipsisVertical}/></div>
                    </>
            }

            {
                openDropDown &&  <>
                    <ul className='absolute flex flex-col right-5 top-16 bg-gray-100 outline-none rounded h-max w-24'>
                        <Link to={'/admin'}><li className='list-none p-2'>Login</li></Link>
                        <hr className='mx-2 text-stone-400'/>
                        <Link to={'/admin/register'}><li className='list-none p-2'>Register</li></Link>
                    </ul>
                </>
            }
        </div>            
    </>
}

export default AdminNavbar