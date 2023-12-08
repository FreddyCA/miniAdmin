import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [messageAlert, setMessageAlert] = useState(false);

  // trayendo el register:
  const { login, isLoading, errorCode } = useAuth();

  // para redirigir
  const navigate = useNavigate();

  const handleChange = ({ target: { name, value } }) => {
    setData({ ...data, [name]: value });
  };

  const [mensajeError, setMensajeError] = useState("");

  useEffect(() => {
    if (errorCode) {
      setMensajeError("Verifique su correo y contraseña");
    }
  }, [errorCode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(data.email, data.password);
      setMessageAlert(true);
      navigate("/userPanel");
      // se redirige
    } catch (error) {
      // manejo de erroes pueden ser varios if con condicion el codigo de mesnake
      console.log("Error en el formulario de inicio de sesion", error.message);
    }
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
        <h3>Inicio se sesión exitoso, se redirigira al Panel de usuarios</h3>
      )}
      {errorCode && <h3>{mensajeError}</h3>}

      <h2>Login</h2>
      <div>
        <span>Si no tiene una cuenta, inscribace a un curso</span>
        <Link to={"/"}>
          <button>Volver al inicio</button>
        </Link>
      </div>
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
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default Login;
