import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Navigate, Redirect } from "react-router-dom";
import "./Home.css";
import "./AcidezPage.css";
import NavBar from "../componentes/NavBar";
import Monitoreos from "../componentes/Monitoreos";
import Acidez from "../componentes/Acidez";
import { format } from "date-fns";
import { URL_API_AGP } from "../utilidades/constantes";
import {AiOutlineEye} from "react-icons/ai"

import ModalAcidez from "../componentes/ModalAcidez";


const AcidezPage = () => {
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

  const getCliente = async () => {
    const respuesta = await fetch(URL_API_AGP+"/api/Auth/Cliente", {
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
    setAcidez(data);
  };

  useEffect(() => {
    if (statuto) {
      setAuth(true);
    }

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
            
              <div className="cont-datos">
                <div>
                  <div className="acidez-titulo">
                  
                    <h3>Acidez de Fruta</h3>
                  </div>
                  <div className="table-responsive">
                    <table className="table container">
                      <thead>
                        <tr>
                          <th scope="col">Nº Informe</th>
                          <th scope="col">Productor</th>
                          <th scope="col">Predio</th>
                          <th scope="col">Localidad</th>
                          <th scope="col">Fecha Muestreo</th>
                          <th scope="col">Fecha Ingreso</th>
                          <th scope="col">Fecha Análisis</th>
                          <th scope="col">Fecha Informe</th>
                          <th scope="col">Especie</th>
                          <th scope="col">Muestreador</th>
                          <th scope="col">Observaciones</th>
                          <th scope="col">Informe</th>
                          <th scope="col">Resultados Acidez</th>
                        </tr>
                      </thead>

                      <tbody className="table-group-divider">
                        {acidez.sort((a,b)=> a.NumApg-b.NumApg).map((acceso) => {
                          

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
                                <td style={{ textTransform: 'uppercase'}}>{format(new Date(acceso.FechaMuestreo), "dd-MM-yyyy")}</td>
                                <td style={{ textTransform: 'uppercase'}}>{format(new Date(acceso.FechaIngreso),"dd-MM-yyyy")}</td>
                                <td style={{ textTransform: 'uppercase'}}>{format(new Date(acceso.FechaAnalisis),"dd-MM-yyyy")}</td>
                                <td style={{ textTransform: 'uppercase'}}>{format(new Date(acceso.FechaInforme),"dd-MM-yyyy")}</td>
                                <td style={{ textTransform: 'uppercase'}}>{acceso.Especie}</td>
                                <td style={{ textTransform: 'uppercase'}}>{acceso.Muestreador}</td>
                                <td style={{ textTransform: 'uppercase'}}>{acceso.Observaciones}</td>
                               
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
