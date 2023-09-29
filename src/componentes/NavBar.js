import React from "react";
import { VscAccount } from "react-icons/vsc";
import { MdMonitor } from "react-icons/md";
import { GiGrapes, GiLemon } from "react-icons/gi";
import { AiOutlineHome, AiFillCloseCircle } from "react-icons/ai";
import "./NavBar.css";
import { Link, useNavigate } from "react-router-dom";
import { ImList } from "react-icons/im";
import { TbLemon } from "react-icons/tb";
import {AiOutlineAppstoreAdd} from 'react-icons/ai';

const NavBar = ({ cliente }) => {
  const clientes = localStorage.getItem("cliente");
  const status = localStorage.getItem("status");
  const navigator = useNavigate();
  function cerrar() {
    localStorage.removeItem("status");
    localStorage.removeItem("cliente");
    localStorage.removeItem("token");
    navigator("/");
  }

  return (
    <div>
      <div className="perfil-contenedor">
        <div className="perfil">
          <img src="logo.png" width="100" />
          {cliente.Entities &&
            cliente.Entities.map((mapeo) => {
              return (
                <div key={mapeo.Id}>
                  <h2>Perfil</h2>
                  <h5>
                    <span>Cliente:</span>{" "}
                    {mapeo.RazonSocial ? mapeo.RazonSocial : " --"}
                  </h5>
                  <h5>
                    <span>Rut:</span> {mapeo.Rut ? mapeo.Rut : " --"}
                  </h5>
                  <h5>
                    <span>Provincia:</span>
                    {mapeo.NombreProvincia ? mapeo.NombreProvincia : " --"}
                  </h5>
                  <h5>
                    <span>Comuna:</span>
                    {mapeo.NombreComuna ? mapeo.NombreComuna : " --"}
                  </h5>
                </div>
              );
            })}
        </div>
        <div className="botonera">
          <ul>
            <Link to="/Home">
              {" "}
              <li>
                <span>
                  <AiOutlineHome style={{ fontSize: 23 }} />
                </span>
                Home
              </li>
            </Link>
            <Link to="/Recepciones">
              <li>
                <span>
                  <ImList style={{ fontSize: 23 }} />
                </span>
                Recepción de Muestras
              </li>
            </Link>
            <Link to="/Monitoreo">
              {" "}
              <li>
                <span>
                  <MdMonitor style={{ fontSize: 23 }} />
                </span>
                Monitoreo
              </li>
            </Link>
            <Link to="/Acidez">
              <li>
                <span>
                  <TbLemon style={{ fontSize: 23 }} />
                </span>
                Acidez de Frutos
              </li>
            </Link>

            <Link to="/Lotes">
              <li>
                <span>
                  <AiOutlineAppstoreAdd style={{ fontSize: 23 }} />
                </span>
                Certificación de Lotes
              </li>
            </Link>
          </ul>

         
        </div>
        <div className="container">
        <button className="btn btn-danger" onClick={cerrar}>
          <AiFillCloseCircle /> Cerrar Sesión
        </button>
      </div>
      </div>
      
    </div>
  );
};

export default NavBar;
