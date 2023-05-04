import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
import "./Home.css";
import NavBar from "../componentes/NavBar";
import Monitoreos from "../componentes/Monitoreos";
import Acidez from "../componentes/Acidez";


const Home = () => {
  const { state } = useLocation();
  const [nuevo, setDatos] = useState([]);
  const [acidez, setAcidez] = useState([]);

  let info = [{}];

  const getMonitoreo = async () => {
    const respuesta = await fetch(
      "https://localhost:7126/api/Servicios/Monitoreos",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + state.token,
          "Content-Type": "application/json",
        },
      }
    );

    const result = await respuesta.json();
    const data = await result.Entities;
    setDatos(data);
  };

  const getAcidez = async () => {
    const respuesta = await fetch(
      "https://localhost:7126/api/Servicios/AcidezFruta",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + state.token,
          "Content-Type": "application/json",
        },
      }
    );

    const result = await respuesta.json();
    const data = await result.Entities;
    setAcidez(data);
  };

  useEffect(() => {
    getMonitoreo();
    getAcidez();
  }, []);

  return (
    <>
      <div className="contenedor">

        <div className="izquierda">
          <NavBar/>
        </div>
        <div className="derecha">
          <div className="derecha-contenedor"> 
          <div className="banner">
            {state?.logged ? <h1>¡Bienvenido {state.nombre}!</h1> : <Navigate to="/" />}
          </div>
          <Acidez nuevo={acidez}/>
          <Monitoreos nuevo={nuevo}/>
          
          </div>
          
        </div>
      </div>
    </>
  );
};

export default Home;
