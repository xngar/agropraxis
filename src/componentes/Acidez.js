import React from 'react'

import {format} from "date-fns"
import "./Acidez.css"
import { GiDungeonGate } from 'react-icons/gi'

const Acidez = ({nuevo}) => {
  return (
    <div>
        <div className='acidez-titulo'>
        
        <h5>Acidez de Fruta</h5>
        </div>
        <div className='table-responsive'>
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
              {nuevo.map((acceso) => {
                let fechaIngreso = format(new Date(acceso.FechaIngreso),"dd-MM-yyyy");
                let fechaMuestreo =  format(new Date(acceso.FechaMuestreo),"dd-MM-yyyy");
                let fechaAnalisis = format(new Date(acceso.FechaAnalisis),"dd-MM-yyyy");
                let fechaInforme = format(new Date(acceso.FechaInforme),"dd-MM-yyyy");
                
                return (
                  <>
                    <tr>
                      <td key={acceso.Id} scope="row">
                        1
                      </td>
                      <td className="lcase">{acceso.Cliente}</td>
                      <td className="lcase">
                        {acceso.Productor
                          ? acceso.Productor
                          : "Sin información"}
                      </td>
                      <td >{acceso.Predio}</td>
                      <td>{acceso.Localidad}</td>
                      <td>{fechaMuestreo}</td>
                      <td>{fechaIngreso}</td>
                      <td>{fechaAnalisis}</td>
                      <td>{fechaInforme}</td>
                      <td>{acceso.Especie}</td>
                      <td>{acceso.Variedad}</td>
                      <td>{acceso.Muestreador}</td>
                      <td>{acceso.Observaciones}</td>
                      <td>{acceso.InformeAdjunto?<a target='_blank' href={process.env.REACT_APP_PATH +acceso.InformeAdjunto}> Descargar Informe</a>:<p style={{color:"red"}}>En Proceso</p>}</td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
 
          </div>
    </div>

    )
}

export default Acidez;

