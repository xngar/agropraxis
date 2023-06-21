import React, { Fragment } from "react";
import "./Monitoreo.css";
import { format, isValid, parseISO } from "date-fns";
import { TbReport } from "react-icons/tb";
import { AiOutlineEye } from "react-icons/ai";


const Recepciones = ({ nuevo }) => {

  const servicio = nuevo[nuevo.length - 1];
     
  return (
    <div>
      <div className="monitoreo-titulo">
        <h5>Recepciones</h5>
      </div>
      <div className="table-responsive">
        <table className="table container">
          <thead>
            <tr>
              <th scope="col">Fecha de Recepción</th>
              <th scope="col">Fecha de Muestreo</th>
              <th scope="col">Productor</th>
              <th scope="col">Cliente</th>
              <th scope="col">Predio</th>
              <th scope="col">Comuna</th>
              <th scope="col">Región</th>
              <th scope="col">Traido Por</th>
              <th scope="col">Tipo de Analisis</th>
              
            </tr>
          </thead>

          <tbody className="table-group-divider">
         {servicio && (
                 
    <tr className="hover-tabla">
              <td style={{ textTransform: 'uppercase' }}>{format(parseISO(servicio.FechaRecepcion), "dd/MM/yyyy")}</td>
              <td style={{ textTransform: 'uppercase' }}>{format(parseISO(servicio.FechaMuestreo), "dd/MM/yyyy")}</td>
              <td className="lcase" style={{ textTransform: 'uppercase' }}>
                {servicio.Productor ? servicio.Productor : "Sin información"}
              </td>
              <td className="lcase" style={{ textTransform: 'uppercase' }}>
                {servicio.Cliente ? servicio.Cliente : "Sin información"}
              </td>
              <td className="lcase" style={{ textTransform: 'uppercase' }}>
                {servicio.Predio ? servicio.Predio : "Sin información"}
              </td>
              <td className="lcase" style={{ textTransform: 'uppercase' }}>
                {servicio.Comuna ? servicio.Comuna : "Sin información"}
              </td>
              <td className="lcase" style={{ textTransform: 'uppercase' }}>
                {servicio.Region ? servicio.Region : "Sin información"}
              </td>
              <td className="lcase" style={{ textTransform: 'uppercase' }}>
                {servicio.TraidoPor ? servicio.TraidoPor : "Sin información"}
              </td>
              <td className="lcase" style={{ textTransform: 'uppercase' }}>
                {servicio.TipoAnalisis ? servicio.TipoAnalisis : "Sin información"}
              </td>
              
    </tr>
  )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Recepciones;
