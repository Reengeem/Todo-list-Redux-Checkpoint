import React from "react";
import { useDispatch } from "react-redux";
import {
  updateTaskStatus,
  resetFilters,
  editSelectedTask,
} from "../features/task/taskSlice";
import { Card } from "antd";
import { AiFillEdit } from "react-icons/ai";
import { HiMiniTrash } from "react-icons/hi2";
import {
  getTasksFromLocalStorage,
  saveTasksToLocalStorage,
} from "../utils/helpers";
import { Button } from "antd";

const Task = ({ description, isDone, id }) => {
  const dispatch = useDispatch();

  // Function to handle checkbox click (task completion)
  const handleCheck = () => {
    // Retrieve tasks from local storage
    const storedTasks = getTasksFromLocalStorage();

    // Update the status of the clicked task
    const result = storedTasks.map((item) => {
      if (item.id === id) {
        item.isDone = !item.isDone;
      }
      return item;
    });

    // Dispatch action to update Redux store with the modified tasks
    dispatch(updateTaskStatus(result));

    // Save the updated tasks to local storage
    saveTasksToLocalStorage(result);
  };

  // Function to find and edit selected tasks
  const findSelectedTasksForEditing = () => {
    // Retrieve tasks from local storage
    const storedTasks = getTasksFromLocalStorage();

    // Find the task with the specified id
    const result = storedTasks.find((item) => item.id === id);

    // Dispatch action to set the selected task for editing in Redux store
    dispatch(editSelectedTask(result));
  };

  // Function to delete the task
  const deleteTask = () => {
    // Retrieve tasks from local storage
    const storedTasks = getTasksFromLocalStorage();

    // Remove the task with the specified id
    const result = storedTasks.filter((item) => item.id !== id);

    // Save the updated tasks to local storage
    saveTasksToLocalStorage(result);

    // Dispatch action to reset filters in Redux store
    dispatch(resetFilters());
  };

  return (
    <div>
      {/* Card component representing a task */}
      <Card
        className="text-2xl"
        style={{
          marginTop: 16,
          width: 500,
          fontSize: 40,
          color: "white",
          backgroundColor: isDone ? "green" : "white",
          borderRadius: 16,
          padding: 16,
          cursor: "pointer",
          fontStyle: isDone ? "italic" : "normal",
        }}
        type="not set"
        title={description}
        headStyle={isDone ? { color: "white" } : { color: "black" }}
      >
        <div>
          <div className="flex justify-between">
            {/* Checkbox for task completion */}
            <div className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={isDone}
                onChange={handleCheck}
              />
            </div>

            {/* Button to edit the task (visible only if the task is not done) */}
            <div className="flex items-center">
              {!isDone ? (
                <Button onClick={findSelectedTasksForEditing}>
                  <AiFillEdit className="mr-2" style={{ color: "blue" }} />
                </Button>
              ) : null}
            </div>

            {/* Button to delete the task */}
            <div className="flex items-center">
              <Button onClick={deleteTask}>
                <HiMiniTrash
                  style={!isDone ? { color: "red" } : { color: "black" }}
                  className="mr-2"
                />
              </Button>
            </div>
          </div>
        </div>

        {/* Task description with optional styling based on completion status */}
        {/* <p className={`flex-1 ${isDone ? "line-through text-gray-500" : ""}`}>
          {description}
        </p> */}
      </Card>
    </div>
  );
};

export default Task;
