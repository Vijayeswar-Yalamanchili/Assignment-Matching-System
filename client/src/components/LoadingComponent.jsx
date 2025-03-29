import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

function LoadingComponent() {
  return <>
      <div>
        <p className='loader m-auto mt-5'><FontAwesomeIcon icon={faSpinner}/></p>
      </div>
  </>
}

export default LoadingComponent