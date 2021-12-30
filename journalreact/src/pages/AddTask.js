import React, { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { Link, useNavigate } from 'react-router-dom';
import ViewTask from '../ViewTask';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
   form: {
    
   },
}));

function AddTask() {
   const history = useNavigate();
   const [taskInput, setTask] = useState({
      task: '',
      date: '',
      error_list: [],
   });

   const handleInput = (e) => {
      e.persist();
      setTask({ ...taskInput, [e.target.name]: e.target.value });
   };

   const saveTask = (e) => {
      e.preventDefault();
      const data = {
         task: taskInput.task,
         date: taskInput.date,
      };

      axios.post(`api/addTask`, data).then((res) => {
         if (res.data.status === 200) {
            swal('Success', res.data.message, 'Success');
            setTask({
               task: '',
               date: '',
               error_list: [],
            });
            console.log(setTask);
            history.push('/addTask');
         } else if (res.data.status === 422) {
            setTask({ ...taskInput, error_list: res.data.validate_err });
         }
      });
   };

   const classes = useStyles();
   return (
      <div>
         <div className="container">
            <div className="card">
               <div class="card-header">
                  <h4>TODO APP</h4>
                  <Link to={'/addTask'} className="btn btn-sm float-end">
                     Back
                  </Link>
               </div>
               <div class="card-body">
                  <form onSubmit={saveTask} method="POST" className={classes.form}>
                     <div className="form-group mb-3">

                        <input
                           className="form-control"
                           type="text"
                           name="task"
                           onChange={handleInput}
                           value={taskInput.name}
                           placeholder="Write your task"
                        />
                        <span className="text-danger">
                           {taskInput.error_list.task}
                        </span>
                     </div>
                     <div className="form-group mb-3">
                        <label for="description">Date</label>
                        <input
                           className="form-control"
                           type="date"
                           name="date"
                           onChange={handleInput}
                           value={taskInput.date}
                        />
                        <span className="text-danger">
                           {taskInput.error_list.date}
                        </span>
                     </div>

                     <button type="submit" className="btn btn-primary">
                        Submit
                     </button>
                  </form>
               </div>
            </div>
         </div>
         <ViewTask />
      </div>
   );
}

export default AddTask;
