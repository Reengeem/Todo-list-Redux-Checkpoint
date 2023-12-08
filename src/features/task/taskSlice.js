import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const initialState = {
  userTask: JSON.parse(localStorage.getItem("tasks")) || [],
  taskEditing: "",
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    // code of action to add new task here =======
    addTask: (state, action) => {
      state.userTask = [
        {
          description: action.payload,
          id: nanoid(),
          isDone: false,
        },
        ...state.userTask,
      ];
      // save tasks to local storage
      localStorage.setItem("tasks", JSON.stringify(state.userTask));
    },

    updateTaskStatus: (state, action) => {
      state.userTask = action.payload;
    },

    // filter task by status pending/complete
    filterTasks: (state, action) => {
      state.userTask = action.payload;
    },
    // =================================

    // Reset task to all
    resetFilters: (state, action) => {
      state.userTask = JSON.parse(localStorage.getItem("tasks")) || [];
    },
    // =========================================
    editSelectedTask: (state, action) => {
      state.taskEditing = action.payload;
    },
  },
});

export const {
  addTask,
  updateTaskStatus,
  filterTasks,
  resetFilters,
  editSelectedTask,
} = taskSlice.actions;
export default taskSlice.reducer;
