import React, { useState } from "react";
import { UPDATE_BASE_URL } from "../store/reducer";
import PropTypes from "prop-types";

const BaseUrlInput = ({ url, dispatch }) => {
  const [baseUrl, setBaseUrl] = useState(url);
  const handleChange = (event) => {
    setBaseUrl(event.target.value);
  };
  const handleSubmit = () => {
    dispatch({ type: UPDATE_BASE_URL, payload: baseUrl });
  };
  return (
    <div className="base-url-container">
      <button type="submit" onClick={handleSubmit}>
        {" "}
        Update Endpoint
      </button>
      <input
        onChange={handleChange}
        placeholder={url || "Please provide valid graphql endpoint"}
      />
    </div>
  );
};
BaseUrlInput.propTypes = {
  url: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default BaseUrlInput;
