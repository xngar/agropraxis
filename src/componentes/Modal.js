import React from "react";

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
              Modal title
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
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Número Laboratio</th>
                        <th scope="col">Plagas</th>
                      </tr>
                    </thead>
                    <tbody>
                  
                   {info.AnalisisMonitoreo.map(mapeo=>{

                   
                        return(
                            <tr>
                            <th scope="row"></th>
                            <td>{mapeo.NumeroLaboratorio}</td>
                            <td>{mapeo.Plagas}</td>
                            
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
              Close
            </button>
            <button type="button" class="btn btn-primary">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
