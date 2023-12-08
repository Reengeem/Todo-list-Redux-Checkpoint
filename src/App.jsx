import { useState } from "react";
import "./App.css";
import AddTask from "./components/Addtask";
import ListTask from "./components/ListTask";

function App() {
  return (
    <>
      {/* Main section containing the background and task components */}
      <section className="grid place-items-center bg-contain bg-[url('todo3.jpg')]">
        {/* Sticky header containing the AddTask component */}
        <div className=" sticky top-0 left-0 right-0 z-10 bg-slate-200">
          <AddTask />
        </div>

        {/* Component to display the list of tasks */}
        <ListTask />
      </section>
    </>
  );
}

export default App;
