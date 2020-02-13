import { useState } from "react";

const errorState = {
  errorMessage: "",
  fieldErr: null
};

const useError = () => {
  const [error, setError] = useState(errorState);
  const { errorMessage, fieldErr } = error;

  return { setError, errorMessage, fieldErr, error };
};

export default useError;
