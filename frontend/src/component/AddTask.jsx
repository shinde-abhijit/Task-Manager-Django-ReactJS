import React, { useState } from 'react'
import axios from 'axios';




const AddTask = ({setTasks, fetchTasks }) => {
    const [ newTask, setNewTask ] = useState({
        'title':'',
        'description':'',
        'completed': false
    })
    const handleChangeTitle = (e) => {
        setNewTask(prev => ({
            ...prev,
            'title': e.target.value,
        }))
        console.log(newTask);
    }
    const handleChangeDescription = (e) => {
        setNewTask(prev => ({
            ...prev,
            'description': e.target.value,
        }))
        console.log(newTask);
    }
    const handleChangeStatus = (e) => {
        setNewTask((prev) => ({
            ...prev,
            completed: e.target.value === 'completed',
        }));
        console.log(newTask);
    };
    
    const postTasks = async () => {
        if (newTask.title.trim() === '' || newTask.description.trim() === '') {
            alert('Title and description cannot be blank.');
            return;
        }
        try{
            await axios.post("http://127.0.0.1:8000/api/task-list/", newTask);
            setNewTask({
                    'title':'', 'description':'', 'completed': false
                }
            );
            fetchTasks();
        }catch(error){
            console.log(error);
        }
    }
    
  return (
    <>
        <div className='container w-75'>
            <div className="row">
                <div className="col-xl-6 col-lg-6 col-md-6 col-12 mt-1 mb-1">
                    <input type="text" className='form-control' placeholder='Add Title' onChange={handleChangeTitle} value={newTask.title} />
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-12 mt-1 mb-1">
                    <input type="text" className='form-control' placeholder='Add Description' onChange={handleChangeDescription} value={newTask.description} />
                </div>
                <div className="col-10 mt-1 mb-1">
                <select
                    className="form-control"
                    onChange={handleChangeStatus}
                    value={newTask.completed ? 'completed' : 'incompleted'}
                    >
                    <option value="completed">Completed</option>
                    <option value="incompleted">Incomplete</option>
                </select>               
                </div>
                <div className="btnContainer col-2 mt-1 mb-1">
                    <button className="btn btn-primary" onClick={postTasks}
                    onKeyDown={(e) => {
                        if(e.key==='Enter'){
                            postTasks()
                        }
                    }}>Add Task</button>
                </div>
            </div>
        </div>
    </>
    )
}

export default AddTask
