import React from "react";

import Spinner from "../spinner/spinner.component";

const WithSpinner = (WrapperComponent) => {
  const Spinner = ({ isLoading, ...otherProps }) => {
    return isLoading ? <Spinner /> : <WrapperComponent {...otherProps} />;
  };
  return Spinner;
};

export default WithSpinner;
