import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
// import AppNavbar from '../userComponents/AppNavbar'
// import AppFooter from '../userComponents/AppFooter

function LoadingComponent() {
  return <>
      {/* <AppNavbar/> */}
      <div>
        <p className='loader'><FontAwesomeIcon icon={faSpinner}/></p>
      </div>
      {/* <AppFooter/> */}
  </>
}

export default LoadingComponent