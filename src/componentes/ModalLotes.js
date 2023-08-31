import React from "react";
import "./Modal.css"

const ModalLotes = ({ info, id }) => {
  
  return (
    <div
      class="modal fade"
      id={"exampleModal"+id}
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id={"exampleModalLabel"+id}>
              Análisis de Lotes
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
                        
                        <th scope="col">N° Registro SAG</th>
                        <th scope="col">Especie</th>
                        <th scope="col">Plaga</th>
                        <th scope="col">Huevos Vivos</th>
                        <th scope="col">Huevos Muertos</th>
                        <th scope="col">Ninfas Vivas</th>
                        <th scope="col">Ninfas Muertas</th>
                        <th scope="col">Adultos Vivos</th>
                        <th scope="col">Adultos Muertos</th>
                        
                      </tr>
                    </thead>
                    <tbody>
                  
                   {info.ListaAnalisisIdentificacionLote.sort((a,b)=> a.NumRegistroSag-b.NumRegistroSag).map(mapeo=>{
                         
                   
                        return(
                            <tr>
                            
                            <td>{mapeo.NumRegistroSag}</td>
                            <td>{mapeo.Especie}</td>
                            <td>{mapeo.Plaga}</td>
                            <td>{mapeo.HuevosVivos}</td>
                            <td>{mapeo.HuevosMuertos}</td>
                            <td>{mapeo.NinfasVivos}</td>
                            <td>{mapeo.NinfasMuertos}</td>
                            <td>{mapeo.AdultosVivos}</td>
                            <td>{mapeo.AdultosMuertos}</td>  
                        
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

export default ModalLotes;
