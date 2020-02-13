import React from "react";
import { Link } from "react-router-dom";

// Components
import TextInput from "../../components/inputs/TextInput";
import RadioInput from "../../components/inputs/RadioInput";
import Loading from "../../components/loading/Loading";

const RegisterForm = ({
  validUsername,
  onChange,
  fieldErr,
  userName,
  firstName,
  lastName,
  email,
  validEmail,
  password,
  confirmPassword,
  setAllowEmail,
  btnDisable,
  submitRegister,
  isLoading
}) => {
  return (
    <form autoComplete="off" onSubmit={submitRegister} className="form">
      <TextInput
        validUsername={validUsername}
        focused={userName.focused}
        label="Username"
        labelId="userName"
        type="text"
        name="userName"
        onChange={onChange}
        maxLength="15"
        err={fieldErr && fieldErr.field === "userName"}
        errText={fieldErr && fieldErr.message}
        validField={validUsername}
      />

      <TextInput
        focused={firstName.focused}
        label="First Name"
        labelId="firstName"
        type="text"
        onChange={onChange}
        err={firstName.value.length < 2}
        errText="First name is too short"
        validField={firstName.value.length > 1}
      />

      <TextInput
        focused={lastName.focused}
        label="Last Name"
        labelId="lastName"
        type="text"
        onChange={onChange}
        err={lastName.value.length < 2}
        errText="Last name is too short"
        validField={lastName.value.length > 1}
      />

      <TextInput
        focused={email.focused}
        label="Email"
        labelId="email"
        type="email"
        err={!validEmail}
        errText="Enter a valid email"
        onChange={onChange}
        validField={validEmail}
      />

      <TextInput
        focused={password.focused}
        label="Password"
        labelId="password"
        type="password"
        err={password.value.length < 10}
        errText="Password must be at least 10 characters long"
        onChange={onChange}
        validField={password.value.length > 9}
      />

      <TextInput
        focused={confirmPassword.focused}
        label="Confirm Password"
        labelId="confirmPassword"
        type="password"
        err={password.value !== confirmPassword.value}
        errText="Passwords do not match"
        onChange={onChange}
        validField={
          password.value === confirmPassword.value && password.value.length > 9
        }
      />

      <h2 className="mb-sm mt-md">
        Would you like to recieve email notifications when your games goes on
        sale?
      </h2>

      <div className="form__group d-flex">
        <RadioInput
          labelFor="optIn"
          name="allowEmail"
          text="Yes"
          value={true}
          type="radio"
          onClick={setAllowEmail}
        />

        <RadioInput
          labelFor="optOut"
          name="allowEmail"
          text="No"
          value={false}
          type="radio"
          onClick={setAllowEmail}
        />
      </div>

      <div className="form__actions mt-md">
        <Link to="/login">Already have an account? Login here.</Link>

        {isLoading ? (
          <Loading styles={{ width: "10%" }} />
        ) : (
          <button
            disabled={btnDisable}
            className={
              btnDisable
                ? "btn btn--register btn--disabled"
                : "btn btn--register"
            }
            type="submit"
          >
            Register
          </button>
        )}
      </div>
    </form>
  );
};

export default RegisterForm;
