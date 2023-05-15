import React, { Fragment } from "react";
import "./Monitoreo.css";
import { format, isValid, parseISO } from "date-fns";
import { TbReport } from "react-icons/tb";
import {AiOutlineEye} from "react-icons/ai"
import Modal from "../componentes/Modal";

const Monitoreos = ({ nuevo }) => {
  return (
    <div>
      <div className="monitoreo-titulo">
      
        <h5>Monitoreos</h5>
      </div>
      <div className="table-responsive">
        <table className="table container">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Cliente</th>
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
              let fecha = "";
              let fechaEmision = "";
              if (acceso.Fecha && isValid(parseISO(acceso.Fecha))) {
                fecha = format(parseISO(acceso.Fecha), "dd/MM/yyyy");
              }
              if (
                acceso.FechaEmision &&
                isValid(parseISO(acceso.FechaEmision))
              ) {
                fechaEmision = format(
                  parseISO(acceso.FechaEmision),
                  "dd/MM/yyyy"
                );
              }

              return (
                <>
                <Modal info={acceso} />
                  <tr className="hover-tabla">
                    <td scope="row" key={acceso.Id}>
                    {acceso.Id}
                    </td>
                    <td className="lcase" style={{ textTransform: 'uppercase'}}>{acceso.Cliente}</td>
                    <td className="lcase" style={{ textTransform: 'uppercase'}}>
                      {acceso.Productor.toUpperCase() ? acceso.Productor.toUpperCase() : "Sin información"}
                    </td>
                    <td className="lcase" style={{ textTransform: 'uppercase'}}>{acceso.Carosos}</td>
                    <td style={{ textTransform: 'uppercase'}}>{acceso.TipoAnalisis}</td>                    
                    <td style={{ textTransform: 'uppercase'}}>{acceso.Especie}</td>
                    <td style={{ textTransform: 'uppercase'}}>{fecha}</td>
                    <td style={{ textTransform: 'uppercase'}}>{fechaEmision}</td>
                    <td style={{ textTransform: 'uppercase'}}>{acceso.Analista}</td>
                    <td style={{ textTransform: 'uppercase'}}>{acceso.Predio}</td>
                    <td style={{ textTransform: 'uppercase'}}><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
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
                                      <p style={{ color: "white", background:"green",borderRadius:"20px", padding:"3px", fontSize:"12px", textAlign:"center", textDecoration:"uppercase" }}>DESCARGAR</p>
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
  );
};

export default Monitoreos;
