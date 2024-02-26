// Importing necessary modules and components from React and other libraries
import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';
import AddTask from './component/AddTask';
import TaskManager from './component/TaskManager';

// Main App component
function App() {
  // State to store tasks and loading status
  const [ tasks, setTasks ] = useState(""); // tasks state initialized with an empty string
  const [ isLoading, setIsLoading ] = useState(true); // isLoading state initialized as true

  // useEffect hook to fetch tasks when the component mounts
  useEffect(() => {
    fetchTasks(); // calling fetchTasks function
    console.log(tasks); // logging tasks to the console (may not display the updated state immediately)
  }, [])

  // Function to fetch tasks from the API
  const fetchTasks = async () => {
    try{
      const response = await axios.get("http://127.0.0.1:8000/api/task-list/"); // making a GET request to the specified API endpoint
      setTasks(response.data); // updating tasks state with the data received from the API
      setIsLoading(false); // setting isLoading to false once data is fetched
    } catch(error) {
      console.log(error); // logging any errors that occur during the API request
    }
  }

  // JSX structure for the App component
  return (
    <>
      <div className='container mt-2'>
        {/* Header section with the task manager title and total tasks count */}
        <div className="container text-center">
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
              <h3 className=''>Task Manager</h3>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
              <h3 className=''>Total Tasks - {tasks.length}</h3>
            </div>
          </div>
        </div>
        {/* AddTask component for adding new tasks */}
        <AddTask
          setTasks={setTasks}
          fetchTasks={fetchTasks}
        />
        {/* TaskManager component for displaying and managing tasks */}
        <TaskManager
          tasks={tasks}
          setTasks={setTasks}
          isLoading={isLoading}
        />
      </div>
    </>
  )
}

// Exporting the App component as the default export
export default App
