import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Navigate, Redirect } from "react-router-dom";
import "./Home.css";
import "./MonitoreoPage.css"
import NavBar from "../componentes/NavBar";
import Monitoreos from "../componentes/Monitoreos";
import Acidez from "../componentes/Acidez";
import { isValid, parseISO, format } from "date-fns";
import { ImDownload3 } from "react-icons/im";
import { TbReport } from "react-icons/tb";
import { URL_API_AGP } from "../utilidades/constantes";
import { icons } from "react-icons";
import { AiOutlineEye } from "react-icons/ai"
import Modal from "../componentes/Modal";
import { getCliente, getMonitoreo, getLotes } from "../utilidades/Servicios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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

                    <h3>Monitoreos</h3>
                    <div>
            <select class="form-select" aria-label="Default select example" onChange={e=>Elegido(e)}>
              <option selected>Seleccione el país</option>
              <option value="BRASIL">Brasil</option>
              <option value="PERU">Perú</option>
              <option value="MEXICO">Mexico</option>
            </select>
          </div>
                    <div className="contenedor-busqueda">
                      <div className="contenedor-input">
                        <input type="text" className="form-control" placeholder="Ingrese su busqueda por Productor,Localidad o Fecha" value={busqueda} onChange={fnBusqueda} />
                      </div>
                      <br></br>

                    </div>
                  </div>
                  <div className="table-responsive">
                    <table className="table container">
                      <thead>
                        <tr>
                          <th scope="col">Nº Informe</th>
                          <th scope="col">Exportador</th>
                          <th scope="col">Nombre Planta</th>

                        </tr>
                      </thead>

                      <tbody className="table-group-divider">
                        {nuevo.filter(filtrado => filtrado.PaisDestino === filtradoPais).map((acceso) => {

                          return (<>
                            {/* <Modal info={acceso} id={acceso.Id} /> */}
                            <tr className="hover-tabla" key={acceso.Id}>
                              <td scope="row">
                                {acceso.NumAPG}

                              </td>
                              <td className="lcase" style={{ textTransform: 'uppercase' }}>
                                {acceso.Exportador
                                  ? acceso.Exportador
                                  : "Sin información"}
                              </td>
                              <td className="lcase" style={{ textTransform: 'uppercase' }}>{acceso.Exportador}</td>
                              <td style={{ textTransform: 'uppercase' }}>{acceso.NombrePlanta}</td>

                              <td style={{ textTransform: 'uppercase' }}>
                                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target={"#exampleModal" + acceso.Id}>
                                  <AiOutlineEye style={{ fontSize: 24 }} />
                                </button>
                              </td>
                              <td style={{ textTransform: 'uppercase' }}>
                                {acceso.InformeAdjunto ? (
                                  <a
                                    target="_blank"
                                    href={
                                      process.env.REACT_APP_API_PATH +
                                      acceso.InformeAdjunto
                                    }
                                  >
                                    {" "}
                                    <p style={{ color: "white", background: "green", borderRadius: "20px", padding: "8px", fontSize: "14px", textAlign: "center", textTransform: "capitalize", letterSpacing: 1 }}>Descargar</p>
                                  </a>
                                ) : (
                                  <p style={{ color: "white", background: "red", borderRadius: "20px", padding: "3px", fontSize: "12px", textAlign: "center" }}>En Proceso</p>
                                )}
                              </td>
                            </tr>
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
