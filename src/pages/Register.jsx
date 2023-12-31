import { useState } from "react";

import { useAuth } from "../firebase/auth";
import { useNavigate } from "react-router-dom";
import { serverTimestamp } from "firebase/firestore";

const Register = () => {
  // para redirigir
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    curso: "Primer Curso De Desarrollo",
    idCurso: "primerCursoDev",
    rol: "userNew",
    date: new Date().toString(),
    dateDB: serverTimestamp(),
  });

  // estado para el file
  const [file, setFile] = useState(null);

  const [messageAlert, setMessageAlert] = useState(false);

  // trayendo el register:
  const { register, authUser, isLoading } = useAuth();

  // traer el errorCode para manejo de errores, ademas de usar useefect

  // manejo del file
  const handleFileChange = (e) => {
    const fileSelected = e.target.files[0];
    // const fileSelected = e.target.value;
    setFile(fileSelected);
  };

  // manejo de inputs
  const handleChange = ({ target: { name, value } }) => {
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // llega el url a registrar:
      await register(
        data.name,
        data.email,
        data.password,
        data.curso,
        data.idCurso,
        data.rol,
        data.date,
        data.dateDB,
        file
      );
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

        <input
          type="file"
          accept=".jpg, .jpeg, .png, .pdf"
          onChange={handleFileChange}
        ></input>

        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default Register;
