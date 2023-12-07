import { useAuth } from "../firebase/auth";
import { Navigate } from "react-router-dom";
const ProtectedRouteLogin = ({ children }) => {
  const { authUser, isLoading } = useAuth();
  if (isLoading)
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1>Cargando</h1>
      </div>
    );

    if (authUser) return <Navigate to={"/userPanel"}/>

  return <>{children}</>;
};

export default ProtectedRouteLogin;
