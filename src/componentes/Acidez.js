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
                <th scope="col">Nº Informe</th>
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
                <th scope="col">Informe</th>
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
                    <tr key={acceso.Id}>
                      <td scope="row">
                      {acceso.Id}
                      </td>
                      <td className="lcase" style={{ textTransform: 'uppercase'}}>{acceso.Cliente}</td>
                      <td className="lcase" style={{ textTransform: 'uppercase'}}>
                        {acceso.Productor
                          ? acceso.Productor
                          : "Sin información"}
                      </td>
                      <td style={{ textTransform: 'uppercase'}}>{acceso.Predio}</td>
                      <td style={{ textTransform: 'uppercase'}}>{acceso.Localidad}</td>
                      <td style={{ textTransform: 'uppercase'}}>{fechaMuestreo}</td>
                      <td style={{ textTransform: 'uppercase'}}>{fechaIngreso}</td>
                      <td style={{ textTransform: 'uppercase'}}>{fechaAnalisis}</td>
                      <td style={{ textTransform: 'uppercase'}}>{fechaInforme}</td>
                      <td style={{ textTransform: 'uppercase'}}>{acceso.Especie}</td>
                      <td style={{ textTransform: 'uppercase'}}>{acceso.Variedad}</td>
                      <td style={{ textTransform: 'uppercase'}}>{acceso.Muestreador}</td>
                      <td style={{ textTransform: 'uppercase'}}>{acceso.Observaciones}</td>
                      <td style={{ textTransform: 'uppercase'}}>{acceso.InformeAdjunto?<a target='_blank' href={process.env.REACT_APP_PATH +acceso.InformeAdjunto}> Descargar Informe</a>:<p style={{color:"red"}}>En Proceso</p>}</td>
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

