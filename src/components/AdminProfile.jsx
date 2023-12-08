import PropTypes from "prop-types";

const AdminProfile = ({ data }) => {
    console.log(data)
  return <div></div>;
};

AdminProfile.propTypes = {
  data: PropTypes.array.isRequired,
};

export default AdminProfile;
