import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";

import Login from "../pages/Login";
import MonitoreoPage from "../pages/MonitoreoPage";
import AcidezPage from "../pages/AcidezPage";
import RecepcionesPage from "../pages/RecepcionesPage";



export const router = createBrowserRouter([
    {
        path: "/",
        element: <Login/>,
    },
    {
        path: "/home",
        element:<Home/>,
    },
    {
        path:"/monitoreo",
        element:<MonitoreoPage/>
    },
    {
        path:"/acidez",
        element:<AcidezPage/>
    },
    {
        path:"/Recepciones",
        element:<RecepcionesPage/>
    },
    {
        path:"*",
        element:<Login/>
    }

   
]);