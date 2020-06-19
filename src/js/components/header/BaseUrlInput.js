import React, { useState } from "react";
import { UPDATE_BASE_URL } from "../store/reducer";

const BaseUrlInput = ({ url, dispatch }) => {
  console.log(url, "url");
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

export default BaseUrlInput;
