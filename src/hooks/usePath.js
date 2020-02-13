import { useEffect, useContext } from "react";
import { SET_PATH } from "../reducers/constants/PathConstants";
import { DispatchContext } from "../context/StateProvider";

const usePath = () => {
  const { pathDispatch } = useContext(DispatchContext);

  useEffect(() => {
    pathDispatch({ type: SET_PATH, payload: window.location.pathname });
  }, []);
};

export default usePath;
