import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './TaskManager.css';

const TaskManager = ({ tasks, setTasks, isLoading }) => {
    // State for managing the modal visibility, search query, and editing task details
    const [show, setShow] = useState(false);
    const [query, setQuery] = useState("");

    const [editTask, setEditTask] = useState({
        'id': '', // Add 'id' field for identifying the task
        'title': '',
        'description': '',
        'completed': false,
    });

    // Functions to handle modal show/hide
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Function to handle task deletion
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/task-list/${id}`);
            // Filter out the deleted task from the tasks array
            const newTaskList = tasks.filter(task => task.id !== id);
            setTasks(newTaskList);
        } catch (error) {
            console.log(error);
        }
    };

    // Function to handle task editing
    const handleEdit = async () => {
        try {
            // Make a PATCH request to update the task details
            const response = await axios.patch(`http://127.0.0.1:8000/api/task-list/${editTask.id}/`, editTask);
            // Update the tasks array with the edited task
            const newTasks = tasks.map(task => (task.id === editTask.id ? response.data : task));
            setTasks(newTasks);
            handleClose(); // Close the modal after updating
        } catch (error) {
            console.log(error);
        }
    };

    // Functions to handle changes in title, description, and status during editing
    const handleChangeTitle = (e) => {
        setEditTask(prev => ({
            ...prev,
            'title': e.target.value,
        }));
    };

    const handleChangeDescription = (e) => {
        setEditTask(prev => ({
            ...prev,
            'description': e.target.value,
        }));
    };

    const handleChangeStatus = (e) => {
        setEditTask(prev => ({
            ...prev,
            'completed': e.target.value === 'completed', // Convert the string to boolean
        }));
    };

    // Function to handle "Edit" button click and populate the modal with task details
    const handleEditClick = (taskItem) => {
        setEditTask({
            id: taskItem.id,
            title: taskItem.title,
            description: taskItem.description,
            completed: taskItem.completed,
        });
        handleShow(); // Show the modal
    };

    // JSX structure for rendering the TaskManager component
    return (
        <div className="container data-container-task-manager">
            <hr />
            <div className="search-bar-container">
                {/* Search bar for filtering tasks based on title, description, status, created_at, and updated_at */}
                <input type="text" onChange={(e) => setQuery(e.target.value)} placeholder='Search Title, Description, Status, Created and Updated at' className='form-control mt-1 mb-3' id='search-bar' />
            </div>
            <div>
                <ul className="list-unstyled">
                    {isLoading ? (
                        <div>Tasks are Loading....</div>
                    ) : (
                        <>
                            {tasks.filter((taskItem) => {
                                // Filtering tasks based on the search query
                                const lowerCaseQuery = query.toLowerCase();
                                const completedText = taskItem.completed ? 'completed' : 'incompleted';
                                return (
                                    taskItem.title.toLowerCase().includes(lowerCaseQuery) ||
                                    taskItem.description.toLowerCase().includes(lowerCaseQuery) ||
                                    completedText.includes(lowerCaseQuery) ||
                                    taskItem.created_at.toLowerCase().includes(lowerCaseQuery) ||
                                    taskItem.updated_at.toLowerCase().includes(lowerCaseQuery)
                                )
                            }).sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
                            .map((taskItem, index) => (
                                <div className="row" key={taskItem.id}>
                                    {/* Displaying task details */}
                                    <div className="col-xl-6 col-md-6 col-12">Title - {taskItem.title}</div>
                                    <div className="col-xl-6 col-md-6 col-12">Status - {taskItem.completed ? 'Complete' : 'Incomplete'}</div>
                                    <div className="col-12">Description - {taskItem.description}</div>
                                    <div className="col-12 d-flex justify-content-around">
                                        <div className="button-container">
                                            <div className="row">
                                                {/* Edit and Delete buttons */}
                                                <div className="col-6">
                                                    <Button variant="primary" onClick={() => handleEditClick(taskItem)}>Edit</Button>
                                                </div>
                                                <div className="col-6">
                                                    <button className='btn btn-danger mb-3' onClick={() => handleDelete(taskItem.id)}>Delete</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-md-6 col-12">Created - {new Date(taskItem.created_at).toLocaleString('en-In')}</div>
                                    <div className="col-xl-6 col-md-6 col-12 text-red">Last Updated - {new Date(taskItem.updated_at).toLocaleString('en-In')}</div>
                                    <hr />
                                </div>
                            ))}
                        </>
                    )}
                </ul>
            </div>

            {/* Modal for editing tasks */}
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton className='bg-primary text-white'>
                    <Modal.Title className='w-100 bg-primary text-white'>Edit Task</Modal.Title>
                </Modal.Header>
                <Modal.Body className='bg-dark px-2 py-5 text-white'>
                    {/* Form inside the modal for editing task details */}
                    <div className="mt-4 mb-2">
                        <label htmlFor="" style={{ fontSize: '20px' }}>Update Title</label>
                        <input type="text" className='form-control' value={editTask.title} onChange={handleChangeTitle} placeholder='Add Title' />
                    </div>
                    <div className="mt-4 mb-2">
                        <label htmlFor="" style={{ fontSize: '20px' }}>Update Description</label>
                        <input type="text" className='form-control' value={editTask.description} onChange={handleChangeDescription} placeholder='Add Description' />
                    </div>
                    <div className="mt-4 mb-2">
                        <label htmlFor="" style={{ fontSize: '20px' }}>Update Status</label>
                        
                        {/* Dropdown for updating task status */}
                        <select
                            className="form-control"
                            onChange={handleChangeStatus}
                            value={editTask.completed ? 'completed' : 'incompleted'}
                        >
                            <option value="completed">Completed</option>
                            <option value="incompleted">Incomplete</option>
                        </select>
                    </div>
                </Modal.Body>
                {/* Modal footer with update and close buttons */}
                <Modal.Footer className='bg-primary'>
                    <Button variant="success" onClick={handleEdit}>Update</Button>
                    <Button variant="danger" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default TaskManager;
