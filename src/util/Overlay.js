import React from "react";

const Overlay = ({ visible }) => {
  return <div className={visible ? "overlay" : "overlay d-none"}></div>;
};

export default Overlay;
