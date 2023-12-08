import { useSelector } from "react-redux";
import Task from "./Task";

const ListTask = () => {
  const tasks = useSelector((state) => state.task.userTask);
  console.log(tasks);

  if (tasks.length === 0) {
    // No tasks
    return <p>You have no tasks</p>;
  }

  return (
    <div className=" ">
      <div className=" p-4 shadow-2xl ">
        {tasks.map((item) => (
          <Task key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default ListTask;
