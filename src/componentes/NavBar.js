import React from "react";
import { VscAccount } from "react-icons/vsc";
import { MdMonitor } from "react-icons/md";
import { GiGrapes } from "react-icons/gi";
import "./NavBar.css";

const NavBar = ({ cliente }) => {
  const clientes = localStorage.getItem("cliente");
  const status = localStorage.getItem("status");

  return (
    <div>
      <div className="perfil">
        <img src="logo.png" width="100" />
        {cliente &&
          cliente.map((mapeo) => {
            return (
              <div>
                <h2>Perfil</h2>
                <h5>Cliente: {mapeo.RazonSocial}</h5>
                <h5>Rut: {mapeo.Rut}</h5>
                <h5>Provincia:{mapeo.NombreProvincia}</h5>
                <h5>Comuna:{mapeo.NombreComuna}</h5>
              </div>
            );
          })}
      </div>
      <ul>
        <li>
          <span>
            <MdMonitor />
          </span>
          Monitoreo
        </li>
        <li>
          <span>
            <GiGrapes />
          </span>
          Acidez de Frutos
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
