import PropTypes from "prop-types";
import { useState } from "react";
import { useAuth } from "../firebase/auth";
import { firestoreDB } from "../firebase/firebase";
import { collection, doc, updateDoc } from "firebase/firestore";

const AdminProfile = ({ data }) => {
  const handleRolUser = async (uid) => {
    console.log("cambio de rol0", uid);
    const newRol = "habilitado";
    try {
      const userDocRef = doc(collection(firestoreDB, "usuarios"), uid);
      await updateDoc(userDocRef, { rol: newRol });
    } catch (error) {
      console.log(error);
    }
  };

  console.log(data);

  //   agregar para cambiar de rol

  //   ORDENANDO
  const sortedArray = data.slice().sort((a, b) => {
    const dateA = a.dateDB.toMillis();
    const dateB = b.dateDB.toMillis();
    return dateB - dateA;
  });

  console.log("ordenado", sortedArray);

  const [selectedUser, setSelectedUser] = useState(null);
  const [celdaSelected, setCeldaSelected] = useState(false);

  const handleVerFoto = (user) => {
    // Mostrar la foto cuando se hace clic en "Ver Foto"
    setSelectedUser(user);
    setCeldaSelected(user.uid);
  };

  const handleCloseFoto = () => {
    // Cerrar la foto cuando se hace clic en cerrar
    setSelectedUser(null);
  };

  const { logout } = useAuth();
  const handleLogout = () => {
    console.log("cerrando sesion");
    logout();
  };

  return (
    <div>
      <h2>Super Admin</h2>
      <span>activa a los usuarios verificando el pago</span>
      <div
        onClick={handleLogout}
        style={{
          backgroundColor: "orchid",
          width: "min-content",
          whiteSpace: "nowrap",
          padding: "1rem",
          cursor: "pointer",
        }}
      >
        Cerrar sesion
      </div>
      <div>
        {selectedUser && (
          <div
            style={{
              padding: "1rem",
              border: "5px solid black",
              width: "min-content",
            }}
          >
            <img
              src={selectedUser.comprobante}
              alt="imagen de recibo"
              style={{ maxWidth: "500px" }}
              loading="lazy"
            />
            <button onClick={handleCloseFoto}>Cerrar Imagen</button>
          </div>
        )}

        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Dia/Mes/Año, Hora</th>
              <th>comprobante</th>
            </tr>
          </thead>

          <tbody>
            {sortedArray.map((user) => (
              <tr
                key={user.uid}
                style={{
                  backgroundColor:
                    user.uid === celdaSelected ? "skyblue" : "white",
                }}
              >
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.rol === "userNew" ? (
                    <>
                      {user.rol}
                      <button onClick={() => handleRolUser(user.uid)}>
                        Habilitar
                      </button>
                    </>
                  ) : (
                    user.rol
                  )}
                </td>
                <td>
                  {(() => {
                    const newDate = user.dateDB.toDate(); // Cambiado de data.dateDB a user.dateDB
                    const dateFormat = newDate.toLocaleDateString("es-BO", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    });

                    return dateFormat;
                  })()}
                </td>
                <td>
                  {user.fileType &&
                    (() => {
                      const fileType = user.fileType;
                      if (fileType && fileType.includes("image")) {
                        return (
                          <>
                            <img
                              src={user.comprobante}
                              alt="imagen de recibo"
                              style={{ maxWidth: "100px" }}
                              loading="lazy"
                            />
                            <button onClick={() => handleVerFoto(user)}>
                              Ver Imagen
                            </button>
                          </>
                        );
                      } else if (fileType && fileType.includes("pdf")) {
                        return (
                          <a
                            href={user.comprobante}
                            target="_blank"
                            rel="noreferrer"
                            onClick={() => setCeldaSelected(user.uid)}
                          >
                            Click para ver el PDF
                          </a>
                        );
                      }
                    })()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

AdminProfile.propTypes = {
  data: PropTypes.array.isRequired,
};

export default AdminProfile;
