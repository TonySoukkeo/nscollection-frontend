import { useState } from "react";

const useIsLoading = () => {
  const [loading, setLoading] = useState(false);

  return { loading, setLoading };
};

export default useIsLoading;
