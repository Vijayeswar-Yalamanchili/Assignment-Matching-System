import React from 'react'
import { useDispatch } from 'react-redux'
import { openModal } from "../../redux/modalSlice.js"
import AdminNavbar from '../../components/admin/AdminNavbar'
import AdminFooter from '../../components/admin/AdminFooter'
import SearchBar from '../../components/SearchBar'
import AssignmentCreationModal from '../../components/admin/AssignmentCreationModal'
import AssignmentLists from '../../components/admin/AssignmentLists.jsx'

function Dashboard() {

  const dispatch = useDispatch()

  return <>
    <AdminNavbar/>
    <div> 
      <div className='flex flex-row justify-between items-center px-8 mt-5'>
        <SearchBar/>
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => dispatch(openModal())}>Create Assignment</button>
        <AssignmentCreationModal />
      </div>
      <AssignmentLists/>
    </div>
    <AdminFooter/>
  </>
}

export default Dashboard