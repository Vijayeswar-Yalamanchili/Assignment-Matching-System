import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAssignment } from "../../redux/adminDashboardSlice.js";
import { closeModal } from "../../redux/modalSlice.js";
import AxiosService from "../../utils/AxiosService.jsx";
import ApiRoutes from "../../utils/ApiRoutes.jsx";
import { jwtDecode } from "jwt-decode";

const AssignmentSubmitModal = ({ assignmentId }) => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modal.isOpen);

  // Fetch login token once
  const getLoginToken = localStorage.getItem("loginToken");
  const decodedToken = jwtDecode(getLoginToken);
  const userId = decodedToken.id;

  const [currentAssignment, setCurrentAssignment] = useState(null);
  const [form, setForm] = useState({
    gitHub_repo_link: "",
    demo_link: "",
  });

  if (!isOpen) return null; // Prevents unnecessary rendering

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await AxiosService.post(
        `${ApiRoutes.SUBMITASSIGNMENT.path}/${userId}`,
        form,
        { headers: { Authorization: ` ${getLoginToken}` } }
      );
      dispatch(addAssignment(res.data.addAssignment));
      dispatch(closeModal());
    } catch (error) {
      console.error(error);
    }
  };

  const getCurrentAssignment = useCallback(async () => {
    if (!assignmentId) return;
    try {
      let res = await AxiosService.get(
        `${ApiRoutes.CURRENTASSIGNMENT.path}/${assignmentId}/${userId}`,
        { headers: { Authorization: ` ${getLoginToken}` } }
      );
      if (res.status === 200) {
        setCurrentAssignment(res.data.currentassignment);
      }
    } catch (error) {
      console.error(error);
    }
  }, [assignmentId, userId, getLoginToken]);

  useEffect(() => {
    getCurrentAssignment();
  }, [getCurrentAssignment]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-md">
      <div className="bg-white p-6 rounded-lg shadow-lg w-140 relative">
        <button
          onClick={() => dispatch(closeModal())}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
        >
          ✖
        </button>
        <h2 className="text-xl font-semibold mb-4">Create Assignment</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <label>Github Repo</label>
          <input
            type="text"
            name="githubRepo"
            placeholder="Github Repo Link"
            required
            className="w-full p-2 border rounded"
            value={form.gitHub_repo_link}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, gitHub_repo_link: e.target.value.trim() }))
            }
          />
          <label>Demo Link</label>
          <input
            type="text"
            name="demolink"
            placeholder="Demo Link"
            required
            className="w-full p-2 border rounded"
            value={form.demo_link}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, demo_link: e.target.value.trim() }))
            }
          />
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AssignmentSubmitModal;
