import React, { useEffect, useState,useContext } from "react";
import "./Login.css";
import {useNavigate} from "react-router-dom";
import {URL_API_AGP} from '../utilidades/constantes';



const Login = () => {
  const user = {
    Usuario: "bayer",
    Password: "123456",
  };



  const navigate = useNavigate();
  const[formulario, setFormulario] = useState({
    Usuario:"",
    Password:""
  });
  const [token, setToken] = useState();
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState("");
  

  const enviarlogin = async (formulario) => {

    try {
      const resultado = await fetch(URL_API_AGP+"/api/Auth/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Usuario: formulario.Usuario,
          Password: formulario.Password,
        }),
      });
      console.log(resultado);
     
      if (resultado.ok){

        setCargando("Cargando...")
        const respuestaJson = await resultado.json();
        console.log(respuestaJson);
        const token2 = respuestaJson.value; // aquí se accede al token de autenticación
        setToken(token2);
        localStorage.setItem("token",token2);
       
        console.log(respuestaJson.statusCode)
       

       
        if(respuestaJson.statusCode === 404 ){
          setError("Nombre de usuario o clave inválida");
            navigate("/");
          
        }
        else{

          
        

          localStorage.setItem("cliente",formulario.Usuario)
          localStorage.setItem("status",true);
          navigate("/home",{
            state:{
              logged:true,
              nombre:formulario.Usuario,
              token:token2,
              status:respuestaJson.statusCode
            }
          })
            
          
      

           
          
        
      }
          
       ;
        
        
      
        


      } else {
        navigate("/");
      }
    } catch (error) {
      navigate("/");
    }
  };

  function handleForm(e){
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    })
    console.log(formulario);
  }

  function handleEnviar(e){
      e.preventDefault();
      console.log("enviando");
      enviarlogin(formulario);
  }

  useEffect(() => {
    
   
  }, []);

  return (
    <div>
      <div className="login-contenedor">
        
        <div className="login-formulario">
          <div className="login-izquierda">
            <img src="logo.png" alt="logo-agropraxis" width="200px" />
            <h2>Bienvenidos </h2>

            <form onSubmit={(e)=>handleEnviar(e)}>
              <div className="mb-3">
                <label  className="form-label">
                  Usuario
                </label>
                <input
                 value={formulario.Usuario}
                   name="Usuario"
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={(e)=>handleForm(e)}
                />
              </div>
              <div className="mb-3">
                <label  className="form-label">
                  Password
                </label>
                <input
                  value={formulario.Password}
                  name="Password"
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  onChange={(e)=>handleForm(e)}
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Ingresar
              </button>
              <div>{cargando}</div>
              <br/>
              <span style={{color:"red", fontSize:"14px"}}>{error}</span>
            </form>
          </div>
          <div className="login-derecha">
            <img src="agro1.jpg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
