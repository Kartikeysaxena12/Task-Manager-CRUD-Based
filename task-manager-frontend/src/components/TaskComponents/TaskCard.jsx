import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TaskItem from "./TaskItem"; // Adjust the path as needed
import moment from "moment";

const TaskCard = ({
  date,
  tasks,
  cardOpenState,
  toggleCardOpenState,
  removeCard,
  onDragEnd,
  toggleComplete,
  toggleInProgress,
  editTask,
  deleteTask,
}) => {
  return (
    <div className="task-card bg-white shadow-lg rounded-lg p-4 m-2">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold mb-2">
          {moment(date).format("MMMM Do, YYYY")}
        </h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => toggleCardOpenState(date)}
            className="text-gray-500 hover:text-gray-700"
          >
            {cardOpenState[date] ? "Close" : "Open"}
          </button>
          <button
            onClick={() => removeCard(date)}
            className="text-red-500 hover:text-red-700"
          >
            ✕
          </button>
        </div>
      </div>
      {cardOpenState[date] && (
        <DragDropContext onDragEnd={(result) => onDragEnd(result, date)}>
          <Droppable droppableId={date}>
            {(provided) => (
              <ul
                className="task-list"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {tasks.map((task, index) => (
                  <TaskItem
                    key={task._id}
                    task={task}
                    date={date}
                    toggleComplete={toggleComplete}
                    toggleInProgress={toggleInProgress}
                    editTask={editTask}
                    deleteTask={deleteTask}
                    index={index}
                  />
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
};

export default TaskCard;
