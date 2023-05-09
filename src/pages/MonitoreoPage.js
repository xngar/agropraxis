import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Navigate,Redirect} from "react-router-dom";
import "./Home.css";
import NavBar from "../componentes/NavBar";
import Monitoreos from "../componentes/Monitoreos";
import Acidez from "../componentes/Acidez";
import { isValid,parseISO ,format} from "date-fns";
import { ImDownload3 } from "react-icons/im";
import {TbReport} from 'react-icons/tb';
import {URL_API_AGP} from '../utilidades/constantes';
import { icons } from "react-icons";


 

const MonitoreoPage = () => {
  
  const [nuevo, setDatos] = useState([]);
  const [acidez, setAcidez] = useState([]);
  const estado = useLocation().state;
  
  const [auth, setAuth] = useState(false);
  const [cliente, setCliente] = useState([]);

  const {state} = useLocation();
  const statuto = localStorage.status;
  const t = localStorage.getItem("token");

  let info = [{}];

  const getMonitoreo = async () => {
    const respuesta = await fetch(URL_API_AGP +"/api/Servicios/Monitoreos",
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
    setDatos(data);
  };

  const getCliente = async ()=>{

    const respuesta = await fetch(URL_API_AGP +"/api/Auth/Cliente",{
      method:"GET",
      headers:{
        Authorization: "Bearer " + t,
        "Content-Type": "application/json"
      }
    });

    const result = await respuesta.json();
    const data = result.Entities;
    setCliente(data);
  }

  

  useEffect(() => {
    if(statuto){
      setAuth(true);
    }
    
    getMonitoreo();
  
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
    <div className="cont-datos">
    <div>
        <div className='monitoreo-titulo'>
         
        <img src="img-monitoreo.png" width="50" /><h3>Monitoreos</h3>
        </div>
        <div className='table-responsive'>
          <table className="table container">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Cliente</th>
                <th scope="col">Productor</th>
                <th scope="col">Carozos</th>
                <th scope="col">Tipo Análisis</th>
                <th scope="col">Variedad</th>
                <th scope="col">Especie</th>
                <th scope="col">Fecha</th>
                <th scope="col">Fecha Emisión</th>
                <th scope="col">Analista</th>
                <th scope="col">Predio</th>
                <th scope="col">Informe <TbReport size={30}/></th>
              </tr>
            </thead>

            <tbody className="table-group-divider">
              {nuevo.map((acceso) => {

let fecha = "";
let fechaEmision = "";
if (acceso.Fecha && isValid(parseISO(acceso.Fecha))) {
  fecha = format(parseISO(acceso.Fecha), "dd/MM/yyyy");
}
if (
  acceso.FechaEmision &&
  isValid(parseISO(acceso.FechaEmision))
) {
  fechaEmision = format(parseISO(acceso.FechaEmision), "dd/MM/yyyy");
}
               
                
                return (
                  <>
                    <tr>
                      <td key={acceso.Id} scope="row">
                        {acceso.Id}
                      </td>
                      <td className="lcase">{acceso.Cliente}</td>
                      <td className="lcase">
                        {acceso.Productor
                          ? acceso.Productor
                          : "Sin información"}
                      </td>
                      <td className="lcase">{acceso.Carosos}</td>
                      <td>{acceso.TipoAnalisis}</td>
                      <td>{acceso.Variedad}</td>
                      <td>{acceso.Especie}</td>
                      <td>{fecha}</td>
                      <td>{fechaEmision}</td>
                      <td>{acceso.Analista}</td>
                      <td>{acceso.Predio}</td>
                      <td>
                                  {acceso.InformeAdjunto ? (
                                    <a
                                      target="_blank"
                                      href={
                                        process.env.REACT_APP_API_PATH +
                                        acceso.InformeAdjunto
                                      }
                                    >
                                      {" "}
                                      <ImDownload3 size={30}/>
                                    </a>
                                  ) : (
                                    <p style={{ color: "red" }}>En Proceso</p>
                                  )}
                                </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
          </div>
    </div>
    </div>
    </div>
    
  </div>
</div>:<Navigate to="/"/>}
  
      
    </>
  );
};

export default MonitoreoPage;
