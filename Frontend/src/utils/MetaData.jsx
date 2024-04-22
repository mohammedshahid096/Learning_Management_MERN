import React from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";

const MetaData = ({ title }) => {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};

MetaData.propTypes = {
  title: PropTypes.string.isRequired,
};

export default MetaData;
