import React from 'react'

import { format, isValid, parseISO } from "date-fns";
import "./Acidez.css"
import { GiDungeonGate } from 'react-icons/gi'
import ModalAcidez from './ModalAcidez';
import { AiOutlineEye } from "react-icons/ai";

const Acidez = ({nuevo}) => {

  const servicio = nuevo[nuevo.length - 1];
  return (
    <div>
      <div className="monitoreo-titulo">
        <h5>Acidez Fruta</h5>
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
         {servicio && (
                 
    <tr className="hover-tabla">
              <td scope="row">{servicio.NumApg}</td>
              <td className="lcase" style={{ textTransform: 'uppercase' }}>
                {servicio.Productor.toUpperCase() ? servicio.Productor.toUpperCase() : "Sin información"}
              </td>
              <td className="lcase" style={{ textTransform: 'uppercase' }}>{servicio.Predio}</td>
              <td style={{ textTransform: 'uppercase' }}>{servicio.Localidad}</td>
              <td style={{ textTransform: 'uppercase' }}>{format(parseISO(servicio.FechaMuestreo), "dd/MM/yyyy")}</td>
              <td style={{ textTransform: 'uppercase' }}>{format(parseISO(servicio.FechaIngreso), "dd/MM/yyyy")}</td>
              <td style={{ textTransform: 'uppercase' }}>{format(parseISO(servicio.FechaAnalisis), "dd/MM/yyyy")}</td>
              <td style={{ textTransform: 'uppercase' }}>{format(parseISO(servicio.FechaInforme), "dd/MM/yyyy")}</td>
              <td style={{ textTransform: 'uppercase' }}>{servicio.Especie}</td>
              <td style={{ textTransform: 'uppercase' }}>{servicio.Muestreador}</td>
              <td style={{ textTransform: 'uppercase' }}>{servicio.Observaciones}</td>
              
              <td style={{ textTransform: 'uppercase' }}>
                {servicio.InformeAdjunto ? (
                  <a
                    target="_blank"
                    href={process.env.REACT_APP_API_PATH + servicio.InformeAdjunto}
                  >
                    <p style={{ color: "white", background: "green", borderRadius: "20px", padding: "8px", fontSize: "14px", textAlign: "center", textTransform: "capitalize", letterSpacing: 1 }}>Descargar</p>
                  </a>
                ) : (
                  <p style={{ color: "white", background: "red", borderRadius: "20px", padding: "3px", fontSize: "12px", textAlign: "center" }}>En Proceso</p>
                )}
              </td>
              <td style={{ textTransform: 'uppercase' }}>
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={"#exampleModalAcidez"+ servicio.Id}>
                  <AiOutlineEye style={{ fontSize: 24 }} />
                </button>
              </td>
      {/* Resto de las columnas */}
      <ModalAcidez info={servicio} id={servicio.Id} /> 
    </tr>
  )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Acidez;

