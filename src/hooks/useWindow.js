import { useState, useEffect } from "react";

const useWindow = () => {
  const [width, setWidth] = useState("");

  useEffect(() => {
    window.addEventListener("resize", updateWindowDimensions());

    // Cleanup
    return () => window.removeEventListener("resize", updateWindowDimensions());
  });

  const updateWindowDimensions = () => {
    setWidth(window.innerWidth);
  };

  return [width];
};

export default useWindow;
