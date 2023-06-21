import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { Navigate, Redirect } from "react-router-dom";
import "./Home.css";
import NavBar from "../componentes/NavBar";
import Monitoreos from "../componentes/Monitoreos";
import Acidez from "../componentes/Acidez";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdMonitor } from "react-icons/md";
import { GiGrapes } from "react-icons/gi";
import { FiArrowRight } from "react-icons/fi";

import { URL_API_AGP } from "../utilidades/constantes";

const Home = () => {
  const [nuevo, setDatos] = useState(0);
  const [acidez, setAcidez] = useState(0);
  const [recep, setRecep] = useState(0);

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
    const data = await result.TotalCount;
    setDatos(data);
  };

  const getCliente = async () => {
    toast.success("Conectado correctamente!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
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
    const respuesta = await fetch(URL_API_AGP + "/api/Servicios/AcidezFruta", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + t,
        "Content-Type": "application/json",
      },
    });

    const result = await respuesta.json();
    const data = await result.TotalCount;
    setAcidez(data);
  };

  const getRecepcion = async () => {
    const respuesta = await fetch("https://service.agropraxisgroup.cl/api/Servicios/Recepciones", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + t,
        "Content-Type": "application/json",
      },
    });

    const result = await respuesta.json();
    const data = await result.TotalCount;
    console.log(data);
    setRecep(data);
  };

  useEffect(() => {
    if (statuto) {
      setAuth(true);
    }
    getRecepcion();
    getMonitoreo();
    getAcidez();
    getCliente();
    
  }, []);

  return (
    <>
      {statuto ? (
        <div className="contenedor">
          <div className="izquierda">
            <ToastContainer />
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
                {/* <Acidez className="acide" nuevo={acidez} /> */}
                {/* <Monitoreos nuevo={nuevo} /> */}

                <div className="contenedorCardDash">
                  <div className="cardDash">
                    <h3>
                      <GiGrapes style={{ fontSize: 23 }} />
                      Total Acidez
                    </h3>
                    <span>
                      <FiArrowRight /> {acidez} ( Activos )
                    </span>
                  </div>

                  <div className="cardDash">
                    <h3>
                      <MdMonitor style={{ fontSize: 23 }} /> Total Monitoreo
                    </h3>
                    <span>
                      <FiArrowRight /> {nuevo} ( Activos )
                    </span>
                  </div>

                  <div className="cardDash">
                    <h3>
                      <MdMonitor style={{ fontSize: 23 }} /> Recepciones
                    </h3>
                    <span>
                      <FiArrowRight /> {recep} ( Activos )
                    </span>
                    <span>
                      <FiArrowRight /> {(acidez + nuevo) - recep} ( Pendientes )
                    </span>
                  </div>
                </div>
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
