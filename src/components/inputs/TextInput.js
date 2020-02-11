import React from "react";

const TextInput = ({
  label,
  labelId,
  type,
  err = false,
  errText,
  onChange
}) => {
  return (
    <div className="form__group">
      <label className="form__label" htmlFor={labelId}>
        {label}
      </label>
      <input
        name={labelId}
        onChange={onChange}
        type={type}
        id={labelId}
        className="form__input"
      />
      {err ? <span className="form__err">{errText}</span> : null}
    </div>
  );
};

export default TextInput;
