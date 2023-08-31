import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Navigate, Redirect } from "react-router-dom";
import "./Home.css";
import "./MonitoreoPage.css"
import NavBar from "../componentes/NavBar";
import { AiOutlineEye } from "react-icons/ai"
import ModalLotes from "../componentes/ModalLotes";
import { getCliente, getMonitoreo, getLotes } from "../utilidades/Servicios";


const LotesPage = () => {
  const [nuevo, setDatos] = useState([]);
  const [acidez, setAcidez] = useState([]);
  const estado = useLocation().state;
  const [busqueda, setBusqueda] = useState("");
  const [auth, setAuth] = useState(false);
  const [cliente, setCliente] = useState([]);
  const [filtradoPais, setFiltradoPais] = useState("");

  const { state } = useLocation();
  const statuto = localStorage.status;
  const t = localStorage.getItem("token");
  const [newBusqueda, setNewBusqueda] = useState([]);

  let info = [{}];

  // nuevo.filter(filtrado => filtrado.PaisDestino === filtradoPais);

  const getMonitoreos = async () => {
    const respuesta = await getLotes(t);
    setDatos(respuesta.Entities);
    console.log(nuevo);
  };

  const getClientes = async () => {
    const respuesta = await getCliente(t);
    setCliente(respuesta);
  };

  const fnBusqueda = (e) => {
    setBusqueda(e.target.value);

  }
  const [startDate, setStartDate] = useState(new Date());
  const [fechSel, setFechaSel] = useState("");

  // startDate.split('-').reverse().join('-')

  let fechaFormateado = "";
  let nuevoFechaFormateado = "";
  function diaSeleccionado(date) {
    fechaFormateado = obtenerFechaFormateada(date)

    setStartDate(date);
    // nuevoFechaFormateado= fechaFormateado.split('-').reverse().join('-');
    // setFechaSel(fechaFormateado.split('-').reverse().join('-'));
    setBusqueda(fechaFormateado.split('-').reverse().join('-'));
    setMostrarCalendario(false);

  }


  const [mostrarCalendario, setMostrarCalendario] = useState(false);


  const obtenerFechaFormateada = (date) => {
    const dia = format(date, "dd");
    const mes = format(date, "MM");
    const año = format(date, "yyyy");
    return `${dia}-${mes}-${año}`;
  };


  function Elegido(e){
    console.log(e.target.value);
    setFiltradoPais(e.target.value);
  }



  useEffect(() => {
    if (statuto) {
      setAuth(true);
    }

    getMonitoreos();

    getClientes();
  }, []);

  return (
    <>
      {statuto ? (
        <div className="contenedor">
          
          <div className="izquierda">
            <NavBar cliente={cliente} />
          </div>
          <div className="derecha">
            <div className="derecha-contenedor">

              <div className="cont-datos">
                <div>
                  <div className="monitoreo-titulo">

                    <h3>Lotes</h3>
                    <div>
            <select class="form-select" aria-label="Default select example" onChange={e=>Elegido(e)}>
              <option selected>Seleccione el país</option>
              <option value="BRASIL">Brasil</option>
              <option value="PERU">Perú</option>
              <option value="MEXICO">Mexico</option>
            </select>
          </div>
                    {/* <div className="contenedor-busqueda">
                      <div className="contenedor-input">
                        <input type="text" className="form-control" placeholder="Ingrese su busqueda por Productor,Localidad o Fecha" value={busqueda} onChange={fnBusqueda} />
                      </div>
                      <br></br>

                    </div> */}
                  </div>
                  <div className="table-responsive">
                    <table className="table container">
                      {
                        filtradoPais ==="MEXICO"?
                        <thead>
                        <tr>
                          <th scope="col">Productor</th>
                          <th scope="col">Especie</th>
                          <th scope="col">Variedad</th>
                          <th scope="col">Num Solicitud Inspección</th>
                          <th scope="col">Cant Envases</th>
                          <th scope="col">Kilos Muestra Analizados</th>
                          <th scope="col">Oficina Sectorial</th>
                          <th scope="col">Programa</th>
                          <th scope="col">Laboratorio</th>
                          <th scope="col">Num Lotes</th>
                          <th scope="col">País Destino</th>
                          <th scope="col">Observaciones</th>
                          
                          <th scope="col">Lista Análisis</th>
                          <th scope="col">Informe</th>
                        </tr>
                      </thead>:
                       filtradoPais ==="PERU" ?
                       <thead>
                        <tr>
                          <th scope="col">Productor</th>
                          <th scope="col">Especie</th>
                          <th scope="col">Variedad</th>
                          <th scope="col">Num Solicitud Inspección</th>
                          <th scope="col">Cant Envases</th>
                          <th scope="col">Kilos Muestra Analizados</th>
                          <th scope="col">Oficina Sectorial</th>
                          <th scope="col">Programa</th>
                          <th scope="col">Laboratorio</th>
                          <th scope="col">Num Lotes</th>
                          <th scope="col">País Destino</th>
                          
                          <th scope="col">Observaciones</th>
                          <th scope="col">Informe</th>
                          
                        </tr>
                      </thead>: 
                      filtradoPais ==="BRASIL" ?
                      <thead>
                       <tr>
                         <th scope="col">Productor</th>
                         <th scope="col">Especie</th>
                         <th scope="col">Variedad</th>
                         <th scope="col">Num Solicitud Inspección</th>
                         <th scope="col">Cant Envases</th>
                         <th scope="col">Kilos Muestra Analizados</th>
                         <th scope="col">Oficina Sectorial</th>
                         <th scope="col">Programa</th>
                         <th scope="col">Laboratorio</th>
                         <th scope="col">Num Lotes</th>
                         <th scope="col">País Destino</th>
                         <th scope="col">Observaciones</th>
                         <th scope="col">Informe</th>
                         
                       </tr>
                     </thead>:""
                      }
                      

                      <tbody className="table-group-divider">
                        {nuevo.filter(filtrado => filtrado.PaisDestino === filtradoPais).map((acceso) => {

                          return (<>
                            <ModalLotes info={acceso} id={acceso.Id} />
                            {
                              filtradoPais === "MEXICO"?
                              <tr className="hover-tabla" key={acceso.Id}>
                              <td scope="row">{acceso.Cliente}</td>
                              <td className="lcase" style={{ textTransform: 'uppercase' }}>{acceso.Especie}</td>
                              <td style={{ textTransform: 'uppercase' }}>{acceso.Variedad}</td>
                              <td style={{ textTransform: 'uppercase' }}>{acceso.NumSolicitudInspeccion}</td>
                              <td style={{ textTransform: 'uppercase' }}>{acceso.CantEnvases}</td>
                              <td style={{ textTransform: 'uppercase' }}>{acceso.KilosMuestraAnalizado}</td>
                              <td style={{ textTransform: 'uppercase' }}>{acceso.OficinaSectorial}</td>
                              <td style={{ textTransform: 'uppercase' }}>{acceso.Programa}</td>
                              <td style={{ textTransform: 'uppercase' }}>{acceso.Laboratorio}</td>
                              <td style={{ textTransform: 'uppercase' }}>{acceso.NumLote}</td>
                              <td style={{ textTransform: 'uppercase' }}>{acceso.PaisDestino}</td>
                              <td style={{ textTransform: 'uppercase' }}>{acceso.Observaciones}</td>
                              <td style={{ textTransform: 'uppercase' }}>
                                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target={"#exampleModal" + acceso.Id}>
                                  <AiOutlineEye style={{ fontSize: 24 }} />
                                </button>
                              </td>
                              <td style={{ textTransform: 'uppercase'}}>
                                  {acceso.InformePDF ? (
                                    <a
                                      target="_blank"
                                      href={
                                        process.env.REACT_APP_API_PATH +
                                        acceso.InformeAdjunto
                                      }
                                    >
                                      {" "}
                                      <p style={{ color: "white", background:"green",borderRadius:"20px", padding:"8px", fontSize:"14px", textAlign:"center", textTransform:"capitalize", letterSpacing:1 }}>Descargar</p>
                                    </a>
                                  ) : (
                                    <p style={{ color: "white", background:"red",borderRadius:"20px", padding:"3px", fontSize:"12px", textAlign:"center" }}>En Proceso</p>
                                  )}
                                </td>
                              
                            </tr>: filtradoPais ==="PERU"?
                            <tr className="hover-tabla" key={acceso.Id}>
                            <td scope="row">{acceso.Cliente}</td>
                            <td className="lcase" style={{ textTransform: 'uppercase' }}>{acceso.Especie}</td>
                            <td style={{ textTransform: 'uppercase' }}>{acceso.Variedad}</td>
                            <td style={{ textTransform: 'uppercase' }}>{acceso.NumSolicitudInspeccion}</td>
                            <td style={{ textTransform: 'uppercase' }}>{acceso.CantEnvases}</td>
                            <td style={{ textTransform: 'uppercase' }}>{acceso.KilosMuestraAnalizado}</td>
                            <td style={{ textTransform: 'uppercase' }}>{acceso.OficinaSectorial}</td>
                            <td style={{ textTransform: 'uppercase' }}>{acceso.Programa}</td>
                            <td style={{ textTransform: 'uppercase' }}>{acceso.Laboratorio}</td>
                            <td style={{ textTransform: 'uppercase' }}>{acceso.NumLote}</td>
                            <td style={{ textTransform: 'uppercase' }}>{acceso.PaisDestino}</td>
                            <td style={{ textTransform: 'uppercase' }}>{acceso.Observaciones}</td>
                            <td style={{ textTransform: 'uppercase'}}>
                                  {acceso.InformePDF ? (
                                    <a
                                      target="_blank"
                                      href={
                                        process.env.REACT_APP_API_PATH +
                                        acceso.InformeAdjunto
                                      }
                                    >
                                      {" "}
                                      <p style={{ color: "white", background:"green",borderRadius:"20px", padding:"8px", fontSize:"14px", textAlign:"center", textTransform:"capitalize", letterSpacing:1 }}>Descargar</p>
                                    </a>
                                  ) : (
                                    <p style={{ color: "white", background:"red",borderRadius:"20px", padding:"3px", fontSize:"12px", textAlign:"center" }}>En Proceso</p>
                                  )}
                                </td>
                            {/* <td style={{ textTransform: 'uppercase' }}>
                              <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target={"#exampleModal" + acceso.Id}>
                                <AiOutlineEye style={{ fontSize: 24 }} />
                              </button>
                            </td> */}
                            
                          </tr>
                            :filtradoPais ==="BRASIL"?
                            <tr className="hover-tabla" key={acceso.Id}>
                              <td scope="row">{acceso.Cliente}</td>
                              <td className="lcase" style={{ textTransform: 'uppercase' }}>{acceso.Especie}</td>
                              <td style={{ textTransform: 'uppercase' }}>{acceso.Variedad}</td>
                              <td style={{ textTransform: 'uppercase' }}>{acceso.NumSolicitudInspeccion}</td>
                              <td style={{ textTransform: 'uppercase' }}>{acceso.CantEnvases}</td>
                              <td style={{ textTransform: 'uppercase' }}>{acceso.KilosMuestraAnalizado}</td>
                              <td style={{ textTransform: 'uppercase' }}>{acceso.OficinaSectorial}</td>
                              <td style={{ textTransform: 'uppercase' }}>{acceso.Programa}</td>
                              <td style={{ textTransform: 'uppercase' }}>{acceso.Laboratorio}</td>
                              <td style={{ textTransform: 'uppercase' }}>{acceso.NumLote}</td>
                              <td style={{ textTransform: 'uppercase' }}>{acceso.PaisDestino}</td>
                              <td style={{ textTransform: 'uppercase' }}>{acceso.Observaciones}</td>
                              <td style={{ textTransform: 'uppercase'}}>
                                  {acceso.InformePDF ? (
                                    <a
                                      target="_blank"
                                      href={
                                        process.env.REACT_APP_API_PATH +
                                        acceso.InformeAdjunto
                                      }
                                    >
                                      {" "}
                                      <p style={{ color: "white", background:"green",borderRadius:"20px", padding:"8px", fontSize:"14px", textAlign:"center", textTransform:"capitalize", letterSpacing:1 }}>Descargar</p>
                                    </a>
                                  ) : (
                                    <p style={{ color: "white", background:"red",borderRadius:"20px", padding:"3px", fontSize:"12px", textAlign:"center" }}>En Proceso</p>
                                  )}
                                </td>
                              {/* <td style={{ textTransform: 'uppercase' }}>
                                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target={"#exampleModal" + acceso.Id}>
                                  <AiOutlineEye style={{ fontSize: 24 }} />
                                </button>
                              </td> */}
                              
                            </tr> :""
                            }
                            
                          </>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default LotesPage;
