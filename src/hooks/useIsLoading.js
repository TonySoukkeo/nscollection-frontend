import { useState } from "react";

const useIsLoading = () => {
  const [loading, setLoading] = useState(false);

  const [loadingType, setLoadingType] = useState("");

  return { loading, setLoading, loadingType, setLoadingType };
};

export default useIsLoading;
