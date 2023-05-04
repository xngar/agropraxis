import React from 'react'
import {VscAccount} from "react-icons/vsc"
import {MdMonitor} from "react-icons/md"
import {GiGrapes} from "react-icons/gi"

const NavBar = () => {
  return (
   <div>
    <img src="logo.png" width="100"/>
    <ul>
        <li><span><VscAccount/></span>My Perfil</li>
        <li><span><MdMonitor/></span>Monitoreo</li>
        <li><span><GiGrapes/></span>Acidez de Frutos</li>
    </ul>
   </div>
  )
}

export default NavBar;