import { useState } from "react";

import { useAuth } from "../firebase/auth";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    rol: "activation",
    date: new Date().toString(),
  });

  const [messageAlert, setMessageAlert] = useState(false);

  // trayendo el register:
  const { register, authUser, isLoading } = useAuth();

  // para redirigir
  const navigate = useNavigate();

  const handleChange = ({ target: { name, value } }) => {
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(data.email, data.password);
      console.log(authUser);
      console.log(isLoading);
      setMessageAlert(true);
      setTimeout(() => {
        setMessageAlert(false);
        console.log("vuelve al home");
        navigate("/");
      }, 5000);
      // se redirige
    } catch (error) {
      // manejo de erroes pueden ser varios if con condicion el codigo de mesnake
      console.log("Error en el formulario de registro", error.message);
    }
    console.log(data);
    // console.log(authUser);
    console.log(isLoading);
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {isLoading && <h3>en proceso</h3>}
      {messageAlert && (
        <h3>
          Proceso Exitoso, espere un mensaje a su correo dentro de 48 hrs a 72
        </h3>
      )}
      <h2>Inscripcion</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "400px",
        }}
      >
        <input
          name="name"
          type="text"
          value={data.name}
          placeholder="Escribe tu nombre"
          onChange={handleChange}
        ></input>
        <input
          name="email"
          type="email"
          value={data.email}
          placeholder="Escribe tu correo"
          onChange={handleChange}
        ></input>
        <input
          name="password"
          type="password"
          value={data.password}
          placeholder="Escribe tu constraseña"
          onChange={handleChange}
        ></input>

        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default Register;
