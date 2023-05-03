import React from 'react'
import { useLocation } from 'react-router-dom';
import {Navigate} from "react-router-dom"
const Home = () => {
   const {state} =useLocation();
   
  return (
    <>
     {state?.logged?<div>entramos y este es el token {state.token}</div>:<Navigate to="/"/>}
   </>
  )
}

export default Home;