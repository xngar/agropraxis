import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Navigate, Redirect } from "react-router-dom";
import "./Home.css";
import NavBar from "../componentes/NavBar";
import Monitoreos from "../componentes/Monitoreos";
import Acidez from "../componentes/Acidez";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdMonitor } from "react-icons/md";
import { GiGrapes, GiLemon } from "react-icons/gi";
import { FiArrowRight } from "react-icons/fi";
import {
  getMonitoreo,
  getCliente,
  getAcidez,
  getRecepcion,
  getLotes
} from "../utilidades/Servicios";

import { URL_API_AGP } from "../utilidades/constantes";
import { TbLemon } from "react-icons/tb";
import { ImList } from "react-icons/im";

const Home = () => {
  const [nuevo, setDatos] = useState(0);
  const [acidez, setAcidez] = useState(0);
  const [recep, setRecep] = useState(0);
  let totalLotesMexico = [];
  let totalLotesBrasil = [];
  let totalLotesPeru = [];



  const [pMexico, setMexico] = useState([]);
  const [pBrasil, setBrasil] = useState([]);
  const [pPeru, setPeru] = useState([]);
  const [lotes,setLotes] = useState();

  const estado = useLocation().state;
  const tokesito = useLocation().state;

  const [auth, setAuth] = useState(false);
  const [cliente, setCliente] = useState([]);

  const { state } = useLocation();
  const statuto = localStorage.status;
  const TOKEN = localStorage.getItem("token");
  const nombreCliente = localStorage.getItem("cliente");

  let info = [{}];

  const cargarDatos = async () => {
    //cargando datos monitoreo
    const moni = await getMonitoreo(TOKEN);
    setDatos(moni);
    //cargando datos acidez
    var acidez = await getAcidez(TOKEN);
    setAcidez(acidez);
    //cargando datos recepcion
    const recep = await getRecepcion(TOKEN);
    setRecep(recep);

    //Clientes
    var client = await getCliente(TOKEN);

    var lotes = await getLotes(TOKEN);
    // lot.map(loteado => loteado.)
    console.log(lotes.Entities[0].PaisDestino);
    setLotes(lotes);
    setBrasil(lotes.Entities.filter(filtrar=> filtrar.PaisDestino ==="BRASIL"));
    setPeru(lotes.Entities.filter(filtrar=> filtrar.PaisDestino ==="PERU"));
    setMexico(lotes.Entities.filter(filtrar=> filtrar.PaisDestino ==="MEXICO"));
  //  console.log(totalLotes.length);
    toast.success("Conectado correctamente!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

    setCliente(client);
  };

  useEffect(() => {
    if (statuto) {
      setAuth(true);
    }

  
    cargarDatos();
  }, []);
  const date = new Date()

  const propsObj = {
    prop1: 'Valor 1',
    prop2: 'Valor 2',
  };
  return (
    <>
      {statuto ? (
        <div className="contenedor">
          
          
          {/* contenido sector izquierdo */}
          <div className="izquierda">
            <ToastContainer />
            <NavBar cliente={cliente} />
          </div>

          {/* contenido sector derecho */}
          {/* ********************************* */}
          {/* ********************************** */}

          <div className="derecha">
            <div className="derecha-contenedor">
              
              
              {/* titulo bienvenida  */}
              <div className="banner">
                <div className="izq">
                  <h1>¡Bienvenido {nombreCliente}!</h1>
                  <p>
                    Abajo veras los últimos ingresos en Monitoreo y Acidez de
                    Frutas
                  </p>
                </div>
                <div className="banner-img">
                  <img src="imagen-banner.png" height={120} />
                </div>
              </div>


              {/* visualizacion de datos */}
              <div className="cont-datos">
                
                <div className="contenedorCardDash">
                  <div className="cardDash">
                    <h3>
                      <TbLemon style={{ fontSize: 23 }} />
                      Total Acidez
                    </h3>
                    <span>
                      <FiArrowRight /> {acidez.TotalCount} ( Activos )
                    </span>
                  </div>

                  <div className="cardDash">
                    <h3>
                      <MdMonitor style={{ fontSize: 23 }} /> Total Monitoreo
                    </h3>
                    <span>
                      <FiArrowRight /> {nuevo.TotalCount} ( Activos )
                    </span>
                  </div>

                  <div className="cardDash">
                    <h3>
                      <ImList style={{ fontSize: 23 }} /> Recepciones
                    </h3>
                    <span>
                      <FiArrowRight /> {recep.TotalCount} ( Activos )
                    </span>
                    <span>
                      <FiArrowRight />{" "}
                      {recep.TotalCount -(acidez.TotalCount + nuevo.TotalCount )}{" "}
                      ( Pendientes )
                    </span>
                  </div>
                </div>

                {/* LOTES */}
                <div className="contenedor-lotes">
                <h1>Información de Lotes</h1>
                <div className="contenedorCardDash">
                  
                  {/* mexico */}
                  <div className="cardDash">
                    
                    <h3>
                    <img src="mexico.png" width={50} />
                     
                    <Link style={{color:"#fff"}} to={{pathname:"/Lotes/MEXICO", state:{stateParam:true}}}>Mexico</Link>
                    </h3>
                    <span>
                      
                      <FiArrowRight /> {pMexico.length} ( Activos )
                    </span>
                  </div>


                  {/* brasil */}
                  <div className="cardDash">
                    <h3>
                    <img src="brasil.png" width={50} />
                    <Link style={{color:"#fff"}} to={{pathname:"/Lotes/BRASIL", state:{stateParam:true}}}>Brasil</Link>
                    </h3>
                    <span>
                      <FiArrowRight /> {pBrasil.length} ( Activos )
                    </span>
                  </div>

                  {/* peru */}
                  <div className="cardDash">
                    <h3>
                    <img src="peru.png" width={50} />
                     <span><Link style={{color:"#fff"}} to={{pathname:"/Lotes/PERU", state:{stateParam:true}}}>Perú</Link></span>
                    </h3>
                    <span>
                      <FiArrowRight /> {pPeru.length} ( Activos )
                    </span>
                    
                  </div>
                </div>
                </div>
              </div>
            </div>
            <div className="footer">
              <div>
                <p>Copyright (c) {date.getFullYear()} </p>
                <p>UP Code E.I.R.L v2023.06.26</p>
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

export default Home;
