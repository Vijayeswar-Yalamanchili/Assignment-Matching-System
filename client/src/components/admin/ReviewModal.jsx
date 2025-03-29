import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { jwtDecode } from 'jwt-decode'
import { toast } from 'react-toastify'
import { closeModal } from '../../redux/modalSlice'
import ApiRoutes from '../../utils/ApiRoutes'
import AxiosService from '../../utils/AxiosService'

function ReviewModal({assignmentId,currentSubmission,gitRepo,demolink,ratingData,feedbackData,submittedUser}) {

    const dispatch = useDispatch()
    const [rating, setRating] = useState({
        codeQuality: ratingData?.codeQuality || 0,
        functionality: ratingData?.functionality || 0,
        responsiveness: ratingData?.responsiveness || 0
    })
    const [feedback, setFeedback] = useState(feedbackData || "")
    const getLoginToken = localStorage.getItem('adminLoginToken')
    let decodedToken = jwtDecode(getLoginToken)
    let userId = decodedToken.id

    const handleCompleted = async () => {
        const cumulativerating = (ratingData.codeQuality + ratingData.functionality + ratingData.responsiveness) / 3
        let result = cumulativerating >= 70 ? 'Shortlisted' : 'Not Shortlisted'
        let reviewBody = {
            assignmentId: assignmentId,
            userId: currentSubmission.userId,
            feedback,
            rating,
            result,
        }
        try {            
            let res= await AxiosService.put(`${ApiRoutes.ADMINREVIEWSUBMISSION.path}/${currentSubmission._id}/${assignmentId}/${submittedUser}/${userId}`,reviewBody , {headers: { 'Authorization': `${getLoginToken}`}})
            if(res.status === 200){
                dispatch(closeModal())
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message)
        }
    }

    return <>
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white p-8 rounded-lg shadow-lg w-64 xs:w-96 sm:w-120 lg:w-150">
                <h3 className="text-lg font-semibold">Review Submission</h3>
                <div className='mt-3'>
                    <label>Github Repo :</label>
                    <input type="text" className="w-full border p-2 mt-2" value={gitRepo} readOnly/>
                </div>
                <div className='mt-3'>
                    <label>Demo link :</label>
                    <input type="text" className="w-full border p-2 mt-2" value={demolink} readOnly/>
                </div>
                <div className="mt-4">
                    {['codeQuality', 'functionality', 'responsiveness'].map(category => (
                        <div key={category} className="mb-2">
                            <label className="block capitalize">{category}: (rate for 100%)</label>
                            <input type="text" className="border p-2 w-full" defaultValue={ratingData[category]} onChange={e => setRating({ ...rating, [category]: e.target.value.trim()})}/>
                        </div>
                    ))}
                    <textarea className="border p-2 w-full mt-2" rows="3" placeholder="feedback" defaultValue={feedbackData} onChange={e => setFeedback(e.target.value.trim())}></textarea>
                    <button onClick={handleCompleted} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">Completed</button>
                    <button onClick={() => dispatch(closeModal())} className="ml-2 px-4 py-2 border rounded">Close</button>
                </div>
            </div>
        </div>
    </>
}

export default ReviewModal