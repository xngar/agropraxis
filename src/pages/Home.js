import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
import "./Home.css"
const Home = () => {
  const { state } = useLocation();
  const [nuevo, setDatos] = useState([]);

  let info = [{}];

  const getAcidez = async () => {
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

  useEffect(() => {
    getAcidez();
  }, []);

  return (
    <>
      {state?.logged ? <h1>Datos</h1> : <Navigate to="/" />}
      <div></div>

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
          </tr>
        </thead>
        
        
        <tbody className="table-group-divider">
          {nuevo.map((acceso) => {
            return (
              <>
                <tr>
                  <td key="{acceso.Id}" scope="row">
                    1
                  </td>
                  <td className="lcase">{acceso.Cliente}</td>
                  <td className="lcase">{acceso.Productor?acceso.Productor:"Sin información"}</td>
                  <td className="lcase">{acceso.Carosos}</td>
                  <td>{acceso.TipoAnalisis}</td>
                  <td>{acceso.Variedad}</td>
                  <td>{acceso.Especie}</td>
                  <td>{acceso.Fecha}</td>
                  <td>{acceso.FechaEmision}</td>
                  <td>{acceso.Analista}</td>
                  <td>{acceso.Predio}</td>
                  
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Home;
