import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import Navbar from "./components/Navbar";
import TaskManager from "./components/TaskManager/TaskManager";

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
    </div>
  );
};

export default App;
