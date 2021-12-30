import { AppBar } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
   navbar: {
      backgroundColor: 'black',
      width: '300px',
   },
}));

function Navbar() {
   const classes = useStyles();
   return (
      <div>
         <Link to='/'>Home</Link>
         <Link to="/addTask">Task</Link>
      </div>
   );
}

export default Navbar;
