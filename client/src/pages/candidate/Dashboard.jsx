import React from 'react'
import Navbar from '../../components/candidate/Navbar.jsx'
import Footer from '../../components/candidate/Footer.jsx'
import SearchBar from '../../components/SearchBar'
import AssignmentLists from '../../components/candidate/AssignmentLists.jsx'

function Dashboard() {

  return <>
    <Navbar/>
    <div> 
      <div className='flex flex-row justify-between items-center px-8 mt-5'><SearchBar/></div>
      <AssignmentLists/>
    </div>
    <Footer/>
  </>
}

export default Dashboard