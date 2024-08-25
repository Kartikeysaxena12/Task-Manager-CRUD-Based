import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

const TaskOrderTable = ({ selectedCategory }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [tasks, setTasks] = useState([]);
  const [taskOrder, setTaskOrder] = useState({});

  useEffect(() => {
    if (selectedDate) {
      fetchTasksByDate(selectedDate);
    }
  }, [selectedDate]);

  const fetchTasksByDate = async (date) => {
    try {
      const response = await axios.get("http://localhost:5000/api/tasks", {
        params: {
          category: selectedCategory,
          date: date,
        },
      });
      setTasks(response.data || []);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleOrderChange = (taskId, order) => {
    setTaskOrder((prevOrder) => ({
      ...prevOrder,
      [taskId]: order,
    }));
  };

  const handleSaveOrder = () => {
    // Update the tasks with the new order numbers
    const updatedTasks = tasks.map((task) => ({
      ...task,
      order: taskOrder[task._id] || task.order,
    }));

    // Update the tasks in the backend
    updatedTasks.forEach(async (task) => {
      try {
        await axios.put(`http://localhost:5000/api/tasks/${task._id}`, {
          ...task,
          order: task.order,
        });
      } catch (error) {
        console.error("Error updating task order:", error);
      }
    });

    // Refresh the tasks list to reflect the changes
    fetchTasksByDate(selectedDate);
  };

  return (
    <div className="w-full max-w-3xl p-6 bg-white shadow-lg rounded-lg mt-4">
      <div className="mb-4">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border p-2 rounded bg-gradient-to-r from-blue-500 to-green-500 text-white"
        />
      </div>
      {tasks.length > 0 ? (
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2 text-left">Task</th>
              <th className="border p-2 text-left">Order</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task._id}>
                <td className="border p-2">{task.name}</td>
                <td className="border p-2">
                  <input
                    type="number"
                    value={taskOrder[task._id] || task.order || ""}
                    onChange={(e) =>
                      handleOrderChange(task._id, e.target.value)
                    }
                    className="border p-1 rounded"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No tasks found for the selected date.</p>
      )}
      <button
        onClick={handleSaveOrder}
        className="bg-gradient-to-r from-blue-500 to-green-500 text-white p-2 rounded mt-4"
      >
        Save Order
      </button>
    </div>
  );
};

export default TaskOrderTable;
