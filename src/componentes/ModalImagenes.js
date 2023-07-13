import React from "react";
import "./Modal.css"
import {BsImages} from "react-icons/bs"

const ModalImagenes = ({ info, id }) => {

  let evidencia = info.Evidencia ? JSON.parse(info.Evidencia) : [];

  console.log(evidencia.map(dato => dato.Filename));

  return (
    <div
      className="modal fade"
      id={"exampleModalImagenes" + id}
      tabindex="-1"
      aria-labelledby="exampleModalLabelAcidez"
      aria-hidden="true"

    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id={"exampleModalLabel" + id}>
             <BsImages/> Evidencias
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
              
            <div className="contenedor-imagenes">

                  {evidencia && evidencia.map((mapeo, index) => {


                    return (

                      
                        <div className="contenedor-imagen">
                          <img src={"https://agropraxisgroup.cl/upload/" + mapeo.Filename} alt={mapeo.OriginalName}  />
                        </div>
                     
                     
                    )


                  })}

                  {
                    evidencia ==false? "No hay imágenes disponibles":"" 
                  }


               </div>
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

export default ModalImagenes;
