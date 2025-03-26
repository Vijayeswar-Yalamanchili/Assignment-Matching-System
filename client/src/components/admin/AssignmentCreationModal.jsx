import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addAssignment } from "../../redux/adminDashboardSlice.js"
import { closeModal } from "../../redux/modalSlice.js"
import AxiosService from "../../utils/AxiosService.jsx"
import ApiRoutes from "../../utils/ApiRoutes.jsx"
import { jwtDecode } from "jwt-decode"

const AssignmentCreationModal = () => {

  let getLoginToken = localStorage.getItem('adminLoginToken')
  const decodedToken = jwtDecode(getLoginToken)
  const id = decodedToken.id
  const dispatch = useDispatch()
  const isOpen = useSelector((state) => state.modal.isOpen)
  const [form, setForm] = useState({
    name: "",
    description: "",
    requirements: "",
    submissionGuidelines: "",
    startDate: "",
    endDate: "",
  })

  if (!isOpen) return null;

  const handleSubmit = async(e) => {
    e.preventDefault();
    // dispatch(addAssignment({ id: Date.now(), ...formData }))
    // dispatch(closeModal());
    try {
      let res = await AxiosService.post(`${ApiRoutes.ADMINADDASSIGNMENTS.path}/${id}`, form,{ headers : { 'Authorization' : ` ${getLoginToken}`}})
      console.log(res.data)
      dispatch(addAssignment(res.data.addAssignment)); 
      dispatch(closeModal());
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-md">
      <div className="bg-white p-6 rounded-lg shadow-lg w-140 relative">
        <button onClick={() => dispatch(closeModal())} className="absolute top-3 right-3 text-gray-600 hover:text-gray-900">✖</button>
        <h2 className="text-xl font-semibold mb-4">Create Assignment</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input type="text" name="name" placeholder="Assignment Name" required className="w-full p-2 border rounded" onChange={(e) => setForm({ ...form, name: e.target.value.trim() })} />
          <textarea placeholder="Description" required className="w-full p-2 border rounded" onChange={(e) => setForm({ ...form, description: e.target.value.trim() })} />
          <textarea placeholder="Requirements" required className="w-full p-2 border rounded" onChange={(e) => setForm({ ...form, requirements: e.target.value.trim() })} />
          <textarea placeholder="Submission Guidelines" required className="w-full p-2 border rounded" onChange={(e) => setForm({ ...form, submissionGuidelines: e.target.value.trim() })} />
          <div>
            <label>Start Date</label>
            <input type="date" required className="w-full p-2 border rounded" onChange={(e) => setForm({ ...form, startDate: e.target.value.trim() })} />
          </div>
          <div>
            <label>End Date</label>
            <input type="date" required className="w-full p-2 border rounded" onChange={(e) => setForm({ ...form, endDate: e.target.value.trim() })} />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Create</button>
        </form>
      </div>
    </div>
  )
}

export default AssignmentCreationModal
