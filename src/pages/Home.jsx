import { Link } from "react-router-dom";

import { useAuth } from "../firebase/auth";

const Home = () => {
  // trayendo el register:
  const { authUser, isLoading } = useAuth();
  // console.log(useAuth());
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <h1>Home</h1>
      {isLoading === false && authUser && <h2>{authUser.email}</h2>}
      <div style={{ display: "flex", gap: "2rem" }}>
        <Link to={"/register"} style={{ textDecoration: "none" }}>
          <div
            style={{
              padding: "1rem",
              backgroundColor: "skyblue",
              cursor: "pointer",
            }}
          >
            Registro
          </div>
        </Link>

        <Link to={"/login"} style={{ textDecoration: "none" }}>
          <div
            style={{
              padding: "1rem",
              backgroundColor: "blanchedalmond",
              cursor: "pointer",
            }}
          >
            Inicio de sesión
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
