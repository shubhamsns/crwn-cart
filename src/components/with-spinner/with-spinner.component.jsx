import React from "react";
import Spinner from "../spinner/spinner.component";

const WithSpinner = (WrapperComponent) => {
  const LocalSpinner = ({ isLoading, ...otherProps }) => {
    return isLoading ? <Spinner /> : <WrapperComponent {...otherProps} />;
  };
  return LocalSpinner;
};

export default WithSpinner;
