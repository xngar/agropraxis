import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Navigate,Redirect} from "react-router-dom";
import "./Home.css";
import NavBar from "../componentes/NavBar";
import Monitoreos from "../componentes/Monitoreos";
import Acidez from "../componentes/Acidez";


const Home = () => {
  
  const [nuevo, setDatos] = useState([]);
  const [acidez, setAcidez] = useState([]);
  const estado = useLocation().state;
  const [auth, setAuth] = useState(false);
  const [cliente, setCliente] = useState([]);

  const {state} = useLocation();
  const statuto = localStorage.status;
  
  let info = [{}];

  const getMonitoreo = async () => {
    const respuesta = await fetch(
      "https://localhost:7126/api/Servicios/Monitoreos",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + estado?.token,
          "Content-Type": "application/json",
        },
      }
    );
   
    const result = await respuesta.json();
    
    const data = await result.Entities;
    setDatos(data);
  };

  const getCliente = async ()=>{

    const respuesta = await fetch("https://localhost:7126/api/Auth/Cliente",{
      method:"GET",
      headers:{
        Authorization: "Bearer " + estado?.token,
        "Content-Type": "application/json"
      }
    });

    const result = await respuesta.json();
    console.log(result.Entities[0].RazonSocial);
    const data = result.Entities;
    console.log(data[0].RazonSocial)
    setCliente(data);
  }

  const getAcidez = async () => {
    const respuesta = await fetch(
      "https://localhost:7126/api/Servicios/AcidezFruta",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + estado?.token,
          "Content-Type": "application/json",
        },
      }
    );

    const result = await respuesta.json();
    const data = await result.Entities;
    setAcidez(data);
  };

  useEffect(() => {
    if(statuto){
      setAuth(true);
    }
    
    getMonitoreo();
    getAcidez();
    getCliente();
    
    
  }, []);

   
   
 
  return (
    <>
    {statuto?<div className="contenedor">
  

  <div className="izquierda">
    <NavBar cliente={cliente}/>
  </div>
  <div className="derecha">
    <div className="derecha-contenedor"> 
    <div className="banner">
    {/* {state?.logged ? <h1>¡Bienvenido {state.nombre}!</h1> : <Navigate to={"/"} />} */}
    </div>
    <Acidez nuevo={acidez}/>
    <Monitoreos nuevo={nuevo}/>
    
    </div>
    
  </div>
</div>:<Navigate to="/"/>}
  
      
    </>
  );
};

export default Home;
