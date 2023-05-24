import React from "react";
import "./Modal.css"

const ModalMonitoreoPage = ({ info, id }) => {

  return (
    <div
      class="modal fade"
      id={"exampleModal"+id}
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id={"exampleModalLabel"+id}>
              Análisis Monitoreo
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
                  
                   {info?.map(mapeo=>{
                         
                   
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
                            <td>{mapeo.Item?.trim()}</td>  
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

export default ModalMonitoreoPage;
