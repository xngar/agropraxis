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
import { getCliente, getRecepcion } from "../utilidades/Servicios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const RecepcionesPage = () => {
  const [nuevo, setDatos] = useState([]);
  const [acidez, setAcidez] = useState([]);
  const estado = useLocation().state;
  

  const [auth, setAuth] = useState(false);
  const [cliente, setCliente] = useState([]);

  const { state } = useLocation();
  const statuto = localStorage.status;
  const t = localStorage.getItem("token");
  const [busqueda, setBusqueda] = useState("");

  let info = [{}];


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



  const resultados = !busqueda ? nuevo : nuevo.filter((datos) => datos.Id.toString().includes(busqueda.toLowerCase()) || datos.Productor.toLowerCase().includes(busqueda.toLowerCase()) || datos.FechaRecepcion.includes(busqueda) );

  function fnMostrarCalendario() {
    setMostrarCalendario(!mostrarCalendario);
  }




  const recepciones = async () => {
    const respuesta = await getRecepcion(t);
    setDatos(respuesta.Entities);
  };

  const getClientes = async () => {
    const respuesta = await getCliente(t);
    setCliente(respuesta);
  };


  useEffect(() => {
    if (statuto) {
      setAuth(true);
    }

    recepciones();

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

                    <h3>Recepciones</h3>
                    <div className="contenedor-busqueda">
                      <div className="contenedor-input">
                        <input type="text" className="form-control" placeholder="Ingrese su busqueda por Productor,Localidad o Fecha" value={busqueda} onChange={fnBusqueda} />
                      </div>
                      <br></br>
                      <button onClick={fnMostrarCalendario} className="btn btn-primary" > Buscar por fecha de Informe Ingresado </button>
                      {
                        mostrarCalendario && (

                          <DatePicker className="form-control" inline showYearDropdown selected={startDate} onChange={(date) => diaSeleccionado(date)} dateFormat="dd-MM-yyyy" />

                        )
                      }
                    </div>
                   
                  </div>
                  <div className="table-responsive">
                    <table className="table container">
                      <thead>
                        <tr>
                          <th scope="col">Número Recepción</th>
                          <th scope="col">Fecha de Recepción</th>
                          <th scope="col">Fecha de Muestreo</th>
                          <th scope="col">Productor</th>
                          <th scope="col">Cliente</th>
                          <th scope="col">Predio</th>
                          <th scope="col">Comuna</th>
                          <th scope="col">Región</th>
                          <th scope="col">Traido Por</th>
                          <th scope="col">Tipo de Analisis</th>
                        </tr>
                      </thead>

                      <tbody className="table-group-divider">
                        {resultados?.map((servicio) => {

                          return (<>
                            <tr key={servicio.Id}>
                            <td>{servicio.Id && servicio.Id}</td>
                              <td style={{ textTransform: 'uppercase' }}>{format(parseISO(servicio.FechaRecepcion), "dd/MM/yyyy")}</td>
                              <td style={{ textTransform: 'uppercase' }}>{format(parseISO(servicio.FechaMuestreo), "dd/MM/yyyy")}</td>
                              <td className="lcase" style={{ textTransform: 'uppercase' }}>
                                {servicio.Productor ? servicio.Productor : "Sin información"}
                              </td>
                              <td className="lcase" style={{ textTransform: 'uppercase' }}>
                                {servicio.Cliente ? servicio.Cliente : "Sin información"}
                              </td>
                              <td className="lcase" style={{ textTransform: 'uppercase' }}>
                                {servicio.Predio ? servicio.Predio : "Sin información"}
                              </td>
                              <td className="lcase" style={{ textTransform: 'uppercase' }}>
                                {servicio.Comuna ? servicio.Comuna : "Sin información"}
                              </td>
                              <td className="lcase" style={{ textTransform: 'uppercase' }}>
                                {servicio.Region ? servicio.Region : "Sin información"}
                              </td>
                              <td className="lcase" style={{ textTransform: 'uppercase' }}>
                                {servicio.TraidoPor ? servicio.TraidoPor : "Sin información"}
                              </td>
                              <td className="lcase" style={{ textTransform: 'uppercase' }}>
                                {servicio.TipoAnalisis ? servicio.TipoAnalisis : "Sin información"}
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

export default RecepcionesPage;
