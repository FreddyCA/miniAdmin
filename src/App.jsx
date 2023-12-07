import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserPanel from "./pages/UserPanel";
import { Route, Routes } from "react-router-dom";
import { AuthUserProvider } from "./firebase/auth";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedRouteLogin from "./components/ProtectedRouteLogin";

const App = () => {
  return (
    <>
      <AuthUserProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={
              <ProtectedRouteLogin>
                <Login />
              </ProtectedRouteLogin>
            }
          />
          <Route
            path="/userPanel"
            element={
              <ProtectedRoute>
                <UserPanel />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthUserProvider>
    </>
  );
};

export default App;
