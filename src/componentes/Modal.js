import React from "react";
import "./Modal.css"

const Modal = ({ info }) => {
    console.log(info.AnalisisMonitoreo[0].Plagas);
  return (
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              Análisis Monitoreo
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            
                <div>
                  <table class="table table-responsive">
                    <thead>
                      <tr>
                        
                        <th scope="col">N° Laboratorio</th>
                        <th scope="col">Plagas</th>
                        <th scope="col">Huevos Vivos</th>
                        <th scope="col">Huevos Muertos</th>
                        <th scope="col">Ninfas Vivas</th>
                        <th scope="col">Ninfas Muertas</th>
                        <th scope="col">Adultos Vivos</th>
                        <th scope="col">Adultos Muertos</th>
                        <th scope="col">Item</th>
                        <th scope="col">Observaciones</th>
                      </tr>
                    </thead>
                    <tbody>
                  
                   {info.AnalisisMonitoreo.sort((a,b) => a.NumeroLaboratorio > b.NumeroLaboratorio ? 1 : -1).map(mapeo=>{

                   
                        return(
                            <tr>
                            
                            <td>{mapeo.NumeroLaboratorio}</td>
                            <td>{mapeo.Plagas}</td>
                            <td>{mapeo.HuevosVivos}</td>
                            <td>{mapeo.HuevosMuertos}</td>
                            <td>{mapeo.NinfasVivos}</td>
                            <td>{mapeo.NinfasMuertos}</td>
                            <td>{mapeo.AdultosVivos}</td>
                            <td>{mapeo.AdultosMuertos}</td>
                            <td>{mapeo.Item}</td>
                            <td>{mapeo.Observaciones?mapeo.Observaciones:<span style={{color:"red"}}>sin información</span>}</td>
                            
                          </tr>

                        )
                    
                   })}
                       
                     
                   
                    </tbody>
                  </table>
                </div>
             
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
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

export default Modal;
