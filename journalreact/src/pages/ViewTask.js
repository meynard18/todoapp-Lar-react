import React, {useState, useEffect} from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';

const ViewTask = () => {
    const [task, setTask] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(()=> {
        axios.get(`api/task`).then(res=> {
            if(res['status']===200) {
                setTask(res.data.task);
                setLoading(false);
            }
        })
    }, []); 
    const deleteTask = (e, id) => {
        e.preventDefault();
        const delClick = e.currentTarget;
        delClick.innertext = "Deleting";

        axios.delete(`api/deletetask/${id}`).then(res => {
            if(res.data.status === 200)
            {
                swal("Deleted!",res.data.message,"success");
                delClick.closest("tr").remove();
            }
            else if(res.data.status === 404)
            {
                swal("Error",res.data.message,"error");
                delClick.innerText = "Delete";
            }
        });
    }
    if (loading) {
        return <h4>Loading Product Data</h4>
    }
    else {
        var task_HTMLTABLE="";
        task_HTMLTABLE = task.map((item, index) => {
            return (
            <tr key={index}>
                <td>{item.id}</td>
                <td>{item.task}</td>
                <td>{item.date}</td>
                <td><Link to={`edittask/${item.id}`} className='btn btn-success btn-sm'>EDIT</Link></td>
                <td ><button type='button' className="btn btn-danger btn-sm" onClick={(e) => deleteTask(e, item.id)}>DELETE</button></td>

            </tr>)
        });
    };
    return (
        <div>
            <div className='container'>
                
                <div className="card">
                    <div className="card-header">
                     
                        
                    </div>
                    <div className="card-body">
                        <table className='table table-bordered table-responsive' >
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Task</th>
                                    <th>Date</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {task_HTMLTABLE}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ViewTask