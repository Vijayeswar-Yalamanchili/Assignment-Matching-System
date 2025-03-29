import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { setSearchQuery } from "../redux/adminDashboardSlice.js"

const SearchBar = () => {
  const dispatch = useDispatch()
  const query = useSelector((state) => state.adminDashboard.query)

  return (
    <div className="w-96 max-w-md">
      <input type="text" value={query} onChange={(e) => dispatch(setSearchQuery(e.target.value))} placeholder="Search Assignment" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
    </div>
  )
}

export default SearchBar
