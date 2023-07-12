import React from "react";
import "./Modal.css"

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
              Resultados Imágenes
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
                    <th scope="col">Evidencia</th>
                  </tr>
                </thead>
                <tbody>


                  {evidencia && evidencia.map((mapeo,index) => {


                    return (
                      <tr>

                        {/* <td key={mapeo.Id}>{mapeo.NumAPG}</td>
                            <td>{mapeo.Cuartel}</td>
                            <td>{mapeo.NumFrutos}</td>
                            <td>{mapeo.PesoPromedio}</td>
                            <td>{mapeo.JugoPeso}</td>
                            <td>{mapeo.SolidosSolubles}</td>
                            <td>{mapeo.Acidez}</td>
                            <td>{mapeo.Relacion}</td>
                            <td>{mapeo.Acidez > 0.8 && mapeo.Acidez < 1.0 ? <span style={{color: "#ff0000"}}>Cumple Bajo</span>: mapeo.Acidez > 1.0 && mapeo.Acidez < 1.4 ? <span style={{color: "#009500"}}>Cumple óptimo</span>: mapeo.Acidez > 1.4 && mapeo.Acidez < 1.6? <span style={{color: "#001eff"}}>Cumple Alto</span> :mapeo.Acidez < 0.8 ?<span style={{color: "#ff0000"}}>No cumple por baja acidez</span> :mapeo.Acidez > 1.6 ? <span style={{color: "#ff0000"}}>No cumple por alta acidez</span>:"" }</td>
                            <td>{mapeo.Observaciones?mapeo.Observaciones:<span style={{color:"red"}}></span>}</td> */}
                        <img src={mapeo.Filename} width={100} height={100} />
                        <tr key={index}>
                          <td colSpan="10">
                            <img src={mapeo.Filename} alt={mapeo.OriginalName} />
                          </td>
                        </tr>

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

export default ModalImagenes;
