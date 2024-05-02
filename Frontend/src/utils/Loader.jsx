import React from "react";
import "../styles/spinner.css";
import PropTypes from "prop-types";

const CustomLoader = ({ loading = false }) => {
  return loading ? (
    <div className="fixed inset-0 flex justify-center items-center bg-transparent bg-opacity-50 backdrop-blur-sm">
      <div className="spinner"></div>
    </div>
  ) : null;
};

CustomLoader.propTypes = {
  loading: PropTypes.bool,
};
export default CustomLoader;
