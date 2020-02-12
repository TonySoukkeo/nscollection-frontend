import React from "react";

const TextInput = ({
  label,
  labelId,
  type,
  err = false,
  errText,
  onChange,
  onBlur,
  maxLength,
  autocomplete,
  onFocus,
  focused,
  validField
}) => {
  return (
    <div className="form__group">
      <label className="form__label" htmlFor={labelId}>
        {label}
      </label>
      <input
        onFocus={onFocus}
        autoComplete={autocomplete}
        maxLength={maxLength}
        onBlur={onBlur}
        name={labelId}
        onChange={onChange}
        type={type}
        id={labelId}
        className={
          focused && !validField
            ? "form__input form__input--invalid"
            : focused && validField
            ? "form__input form__input--valid"
            : "form__input"
        }
      />
      {err && focused ? (
        <span className="form__err form__err--active">{errText}</span>
      ) : null}
    </div>
  );
};

export default TextInput;
