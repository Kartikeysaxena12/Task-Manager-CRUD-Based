# Task Manager

Task Manager is a web application designed to help users organize their daily tasks efficiently. With features like task categorization, drag-and-drop functionality, and task progress tracking, it serves as a comprehensive tool for personal productivity.

## Features

- **Task Categorization**: Organize tasks by categories such as Work, Personal Development, Household Chores, etc.
- **Date-based Task Management**: View tasks by specific dates.
- **Drag-and-Drop Interface**: Easily rearrange tasks using drag-and-drop functionality.
- **Task Completion Tracking**: Mark tasks as completed or in-progress.
- **Carousel View for Tasks**: View tasks in a carousel format when the number of task dates exceeds four.
- **Task Editing and Deletion**: Edit existing tasks or delete them as needed.
- **Responsive Design**: A user-friendly interface that adapts to different screen sizes.

## Technologies Used

- **Frontend**: React, Tailwind CSS, React Beautiful DnD, React Multi Carousel, Moment.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **API**: RESTful API

## Installation and Setup

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/yourusername/task-manager.git
   cd task-manager
   ```

## Install Dependencies

### For the Backend:

```bash
cd backend
npm install
```

### For the Frontend:

```bash
cd ../frontend
npm install
```

### Run the Backend Server:

```bash
cd backend
npm start
```

### Run the Frontend Server:

```bash
cd ../frontend
npm start
```

### Open the Application:

Open your browser and visit http://localhost:3000 to view the application.

### Usage:

- **Add a New Task**: Enter the task details and click "Add Task".
- **Edit a Task**: Click the "Edit" button next to a task to modify it.
- **Delete a Task**: Click the "Delete" button next to a task to remove it.
- **Mark Task**: as Completed/In Progress: Use the checkbox to toggle task completion and the button to toggle in-progress status.
- **Navigate Tasks by Date**: Use the carousel to switch between task dates if there are more than four.
