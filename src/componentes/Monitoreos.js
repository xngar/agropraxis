import React from "react";
import "./Monitoreo.css";
import { format, isValid, parseISO } from "date-fns";
import { TbReport } from "react-icons/tb";

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
              <th scope="col">Variedad</th>
              <th scope="col">Especie</th>
              <th scope="col">Fecha</th>
              <th scope="col">Fecha Emisión</th>
              <th scope="col">Analista</th>
              <th scope="col">Predio</th>
              <th scope="col">
                            Informe Adjunto
                          </th>
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
                  <tr className="hover-tabla">
                    <td key={acceso.Id} scope="row">
                      1
                    </td>
                    <td className="lcase">{acceso.Cliente}</td>
                    <td className="lcase">
                      {acceso.Productor ? acceso.Productor : "Sin información"}
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
