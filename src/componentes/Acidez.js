import React from 'react'
import "./Acidez.css"

const Acidez = ({nuevo}) => {
  return (
    <div>
        <div className='acidez-titulo'>
        <img src="img-acidez.png" width="50" />
        <h3>Acidez de Fruta</h3>
        </div>
        
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
                <th scope="col">Ingresador</th>
                <th scope="col">Observaciones</th>
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
                      <td className="lcase">
                        {acceso.Productor
                          ? acceso.Productor
                          : "Sin información"}
                      </td>
                      <td >{acceso.Predio}</td>
                      <td>{acceso.Localidad}</td>
                      <td>{acceso.FechaMuestreo}</td>
                      <td>{acceso.FechaIngreso}</td>
                      <td>{acceso.FechaAnalisis}</td>
                      <td>{acceso.FechaInforme}</td>
                      <td>{acceso.Especie}</td>
                      <td>{acceso.Variedad}</td>
                      <td>{acceso.Muestreador}</td>
                      <td>{acceso.IngresadoPor}</td>
                      <td>{acceso.Observaciones}</td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>


    </div>

    )
}

export default Acidez;

