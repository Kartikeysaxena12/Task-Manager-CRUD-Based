import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import Navbar from "../Navbar";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./TaskManager.css";

const TaskManager = () => {
  const categories = [
    "Work Related",
    "Personal Development",
    "Household Chores",
    "Social Tasks",
    "Administrative Tasks",
  ];
  const [tasksByDate, setTasksByDate] = useState({});
  const [newTask, setNewTask] = useState("");
  const [taskDate, setTaskDate] = useState(moment().format("YYYY-MM-DD"));
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, [selectedCategory, taskDate]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tasks", {
        params: {
          category: selectedCategory,
          date: taskDate,
        },
      });
      const data = Array.isArray(response.data) ? response.data : [];

      setTasksByDate((prevTasks) => ({
        ...prevTasks,
        [taskDate]: data,
      }));
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setTasksByDate((prevTasks) => ({
        ...prevTasks,
        [taskDate]: [],
      }));
    }
  };

  const addOrUpdateTask = async () => {
    if (!newTask) return;
    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/api/tasks/${currentTask._id}`, {
          name: newTask,
          category: selectedCategory,
          date: taskDate,
          completed: currentTask.completed,
        });
      } else {
        await axios.post("http://localhost:5000/api/tasks", {
          name: newTask,
          category: selectedCategory,
          date: taskDate,
          completed: false,
        });
      }
      setNewTask("");
      setIsEditing(false);
      setCurrentTask(null);
      fetchTasks();
    } catch (error) {
      console.error("Error adding/updating task:", error);
    }
  };

  const deleteTask = async (id, date) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      setTasksByDate((prevTasks) => {
        const updatedTasks = { ...prevTasks };
        updatedTasks[date] = updatedTasks[date].filter(
          (task) => task._id !== id
        );
        return updatedTasks;
      });
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const toggleComplete = async (id, completed, date) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${id}`, {
        completed: !completed,
      });
      setTasksByDate((prevTasks) => {
        const updatedTasks = { ...prevTasks };
        updatedTasks[date] = updatedTasks[date].map((task) =>
          task._id === id ? { ...task, completed: !completed } : task
        );
        return updatedTasks;
      });
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const editTask = (task) => {
    setNewTask(task.name);
    setIsEditing(true);
    setCurrentTask(task);
    setTaskDate(task.date);
  };

  const taskDates = Object.keys(tasksByDate).sort();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <Navbar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <div className="w-full max-w-3xl p-6 bg-white shadow-lg rounded-lg mt-4">
        <div className="flex justify-between mb-4 space-x-4">
          <input
            type="date"
            value={taskDate}
            onChange={(e) => setTaskDate(e.target.value)}
            className="border p-2 rounded bg-gradient-to-r from-blue-500 to-green-500 text-white"
          />
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="New Task"
            className="border p-2 rounded bg-gradient-to-r from-white to-blue-500"
          />
          <button
            onClick={addOrUpdateTask}
            className="bg-gradient-to-r from-blue-500 to-green-500 text-white p-2 rounded"
          >
            {isEditing ? "Update Task" : "Add Task"}
          </button>
        </div>
      </div>

      {/* Cards Container for Different Dates */}
      <div className="w-full max-w-5xl mt-8">
        {taskDates.length > 5 ? (
          <Carousel
            responsive={{
              superLargeDesktop: {
                breakpoint: { max: 4000, min: 3000 },
                items: 5,
              },
              desktop: {
                breakpoint: { max: 3000, min: 1024 },
                items: 3,
              },
              tablet: {
                breakpoint: { max: 1024, min: 464 },
                items: 2,
              },
              mobile: {
                breakpoint: { max: 464, min: 0 },
                items: 1,
              },
            }}
          >
            {taskDates.map((date) => (
              <div
                key={date}
                className="task-card bg-white shadow-lg rounded-lg p-4 m-2"
              >
                <h2 className="text-lg font-bold mb-2">
                  {moment(date).format("MMMM Do, YYYY")}
                </h2>
                <TransitionGroup component="ul" className="task-list">
                  {tasksByDate[date].map((task) => (
                    <CSSTransition
                      key={task._id}
                      timeout={500}
                      classNames="task"
                    >
                      <li className="flex items-center justify-between border-b p-2">
                        <span
                          className={`flex-1 ${
                            task.completed ? "line-through" : ""
                          }`}
                          onClick={() =>
                            toggleComplete(task._id, task.completed, date)
                          }
                        >
                          {task.name}
                        </span>
                        <button
                          className="text-blue-500 hover:text-yellow-700 pr-2"
                          onClick={() => editTask(task)}
                        >
                          Modify
                        </button>
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => deleteTask(task._id, date)}
                        >
                          Delete
                        </button>
                      </li>
                    </CSSTransition>
                  ))}
                </TransitionGroup>
              </div>
            ))}
          </Carousel>
        ) : (
          <div className="flex flex-wrap">
            {taskDates.map((date) => (
              <div
                key={date}
                className="task-card bg-white shadow-lg rounded-lg p-4 m-2"
              >
                <h2 className="text-lg font-bold mb-2">
                  {moment(date).format("MMMM Do, YYYY")}
                </h2>
                <TransitionGroup component="ul" className="task-list">
                  {tasksByDate[date].map((task) => (
                    <CSSTransition
                      key={task._id}
                      timeout={500}
                      classNames="task"
                    >
                      <li className="flex items-center justify-between border-b p-2">
                        <span
                          className={`flex-1 ${
                            task.completed ? "line-through" : ""
                          }`}
                          onClick={() =>
                            toggleComplete(task._id, task.completed, date)
                          }
                        >
                          {task.name}
                        </span>
                        <button
                          className="text-blue-500 hover:text-yellow-700 pr-2"
                          onClick={() => editTask(task)}
                        >
                          Modify
                        </button>
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => deleteTask(task._id, date)}
                        >
                          Delete
                        </button>
                      </li>
                    </CSSTransition>
                  ))}
                </TransitionGroup>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskManager;
