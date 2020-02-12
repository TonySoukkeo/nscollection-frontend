import React from "react";

const RadioInput = ({
  labelFor,
  name,
  text,
  type,
  value,
  onClick,
  checked
}) => {
  return (
    <React.Fragment>
      <input
        type={type}
        checked
        id={labelFor}
        name={name}
        value={value}
        className="form__radio-input"
      />

      <label
        onClick={() => onClick(value)}
        className="form__radio-label"
        htmlFor={labelFor}
      >
        <span>{text}</span>
      </label>
    </React.Fragment>
  );
};

export default RadioInput;
