import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Navigate, Redirect } from "react-router-dom";
import "./Home.css";
import "./MonitoreoPage.css"
import NavBar from "../componentes/NavBar";
import Monitoreos from "../componentes/Monitoreos";
import Acidez from "../componentes/Acidez";
import { isValid, parseISO, format } from "date-fns";
import { ImDownload3 } from "react-icons/im";
import { TbReport } from "react-icons/tb";
import { URL_API_AGP } from "../utilidades/constantes";
import { icons } from "react-icons";
import {AiOutlineEye} from "react-icons/ai"
import Modal from "../componentes/Modal";
import { getCliente, getMonitoreo } from "../utilidades/Servicios";

const MonitoreoPage = () => {
  const [nuevo, setDatos] = useState([]);
  const [acidez, setAcidez] = useState([]);
  const estado = useLocation().state;

  const [auth, setAuth] = useState(false);
  const [cliente, setCliente] = useState([]);

  const { state } = useLocation();
  const statuto = localStorage.status;
  const t = localStorage.getItem("token");

  let info = [{}];

  const getMonitoreos = async () => {
    const respuesta = await getMonitoreo(t);
    setDatos(respuesta.Entities);
  };

  const getClientes = async () => {
    const respuesta = await getCliente(t);
    setCliente(respuesta);
  };

  useEffect(() => {
    if (statuto) {
      setAuth(true);
    }

    getMonitoreos();

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
                  <div className="monitoreo-titulo">
                  
                    <h3>Monitoreos</h3>
                  </div>
                  <div className="table-responsive">
                    <table className="table container">
                      <thead>
                        <tr>
                          <th scope="col">Nº Informe</th>
                          <th scope="col">Productor</th>
                          <th scope="col">Carozos</th>
                          <th scope="col">Tipo Análisis</th>
                          <th scope="col">Especie</th>
                          <th scope="col">Fecha</th>
                          <th scope="col">Fecha Emisión</th>
                          <th scope="col">Analista</th>
                          <th scope="col">Predio</th>
                          <th scope="col">Análisis de Monitoreo</th>
                          <th scope="col">Informe</th>
                        </tr>
                      </thead>

                      <tbody className="table-group-divider">
                        {nuevo.map((acceso) => {
                          
                    return (<>
                            <Modal info={acceso} id={acceso.Id} />
                              <tr className="hover-tabla" key={acceso.Id}>
                                <td scope="row">
                                  {acceso.NumAPG}
                                </td>
                                <td className="lcase" style={{ textTransform: 'uppercase'}}>
                                  {acceso.Productor
                                    ? acceso.Productor
                                    : "Sin información"}
                                </td>
                                <td className="lcase" style={{ textTransform: 'uppercase'}}>{acceso.Carosos}</td>
                                <td style={{ textTransform: 'uppercase'}}>{acceso.TipoAnalisis}</td>
                                <td style={{ textTransform: 'uppercase'}}>{acceso.Especie}</td>
                                <td style={{ textTransform: 'uppercase'}}>{format(parseISO(acceso.Fecha),"dd/MM/yyyy")}</td>
                                <td style={{ textTransform: 'uppercase'}}>{format(parseISO(acceso.FechaEmision), "dd/MM/yyyy")}</td>
                                <td style={{ textTransform: 'uppercase'}}>{acceso.Analista}</td>
                                <td style={{ textTransform: 'uppercase'}}>{acceso.Predio}</td>
                                <td style={{ textTransform: 'uppercase'}}>
                                  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target={"#exampleModal"+acceso.Id}>
                                     <AiOutlineEye style={{fontSize:24}}/>
                                </button>
                                </td>
                                <td style={{ textTransform: 'uppercase'}}>
                                  {acceso.InformeAdjunto ? (
                                    <a
                                      target="_blank"
                                      href={
                                        process.env.REACT_APP_API_PATH +
                                        acceso.InformeAdjunto
                                      }
                                    >
                                      {" "}
                                      <p style={{ color: "white", background:"green",borderRadius:"20px", padding:"8px", fontSize:"14px", textAlign:"center", textTransform:"capitalize", letterSpacing:1 }}>Descargar</p>
                                    </a>
                                  ) : (
                                    <p style={{ color: "white", background:"red",borderRadius:"20px", padding:"3px", fontSize:"12px", textAlign:"center" }}>En Proceso</p>
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
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default MonitoreoPage;
