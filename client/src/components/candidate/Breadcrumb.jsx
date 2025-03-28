import React from 'react'

function Breadcrumb({assignmentData}) {
  return <>
    <div>
      <div className="container">
        <div className="w-full mb-8">
          <div className="p-4">
            <ul className="flex items-center">
              <li className="flex items-center">
                <a href="/dashboard" className="flex items-center text-base font-medium hover:text-primary dark:hover:text-primary text-dark dark:text-white">Dashboard</a>
                <span className="px-3 text-body-color dark:text-dark-6">{" "}/{" "}</span>
              </li>
              <li className="text-base font-medium text-body-color dark:text-dark-6">{assignmentData} - Task Details</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </>
}

export default Breadcrumb