import { createSlice } from "@reduxjs/toolkit";

const adminDashboardSlice = createSlice({
  name: "adminDashboard",
  initialState: {
    query: "",
    assignments :  [
      { id: 1, name: "E-commerce App", startDate: "2025-03-20", endDate: "2025-04-10", status: "Pending", evaluation: "Review" },
      { id: 2, name: "Task Manager", startDate: "2025-03-22", endDate: "2025-04-12", status: "Submitted", evaluation: "Shortlisted" },
    ]
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.query = action.payload;
    },
    addAssignment: (state, action) => {
        state.assignments.push(action.payload);
    },
    updateEvaluation: (state, action) => {
      const { id, evaluation } = action.payload;
      const assignment = state.assignments.find((a) => a.id === id);
      if (assignment) {
        assignment.evaluation = evaluation;
      }
    },
  },
});

export const { setSearchQuery,addAssignment, updateEvaluation} = adminDashboardSlice.actions;
export default adminDashboardSlice.reducer;
