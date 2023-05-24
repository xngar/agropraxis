import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { Navigate, Redirect } from "react-router-dom";
import "./Home.css";
import NavBar from "../componentes/NavBar";
import Monitoreos from "../componentes/Monitoreos";
import Acidez from "../componentes/Acidez";

import { URL_API_AGP } from "../utilidades/constantes";






const Home = () => {
  
 
  const [nuevo, setDatos] = useState([]);
  const [acidez, setAcidez] = useState([]);
  const estado = useLocation().state;
  const tokesito = useLocation().state;

  const [auth, setAuth] = useState(false);
  const [cliente, setCliente] = useState([]);

  const { state } = useLocation();
  const statuto = localStorage.status;
  const t = localStorage.getItem("token");
  const nombreCliente = localStorage.getItem("cliente");


  let info = [{}];

  const getMonitoreo = async () => {
    const respuesta = await fetch(URL_API_AGP + "/api/Servicios/Monitoreos", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + t,
        "Content-Type": "application/json",
      },
    });

    const result = await respuesta.json();
    const data = await result.Entities;
    setDatos(data);
  };

  const getCliente = async () => {
    const respuesta = await fetch(URL_API_AGP + "/api/Auth/Cliente", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + t,
        "Content-Type": "application/json",
      },
    });

    const result = await respuesta.json();

    const data = result.Entities;

    setCliente(data);
  };

  const getAcidez = async () => {
    const respuesta = await fetch(URL_API_AGP + "/api/Servicios/AcidezFruta",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + t,
          "Content-Type": "application/json",
        },
      }
    );

    const result = await respuesta.json();
    const data = await result.Entities;
    console.log('Datos recibidos: ', data)
    setAcidez(data);
  };

  useEffect(() => {
    if (statuto) {
      setAuth(true);
    }

    getMonitoreo();
    getAcidez();
   getCliente();
  }, []);

  return (
    <>
    
     
      
      {statuto ? (
        <div className="contenedor">
          
       
          <div className="izquierda">
            <NavBar cliente={cliente} />
           
          </div>
          <div className="derecha">
            <div className="derecha-contenedor">
              <div className="banner">
                <div className="izq">
                <h1>¡Bienvenido {nombreCliente}!</h1>
                <p>
                  Abajo veras los últimos ingresos en Monitoreo y Acidez de
                  Frutas
                </p>
                </div>
                <div className="banner-img">
                  <img src="imagen-banner.png" height={120} />
                </div>
              </div>
              <div className="cont-datos">
              <Acidez className="acide" nuevo={acidez} />
                <Monitoreos nuevo={nuevo} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
      
    </>
  );
};

export default Home;
