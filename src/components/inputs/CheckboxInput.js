import React from "react";

const CheckboxInput = ({ name, title, value }) => {
  return (
    <div className="form__group">
      <input
        value={value}
        className="form__checkbox-input"
        id={name}
        type="checkbox"
      />
      <label className="form__checkbox-label" htmlFor={name}>
        {title}

        <span></span>
      </label>
    </div>
  );
};

export default CheckboxInput;
