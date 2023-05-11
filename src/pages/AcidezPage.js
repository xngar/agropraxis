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
                          <th scope="col">#</th>
                          <th scope="col">Cliente</th>
                          <th scope="col">Productor</th>
                          <th scope="col">Predio</th>
                          <th scope="col">Localidad</th>
                          <th scope="col">Fecha Muestreo</th>
                          <th scope="col">Fecha Ingreso</th>
                          <th scope="col">Fecha Análisis</th>
                          <th scope="col">Fecha Informe</th>
                          <th scope="col">Especie</th>
                          <th scope="col">Variedad</th>
                          <th scope="col">Muestreador</th>

                          <th scope="col">Observaciones</th>
                          <th scope="col">Informe Adjunto</th>
                        </tr>
                      </thead>

                      <tbody className="table-group-divider">
                        {acidez.map((acceso) => {
                          let fechaIngreso = format(
                            new Date(acceso.FechaIngreso),
                            "dd-MM-yyyy"
                          );
                          let fechaMuestreo = format(
                            new Date(acceso.FechaMuestreo),
                            "dd-MM-yyyy"
                          );
                          let fechaAnalisis = format(
                            new Date(acceso.FechaAnalisis),
                            "dd-MM-yyyy"
                          );
                          let fechaInforme = format(
                            new Date(acceso.FechaInforme),
                            "dd-MM-yyyy"
                          );

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
                                <td>{acceso.Predio}</td>
                                <td>{acceso.Localidad}</td>
                                <td>{fechaMuestreo}</td>
                                <td>{fechaIngreso}</td>
                                <td>{fechaAnalisis}</td>
                                <td>{fechaInforme}</td>
                                <td>{acceso.Especie}</td>
                                <td>{acceso.Variedad}</td>
                                <td>{acceso.Muestreador}</td>
                                <td>{acceso.Observaciones}</td>
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
                                      Descargar Informe
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
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default AcidezPage;
