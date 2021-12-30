import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Navbar from './pages/Navbar';
import AddTask from './pages/AddTask';
import axios from 'axios';
import EditTask from './EditTask';
// import ViewTask from './ViewTask';
axios.defaults.baseURL = 'http://localhost:8000/';

function App() {
   return (
      <Router>
         <div className="App">
            <Navbar />
           
        

            <div className="content">
               <Routes>
                  <Route exact path="/addTask" element={<AddTask />}></Route>
                  <Route
                     exact
                     path="addTask/edittask/:id"
                     element={<EditTask />}
                  ></Route>
               </Routes>
            </div>
         </div>
      </Router>
   );
}

export default App;
