import React from "react";
import TaskManager from "./components/TaskManager/TaskManager";
import TaskOrderTable from "./components/TaskComponents/TaskOrderTable"; // Import the new component

const categories = [
  "Work Related",
  "Personal Development",
  "Household Chores",
  "Social Tasks",
  "Administrative Tasks",
];

const App = () => {
  return (
    <div>
      <TaskManager categories={categories} />
      <TaskOrderTable selectedCategory={categories[0]} />{" "}
      {/* Add the new component */}
    </div>
  );
};

export default App;
