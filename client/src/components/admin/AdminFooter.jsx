import React from 'react'
import logo from '../../assets/logo.png'

function AdminFooter() {
    return <>
        <div className='bg-red-500 w-full h-44 p-4 text-center'>
            <div className='w-16 h-16 m-auto mb-2' onClick={()=> navigate('/admin/dashboard')}><img className="ml-4 rounded-lg" src={logo} alt="Logo"/></div>
            <div className='mb-3 text-white text-xl'>Creative Solutions Pvt. Ltd.</div>
            <hr className='text-white'/>
            <div className='mt-2 text-sm text-white'>Copyright &copy; 2024 Vijayeswar Yalmanchili</div>
        </div>
    </>
}

export default AdminFooter