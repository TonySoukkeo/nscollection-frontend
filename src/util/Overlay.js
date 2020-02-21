import React from "react";

const Overlay = ({ visible, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={visible ? "overlay" : "overlay d-none"}
    ></div>
  );
};

export default Overlay;
