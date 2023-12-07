import { useAuth } from "../firebase/auth";
import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
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

    if (!authUser) return <Navigate to={"/login"}/>

  return <>{children}</>;
};

export default ProtectedRoute;
