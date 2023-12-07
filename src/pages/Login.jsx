import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <div>Login</div>
      <span>Si no tiene una cuenta, inscribace a un curso</span>
      <Link to={"/"}>
        <button>Volver al inicio</button>
      </Link>
    </>
  );
};

export default Login;
