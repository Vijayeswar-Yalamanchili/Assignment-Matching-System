import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

function AssignmentLists() {

    const dispatch = useDispatch()
    // const [isModalOpen, setModalOpen] = useState(false);
    const {  assignments,searchQuery } = useSelector((state) => state.adminDashboard.assignments)
    const filteredAssignments = assignments.filter(a => a.name.toLowerCase())
    console.log(filteredAssignments)

    return <>
        <div className="w-full max-w-2xl mx-auto mt-6">
            {assignments.map((assignment) => (
                <div key={assignment.id} className="p-4 bg-white shadow rounded mb-4">
                <h3 className="font-semibold">{assignment.name}</h3>
                <p className="text-sm text-gray-500">{assignment.startDate} - {assignment.endDate}</p>
                <p className="text-sm">Status: {assignment.status}</p>
                <select className="mt-2 p-2 border rounded" value={assignment.evaluation} onChange={(e) => dispatch(updateEvaluation({ id: assignment.id, evaluation: e.target.value }))}>
                    <option>Review</option>
                    <option>Shortlisted</option>
                    <option>Not-Shortlisted</option>
                </select>
                </div>
            ))}
        </div>
    </>
}

export default AssignmentLists