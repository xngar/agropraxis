import React, { Fragment } from "react";
import "./Monitoreo.css";
import { format, isValid, parseISO } from "date-fns";
import { TbReport } from "react-icons/tb";
import { AiOutlineEye } from "react-icons/ai";
import Modal from "../componentes/Modal";

const Monitoreos = ({ nuevo }) => {

  const servicio = nuevo[nuevo.length - 1];
     
  return (
    <div>
      <div className="monitoreo-titulo">
        <h5>Monitoreos</h5>
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
         {servicio && (
                 
    <tr className="hover-tabla">
              <td scope="row">{servicio.NumAPG}</td>
              <td className="lcase" style={{ textTransform: 'uppercase' }}>
                {servicio.Productor.toUpperCase() ? servicio.Productor.toUpperCase() : "Sin información"}
              </td>
              <td className="lcase" style={{ textTransform: 'uppercase' }}>{servicio.Carosos}</td>
              <td style={{ textTransform: 'uppercase' }}>{servicio.TipoAnalisis}</td>
              <td style={{ textTransform: 'uppercase' }}>{servicio.Especie}</td>
              <td style={{ textTransform: 'uppercase' }}>{format(parseISO(servicio.Fecha), "dd/MM/yyyy")}</td>
              <td style={{ textTransform: 'uppercase' }}>{format(parseISO(servicio.FechaEmision), "dd/MM/yyyy")}</td>
              <td style={{ textTransform: 'uppercase' }}>{servicio.Analista}</td>
              <td style={{ textTransform: 'uppercase' }}>{servicio.Predio}</td>
              <td style={{ textTransform: 'uppercase' }}>
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={"#exampleModal"+servicio.Id}>
                  <AiOutlineEye style={{ fontSize: 24 }} />
                </button>
              </td>
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
      
      <Modal info={servicio} id={servicio.Id} /> 
    </tr>
  )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Monitoreos;
