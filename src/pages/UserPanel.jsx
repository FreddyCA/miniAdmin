import { Link } from "react-router-dom";

const UserPanel = () => {
  return (
    <>
      <div>UserPanel</div>

      <Link to={"/"}>
        <button>Volver al Inicio</button>
      </Link>
    </>
  );
};

export default UserPanel;
