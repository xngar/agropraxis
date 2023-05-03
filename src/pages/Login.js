import React, { useEffect, useState } from "react";
import "./Login.css";
import {useNavigate} from "react-router-dom"
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

  const enviarlogin = async (formulario) => {

    try {
      const resultado = await fetch("https://localhost:7126/api/Auth/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Usuario: formulario.Usuario,
          Password: formulario.Password,
        }),
      });
      
      if (resultado.ok)
       {
        
        const respuestaJson = await resultado.json();
        const token2 = respuestaJson.value; // aquí se accede al token de autenticación
        setToken(token2);
        console.log(token2);
        if(token2 ==="Usuario No encontrado"){
            navigate("/");
          
        }else{
          navigate("/home",{
            state:{
              logged:true,
              nombre:formulario.Usuario,
              token:token2
            }
          })
        }
        


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
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">
                  Usuario
                </label>
                <input
                 value={formulario.Usuario}
                   name="Usuario"
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={(e)=>handleForm(e)}
                />
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                  Password
                </label>
                <input
                  value={formulario.Password}
                  name="Password"
                  type="password"
                  class="form-control"
                  id="exampleInputPassword1"
                  onChange={(e)=>handleForm(e)}
                />
              </div>

              <button type="submit" class="btn btn-primary">
                Ingresar
              </button>
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
