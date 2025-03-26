import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  assignments: [],
  query: "",
}

const adminDashboardSlice = createSlice({
  name: "adminDashboard",
  initialState : initialState,
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
