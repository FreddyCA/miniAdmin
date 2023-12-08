import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useAuth } from "../firebase/auth";
import { useEffect, useState } from "react";

const UserProfile = ({ data }) => {
  const [userStatus, setUserStatus] = useState("");
  const [formateFile, setFormateFile] = useState(false);

  const newDate = data.dateDB.toDate();
  const dateFormat = newDate.toLocaleDateString("es-BO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  useEffect(() => {
    // Verificar y establecer el estado del usuario
    if (data.rol === "userNew") {
      setUserStatus("En verificación");
    }

    // Verificar y establecer el formato del archivo
    const fileType = data.fileType;
    if (fileType.includes("image")) {
      setFormateFile(true);
    } else if (fileType.includes("pdf")) {
      setFormateFile(false);
    }
  }, [data]);

  const { logout } = useAuth();

  const handleLogout = () => {
    console.log("cerrando sesion");
    logout();
  };

  return (
    // renderizar un bosquejo
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <h1>Bienvenido: {data.name}</h1>
      <span>Curso: {data.curso}</span>
      <span>Estado de Inscripción: {userStatus}</span>
      <span>Fecha de Inscripcion: {dateFormat}</span>
      {formateFile ? (
        <img src={data.comprobante} alt="imagen de recibo" style={{maxWidth: "100px"}}/>
      ) : (
        <a href={data.comprobante} target="_blank" rel="noreferrer">
          Click para ver el PDF
        </a>
      )}

      <Link
        to={"/"}
        style={{
          backgroundColor: "skyblue",
          padding: "1rem",
          textDecoration: "none",
          width: "min-content",
        }}
      >
        <div>Inicio</div>
      </Link>

      <div
        style={{
          backgroundColor: "rosybrown",
          padding: "1rem",
          textDecoration: "none",
          width: "min-content",
          whiteSpace: "nowrap",
          cursor: "pointer",
        }}
        onClick={handleLogout}
      >
        Cerrar sesión
      </div>
    </div>
  );
};

UserProfile.propTypes = {
  data: PropTypes.object.isRequired,
};

export default UserProfile;
