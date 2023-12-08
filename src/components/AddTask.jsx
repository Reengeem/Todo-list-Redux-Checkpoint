import React from "react";
import { Button, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { OrderedListOutlined } from "@ant-design/icons";
import {
  addTask,
  filterTasks,
  resetFilters,
  editSelectedTask,
} from "../features/task/taskSlice";

import {
  getTasksFromLocalStorage,
  saveTasksToLocalStorage,
} from "../utils/helpers";

const AddTask = () => {
  // Retrieve taskEditing state from Redux store
  const { taskEditing } = useSelector((state) => state.task);

  // State to manage the input value and filtering status
  const [value, setValue] = React.useState("");
  const [filtering, setFiltering] = React.useState(true);

  // Redux dispatch function
  const dispatch = useDispatch();

  // Handle user input for creating a new task
  const handleInput = (event) => {
    setValue(event.target.value);
  };

  // Create a new task and dispatch the addTask action
  const handleCreateNewTask = () => {
    if (/^\s*$/.test(value)) {
      return;
    }
    dispatch(addTask(value));
    setValue("");
  };

  // Handle filtering tasks based on completion status
  const handleFiterTasks = (params) => {
    setFiltering(false);
    let storedTasks = getTasksFromLocalStorage();
    let tempTasks = storedTasks.filter((item) => item.isDone === params);
    dispatch(filterTasks(tempTasks));
  };

  // Set the input value when editing a task
  React.useEffect(() => {
    setValue(taskEditing.description || " ");
  }, [taskEditing.id]);

  // Save the edited task and update local storage and Redux store
  const saveEditedTask = () => {
    if (/^\s*$/.test(value)) {
      return;
    }
    let storedTasks = getTasksFromLocalStorage();
    let result = storedTasks.map((item) => {
      if (item.id === taskEditing.id) {
        item.description = value;
      }
      return item;
    });

    saveTasksToLocalStorage(result);
    dispatch(resetFilters());
    setValue("");
    dispatch(editSelectedTask(""));
  };

  return (
    <section className="p-5">
      <div className="flex  justify-center  pb-2 gap-4">
        {/* Todo list app header */}
        <img style={{ width: 60, height: 60 }} src="to-do-list.svg" alt="" />
        <h1 className="pt-5 text-2xl/[17px] font-extrabold">TODO LIST APP</h1>
      </div>
      <div className="flex flex-col items-center">
        {/* Input and button for creating a new task */}
        <div className=" flex p-5">
          <Input
            onChange={handleInput}
            type="text"
            placeholder="Create new task"
            style={{ width: 400, height: 32 }}
            value={value}
            className="border-2 border-blue-500 p-2"
          />
          {/* Render either the save edit button or create todo button */}
          {filtering || taskEditing ? (
            taskEditing ? (
              <Button
                className=" bg-blue-500 text-white"
                onClick={saveEditedTask}
              >
                save edit
              </Button>
            ) : (
              <Button
                style={{ height: 30 }}
                onClick={handleCreateNewTask}
                className="text-white bg-blue-500  hover:bg-blue-950"
              >
                Create Todo
              </Button>
            )
          ) : null}
        </div>

        {/* Task filtering buttons */}
        <div className="flex gap-2 ">
          <p className="mb-2 from-neutral-50">Filter:</p>
          {/* Button to reset filters and show all tasks */}
          <Button
            onClick={() => {
              dispatch(resetFilters());
              setFiltering(true);
            }}
            className="bg-yellow-500 hover:bg-yellow-800 px-2 rounded-md text-white mr-2"
          >
            All task
          </Button>
          {/* Button to filter pending tasks */}
          <Button
            onClick={() => handleFiterTasks(false)}
            className="bg-blue-800 hover:bg-blue-500 px-2 rounded-md text-white mr-2"
          >
            Pending
          </Button>
          {/* Button to filter completed tasks */}
          <Button
            onClick={() => handleFiterTasks(true)}
            className="bg-green-800 hover:bg-green-800 px-2 rounded-md text-white"
          >
            Completed
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AddTask;
