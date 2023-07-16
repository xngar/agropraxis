import React from "react";
import "./Modal.css"
import {IoNewspaperOutline} from "react-icons/io5"

const ModalAcidez = ({ info, id }) => {
  
  return (
    <div
    className="modal fade"
      id={"exampleModalAcidez"+id}
      tabindex="-1"
      aria-labelledby="exampleModalLabelAcidez"
      aria-hidden="true"
      
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id={"exampleModalLabel"+id}>
             <IoNewspaperOutline/> Resultados Acidez
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
                        <th scope="col">Estado</th>
                        <th scope="col">Observaciones</th>
                      </tr>
                    </thead>
                    <tbody>
                  
                   {info.ListaResultados.map(mapeo=>{
                     // creo una variable para guardar la suma de los pesos de los frutos
                         var sumaPesoFruto = 0.0;
                      mapeo.PesosFrutos.forEach(element => {
                       // sumo los pesos de los frutos
                         sumaPesoFruto += element.Peso;
                      });
                       // meto el peso del jugo que viene desde el servicio en una variable para realizar el cálculo
                       let pesoJugo = mapeo.JugoPeso;
                       // saco el calculo del porcentaje
                      var porcentajeJugo = (pesoJugo / sumaPesoFruto) * 100;
                      //seteamo el JugoPeso por el porcentaje
                      mapeo.JugoPeso = porcentajeJugo;

                        return(
                            <tr>
                            
                            <td key={mapeo.Id}>{mapeo.NumAPG}</td>
                            <td>{mapeo.Cuartel}</td>
                            <td>{mapeo.NumFrutos}</td>
                            <td>{mapeo.PesoPromedio}</td>
                            <td>{mapeo.JugoPeso.toFixed(2)}</td>
                            <td>{mapeo.SolidosSolubles}</td>
                            <td>{mapeo.Acidez}</td>
                            <td>{mapeo.Relacion}</td>
                            <td>{mapeo.Acidez > 0.8 && mapeo.Acidez < 1.0 ? <span style={{color: "#ff0000"}}>Cumple Bajo</span>: mapeo.Acidez > 1.0 && mapeo.Acidez < 1.4 ? <span style={{color: "#009500"}}>Cumple óptimo</span>: mapeo.Acidez > 1.4 && mapeo.Acidez < 1.6? <span style={{color: "#001eff"}}>Cumple Alto</span> :mapeo.Acidez < 0.8 ?<span style={{color: "#ff0000"}}>No cumple por baja acidez</span> :mapeo.Acidez > 1.6 ? <span style={{color: "#ff0000"}}>No cumple por alta acidez</span>:"" }</td>
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
