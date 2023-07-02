import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Navigate, Redirect } from "react-router-dom";
import "./Home.css";
import "./AcidezPage.css";
import NavBar from "../componentes/NavBar";
import Monitoreos from "../componentes/Monitoreos";
import Acidez from "../componentes/Acidez";
import { format, parseISO,isSameDay,parse } from "date-fns";
import { URL_API_AGP } from "../utilidades/constantes";
import {AiOutlineEye} from "react-icons/ai"

import ModalAcidez from "../componentes/ModalAcidez";
import { getAcidez, getCliente } from "../utilidades/Servicios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const AcidezPage = () => {


  const [busqueda, setBusqueda] = useState("");

  const [nuevo, setDatos] = useState([]);
  const [acidez, setAcidez] = useState([]);
  const estado = useLocation().state;
  const tokesito = useLocation().state;

  const [auth, setAuth] = useState(false);
  const [cliente, setCliente] = useState([]);
  const t = localStorage.getItem("token");

  const { state } = useLocation();
  const statuto = localStorage.status;

  let info = [{}];

  const getClientes = async () => {
    const respuesta = await getCliente(t);
    setCliente(respuesta);
  };

  const getAcideces = async () => {
    const respuesta = await getAcidez(t);
    setAcidez(respuesta.Entities);
  };

  const fnBusqueda = (e)=>{
     setBusqueda(e.target.value);
     
  }
  const [startDate, setStartDate] = useState(new Date());
  const [fechSel , setFechaSel] = useState();
  
  // startDate.split('-').reverse().join('-')
  
  let fechaFormateado ="";
  let nuevoFechaFormateado ="";
   function diaSeleccionado(date){
    fechaFormateado = obtenerFechaFormateada(date)
   
    setStartDate(date);
    // nuevoFechaFormateado= fechaFormateado.split('-').reverse().join('-');
    setFechaSel(fechaFormateado.split('-').reverse().join('-'));
    
   }


 

   const obtenerFechaFormateada = (date) => {
    const dia = format(date, "dd");
    const mes = format(date, "MM");
    const año = format(date, "yyyy");
    return `${dia}-${mes}-${año}`;
  };

 

  const resultados = !busqueda ? acidez : acidez.filter((datos)=> datos.Productor.toLowerCase().includes(busqueda.toLowerCase()) || datos.Localidad.toLowerCase().includes(busqueda.toLowerCase()) || datos.FechaInforme.includes(fechSel));
  
 
  

  useEffect(() => {
    if (statuto) {
      setAuth(true);
    }

    getAcideces();
    getClientes();
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
            
              <div className="cont-datos">
                <div>
                  <div className="acidez-titulo">
                  
                    <h3>Acidez de Fruta</h3>
                    <input type="text" onChange={fnBusqueda} value={busqueda} placeholder="Ingresar Busqueda" className="form-control"/>
                    <DatePicker className="form-control" showYearDropdown  selected={startDate} onChange={(date) => diaSeleccionado(date)} dateFormat="dd-MM-yyyy"/>
                    <br/>
                  </div>
                  <div className="table-responsive">
                    <table className="table container">
                      <thead>
                        <tr>
                          <th scope="col">Nº Informe</th>
                          <th scope="col">Productor</th>
                          <th scope="col">Predio</th>
                          <th scope="col">Localidad</th>
                        
                          <th scope="col">Fecha Ingreso</th>
                        
                          <th scope="col">Fecha Informe</th>
                          <th scope="col">Especie</th>
                          <th scope="col">Muestreador</th>
                         
                          <th scope="col">Informe</th>
                          <th scope="col">Resultados Acidez</th>
                        </tr>
                      </thead>

                      <tbody className="table-group-divider">
                        {resultados?.sort((a,b)=> a.NumApg-b.NumApg).map((acceso) => {
                         

                          return (
                            <>
                            <ModalAcidez info={acceso} id={acceso.Id}/> 
                              <tr key={acceso.Id}>
                                <td scope="row">
                                  {acceso.NumApg}
                                </td>
                                <td className="lcase" style={{ textTransform: 'uppercase'}}>
                                  {acceso.Productor
                                    ? acceso.Productor
                                    : "Sin información"}
                                </td>
                                <td style={{ textTransform: 'uppercase'}}>{acceso.Predio}</td>
                                <td style={{ textTransform: 'uppercase'}}>{acceso.Localidad}</td>
                                
                                <td style={{ textTransform: 'uppercase'}}>{acceso.FechaIngreso != null ? format(parseISO(acceso?.FechaIngreso), "dd/MM/yyyy") : ''}</td>
                                
                                <td style={{ textTransform: 'uppercase'}}>{format(parseISO(acceso?.FechaInforme), "dd/MM/yyyy")}</td>
                                <td style={{ textTransform: 'uppercase'}}>{acceso.Especie}</td>
                                <td style={{ textTransform: 'uppercase'}}>{acceso.Muestreador}</td>
                              
                               
                                <td style={{ textTransform: 'uppercase'}}>
                                  {acceso.InformeAdjunto ? (
                                    <a target="_blank" href={process.env.REACT_APP_API_PATH + acceso.InformeAdjunto}>
                                      {" "}
                                      Descargar Informe
                                    </a>
                                  ) : (
                                    <p style={{ color: "red" }}>En Proceso</p>
                                  )}
                                </td>
                                <td style={{ textTransform: 'uppercase' }}>
                                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={"#exampleModalAcidez"+acceso.Id}>
                                  <AiOutlineEye style={{ fontSize: 24 }} />
                                </button>
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
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default AcidezPage;
