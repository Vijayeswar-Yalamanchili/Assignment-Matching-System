import React from 'react'
import { useNavigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import userErrorScreenAnime from '../assets/userErrorScreenAnime.svg'

function UserErrorScreen() {

  const navigate = useNavigate()

  const handleErrorPage = () => {
    let getToken = localStorage.getItem('loginToken')
    if(getToken === null){
      navigate('/home')
    }else{
      const decodedToken = jwtDecode(getToken)
      if(decodedToken.role === "admin"){
        navigate('/admin/dashboard')
      }else{
        navigate('/dashboard')
      }
    }
  }

  return <>
    <div className='m-auto flex flex-col justify-between items-center'>
      <img src={userErrorScreenAnime} alt="errorscreen" style={{width : "50%",height : "50%"}} />      
      <button onClick={()=> handleErrorPage()} class=" m-auto px-4 py-2 rounded-lg bg-sky-500 hover:text-white">Go to Home</button>
    </div>
  </>
}

export default UserErrorScreen