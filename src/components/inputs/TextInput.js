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
  validField,
  validUsername,
  placeholder,
  value,
  name
}) => {
  return (
    <div className="form__group">
      {label ? (
        <label className="form__label" htmlFor={labelId}>
          {label}
        </label>
      ) : null}

      <input
        value={value}
        placeholder={placeholder}
        onFocus={onFocus}
        autoComplete={autocomplete}
        maxLength={maxLength}
        onBlur={onBlur}
        name={labelId || name}
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

      {/**** display icon visualizing if input is valid or not ****/}
      {validField && focused ? (
        <span className="form__group-validate-icon form__group-validate-icon--valid">
          <i className="fas fa-check-circle"></i>
        </span>
      ) : !validField && focused ? (
        <span className="form__group-validate-icon form__group-validate-icon--invalid">
          <i className="fas fa-times-circle"></i>
        </span>
      ) : null}

      {/*** display any error messages ***/}
      {err && focused ? (
        <span className="form__err form__err--active">{errText}</span>
      ) : focused && validUsername ? (
        <span className="form__success form__success--active">
          {validUsername}
        </span>
      ) : null}
    </div>
  );
};

export default TextInput;
