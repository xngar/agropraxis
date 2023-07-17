import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Navigate, Redirect } from "react-router-dom";
import "./Home.css";
import "./AcidezPage.css";
import NavBar from "../componentes/NavBar";
import Monitoreos from "../componentes/Monitoreos";
import Acidez from "../componentes/Acidez";
import { format, parseISO, isSameDay, parse } from "date-fns";
import { URL_API_AGP } from "../utilidades/constantes";
import { AiOutlineEye, AiOutlineSearch, AiOutlineEyeInvisible } from "react-icons/ai"

import ModalAcidez from "../componentes/ModalAcidez";
import { getAcidez, getCliente } from "../utilidades/Servicios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BsCalendarPlusFill } from "react-icons/bs"
import { MdFileDownload, MdFileDownloadOff } from "react-icons/md"
import ModalImagenes from "../componentes/ModalImagenes";
import { TbLemon } from "react-icons/tb";


const AcidezPage = () => {


  const [busqueda, setBusqueda] = useState("");

  const [nuevo, setDatos] = useState([]);
  const [acidez, setAcidez] = useState([]);
  const estado = useLocation().state;
  const tokesito = useLocation().state;

  const [auth, setAuth] = useState(false);
  const [cliente, setCliente] = useState([]);
  const t = localStorage.getItem("token");

  const { state } = useLocation();
  const statuto = localStorage.status;

  let info = [{}];

  const getClientes = async () => {
    const respuesta = await getCliente(t);
    setCliente(respuesta);
  };

  const getAcideces = async () => {
    const respuesta = await getAcidez(t);
    setAcidez(respuesta.Entities);
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



  const resultados = !busqueda ? acidez : acidez.filter((datos) => datos.Productor.toLowerCase().includes(busqueda.toLowerCase()) || datos.Localidad.toLowerCase().includes(busqueda.toLowerCase()) || datos.FechaIngreso.includes(busqueda));

  function fnMostrarCalendario() {
    setMostrarCalendario(!mostrarCalendario);
  }


  const calcular = () => {

    let sumFut = resultados.map((mapeo) => mapeo.ListaResultados).filter((lista) => lista?.length > 0); // Filtrar las listas que tienen contenido
    let sumatoria = 0;
    // console.log(sumFut.map(mapeo => mapeo.map(resultados => resultados.JugoPeso)));
    // let resultadoSum = sumFut.map(mapeo => mapeo.map(resultados => resultados.PesosFrutos.map(pf => pf.Peso)))



    let resultadoSum = sumFut.map(mapeo => mapeo.map(resultados => resultados.PesosFrutos.map(pf => {
      return sumatoria += pf.Peso


    }

    )))

    let ResJugoPeso = sumFut.map(mapeo => mapeo.map(resultados => resultados.JugoPeso));
    // let sumatoriaTotal = resultadoSum.reduce(acc,el,0);


    ResJugoPeso.map(cifra => cifra.map(res => {
      console.log((res / sumatoria) * 100)
    }));
    // console.log(((sumatoria / ResJugoPeso[1][1]) * 100));



  }




  useEffect(() => {
    if (statuto) {
      setAuth(true);
    }

    getAcideces();
    getClientes();

    calcular();
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
                  <div className="acidez-titulo">

                    <h3> <TbLemon style={{ fontSize: 23 }} /> Acidez de Fruta</h3>
                    <div className="contenedor-busqueda">
                      <div className="contenedor-input">
                        <input type="text" className="form-control" placeholder="Ingrese su busqueda por Productor,Localidad o Fecha" value={busqueda} onChange={fnBusqueda} />
                      </div>
                      <br></br>
                      <button onClick={fnMostrarCalendario} className="btn btn-primary" > Buscar por fecha de Ingreso </button>
                      {
                        mostrarCalendario && (

                          <DatePicker className="form-control" inline showYearDropdown selected={startDate} onChange={(date) => diaSeleccionado(date)} dateFormat="dd-MM-yyyy" />

                        )
                      }
                    </div>
                    <br />
                  </div>
                  <div className="table-responsive">
                    <table className="table container">
                      <thead>
                        <tr>
                          <th scope="col">Nº Informe</th>
                          <th scope="col">Productor</th>
                          <th scope="col">Predio</th>
                          <th scope="col">Localidad</th>

                          <th scope="col">Fecha Ingreso</th>

                          <th scope="col">Fecha Informe</th>
                          <th scope="col">Especie</th>
                          <th scope="col">Muestreador</th>

                          <th scope="col">Informe</th>
                          <th scope="col">Resultados Acidez</th>
                          <th scope="col">Evidencias</th>
                        </tr>
                      </thead>

                      <tbody className="table-group-divider">
                        {resultados?.sort((a, b) => a.NumApg - b.NumApg).map((acceso) => {


                          return (
                            <>
                              <ModalAcidez info={acceso} id={acceso.Id} />
                              <ModalImagenes info={acceso} id={acceso.Id} />
                              <tr key={acceso.Id}>
                                <td scope="row">
                                  {acceso.NumApg}
                                </td>
                                <td className="lcase" style={{ textTransform: 'uppercase' }}>
                                  {acceso.Productor
                                    ? acceso.Productor
                                    : "Sin información"}
                                </td>
                                <td style={{ textTransform: 'uppercase' }}>{acceso.Predio}</td>
                                <td style={{ textTransform: 'uppercase' }}>{acceso.Localidad}</td>

                                <td style={{ textTransform: 'uppercase' }}>{acceso.FechaIngreso != null ? format(parseISO(acceso?.FechaIngreso), "dd/MM/yyyy") : ''}</td>

                                <td style={{ textTransform: 'uppercase' }}>{format(parseISO(acceso?.FechaInforme), "dd/MM/yyyy")}</td>
                                <td style={{ textTransform: 'uppercase' }}>{acceso.Especie}</td>
                                <td style={{ textTransform: 'uppercase' }}>{acceso.Muestreador}</td>


                                <td style={{ textTransform: 'uppercase' }}>
                                  {acceso.InformeAdjunto ? (
                                    <a target="_blank" href={process.env.REACT_APP_API_PATH + acceso.InformeAdjunto}>

                                      <MdFileDownload style={{ fontSize: 24 }} title="Descargar" />

                                    </a>
                                  ) : (

                                    <MdFileDownloadOff style={{ fontSize: 24, color: "#adadad" }} />
                                  )}
                                </td>


                                <td style={{ textTransform: 'uppercase' }}>
                                  <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={"#exampleModalAcidez" + acceso.Id}>
                                    <AiOutlineEye style={{ fontSize: 24 }} />
                                  </button>
                                </td>


                                {!acceso.Evidencia ?
                                  (<div><button disabled type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target={"#exampleModalImagenes" + acceso.Id}>
                                    <AiOutlineEyeInvisible style={{ fontSize: 24 }} title="Evidencias No Encontradas" />
                                  </button></div>)
                                  : (<div>
                                    <td style={{ textTransform: 'uppercase' }}>
                                      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={"#exampleModalImagenes" + acceso.Id}>
                                        <AiOutlineEye style={{ fontSize: 24 }} title="Evidencias Encontradas" />
                                      </button>
                                    </td>
                                  </div>)}




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

export default AcidezPage;
