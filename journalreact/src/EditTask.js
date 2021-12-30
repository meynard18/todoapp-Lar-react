import React, { useState, useEffect } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { Link, useNavigate, useParams } from 'react-router-dom';

const EditTask = () => {
   const navigate = useNavigate();
   const [task, setTask] = useState([]);
   const [loading, setLoading] = useState(true);
   const [errorInput, setError] = useState([]);
   const { id } = useParams();

   const handleInput = (e) => {
      e.persist();
      setTask({ ...task, [e.target.name]: e.target.value });
   };

   useEffect(() => {
      const task_id = id;
      axios.get(`api/edittask/${task_id}`).then((res) => {
         if (res.data.status === 200) {
            setTask(res.data.task);
            setLoading(false);
         } else if (res.data.status === 404) {
            swal('Error', res.data.message, 'Error');
            navigate('/addTask');
         }
      });
   }, [navigate, id]);

   const updateTask = (e) => {
      e.preventDefault();
      //any changes to input
      const data = {
         task: task.task,
         date: task.date,
      };
      //any changes will be passed to axious
      axios.put(`api/updatetask/${id}`, data).then((res) => {
         if (res.data.status === 200) {
            swal('Success', res.data.message);
            setError([]);
            // setTask(res.data.product);
            // setLoading(false);
         } else if (res.data.status === 404) {
            swal('Error', res.data.message, 'Error');
            navigate('/');
         } else if (res.data.status === 422) {
            swal('All fields are mandatory', '');
            setError(res.data.validationError);
         }
      });
   };
   if (loading) {
      return <h4>Loading Edit Task Table</h4>;
   }

   return (
      <div>
         <div className="container">
            <div className="card">
               <div className="card-header">
                  <h4>
                     Edit Task
                     <Link to={'/addTask'} className="btn btn-sm float-end">
                        BACK
                     </Link>
                  </h4>
               </div>
               <div className="card-body">
                  <form onSubmit={updateTask}>
                     <div className="form-group mb-3">
                        <label htmlFor="name">Task</label>
                        <input
                           className="form-control"
                           type="text"
                           name="task"
                           onChange={handleInput}
                           value={task.task}
                        />
                        <span className="text-danger">{errorInput.task}</span>
                     </div>
                     <div className="form-group mb-3">
                        <label htmlFor="date">Date</label>
                        <input
                           className="form-control"
                           type="date"
                           name="date"
                           onChange={handleInput}
                           value={task.date}
                        />
                        <span className="text-danger">
                           {errorInput.date}
                        </span>
                     </div>
           
                     

                     <button type="submit" className="btn btn-primary">
                        Update Task
                     </button>
                  </form>
               </div>
            </div>
         </div>
      </div>
   );
};

export default EditTask;
