import React from 'react'
import Navbar from '../../components/candidate/Navbar.jsx'
import Footer from '../../components/candidate/Footer.jsx'
import { useDispatch } from 'react-redux'
import SearchBar from '../../components/SearchBar'
// import AssignmentCreationModal from '../../components/admin/AssignmentCreationModal'
import { openModal } from "../../redux/modalSlice.js"
import AssignmentLists from '../../components/candidate/AssignmentLists.jsx'

function Dashboard() {

  const dispatch = useDispatch()

  return <>
    <Navbar/>
    <div> 
      <div className='flex flex-row justify-between items-center px-8 mt-5'>
        <SearchBar/>
        {/* <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => dispatch(openModal())}>Create Assignment</button> */}
        {/* <AssignmentCreationModal /> */}
      </div>
      <AssignmentLists/>
    </div>
    <Footer/>
  </>
}

export default Dashboard