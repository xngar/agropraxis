
import { URL_API_AGP } from "./constantes";

// Servicio que retorna la lista de monitoreos del cliente logueado
export const getMonitoreo = async (token) => {
  
  var request = '/api/Servicios/Monitoreos';
    const respuesta = await fetch(URL_API_AGP + request, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });

    const result = await respuesta.json();
    const data = await result;
   return data;
  };
// Servicio que retorna el cliente logueado
export const getCliente = async (token) => {
   
    const respuesta = await fetch(URL_API_AGP + "/api/Auth/Cliente", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });

    const result = await respuesta.json();
    const data = result;
    return data;
  };

// Servicio que retorna la lista de Acidez de Frutas del cliente logueado
export const getAcidez = async (token) => {
    const respuesta = await fetch(URL_API_AGP + "/api/Servicios/AcidezFruta", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });

    const result = await respuesta.json();
    const data = await result;
    return data;
  };

// Servicio que retorna la lista de Recepciones del cliente logueado
export const getRecepcion = async (token) => {
    const respuesta = await fetch("https://service.agropraxisgroup.cl/api/Servicios/Recepciones", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });

    const result = await respuesta.json();
    const data = await result;
    return data;
  };