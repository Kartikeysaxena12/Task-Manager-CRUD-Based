import React from "react";

const TaskItem = ({
  task,
  date,
  toggleComplete,
  toggleInProgress,
  editTask,
  deleteTask,
}) => {
  return (
    <li
      className={`flex items-center justify-between p-2 ${
        task.completed
          ? "bg-green-200"
          : task.inProgress
          ? "bg-yellow-200"
          : "bg-white"
      } rounded mb-2`}
    >
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleComplete(task._id, task.completed, date)}
        />
        <span className="text-sm">{task.name}</span>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => toggleInProgress(task._id, task.inProgress, date)}
          className="text-yellow-500 hover:text-yellow-700"
        >
          {task.inProgress ? "Mark Not In Progress" : "Mark In Progress"}
        </button>
        <button
          onClick={() => editTask(task)}
          className="text-blue-500 hover:text-blue-700"
        >
          Edit
        </button>
        <button
          onClick={() => deleteTask(task._id, date)}
          className="text-red-500 hover:text-red-700"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
