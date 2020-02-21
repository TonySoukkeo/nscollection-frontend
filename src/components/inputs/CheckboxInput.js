import React from "react";

const CheckboxInput = ({ name, title, value, checked, onChange }) => {
  return (
    <div className="form__group">
      <input
        onChange={onChange}
        checked={checked}
        name={name}
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
