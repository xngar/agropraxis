import React from "react";
import "./Modal.css"

const ModalAcidez = ({ info }) => {
   
  return (
    <div
    className="modal fade"
      id="exampleModalAcidez"
      tabindex="-1"
      aria-labelledby="exampleModalLabelAcidez"
      aria-hidden="true"
      
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Resultados Acidez
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            
                <div>
                  <table className="table table-responsive">
                    <thead>
                      <tr>
                        
                        <th scope="col">N° Laboratorio</th>
                        <th scope="col">Cuartel</th>
                        <th scope="col">Nº Frutos</th>
                        <th scope="col">Peso Promedio</th>
                        <th scope="col">Jugo (%)</th>
                        <th scope="col">Sólidos Solubles (%)</th>
                        <th scope="col">Acidez (%)</th>
                        <th scope="col">Relacion SS/Acidez (%)</th>
                        <th scope="col">Observaciones</th>
                      </tr>
                    </thead>
                    <tbody>
                  
                   {info.ListaResultados.map(mapeo=>{
                         
                   
                        return(
                            <tr>
                            
                            <td key={mapeo.Id}>{mapeo.NumAPG}</td>
                            <td>{mapeo.Cuartel}</td>
                            <td>{mapeo.NumFrutos}</td>
                            <td>{mapeo.PesoPromedio}</td>
                            <td>{mapeo.JugoPeso}</td>
                            <td>{mapeo.SolidosSolubles}</td>
                            <td>{mapeo.Acidez}</td>
                            <td>{mapeo.Relacion}</td>
                            <td>{mapeo.Observaciones?mapeo.Observaciones:<span style={{color:"red"}}></span>}</td>
                            
                          </tr>

                        )
                    
                   })}
                       
                     
                   
                    </tbody>
                  </table>
                </div>
             
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cerrar
            </button>
         
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAcidez;
