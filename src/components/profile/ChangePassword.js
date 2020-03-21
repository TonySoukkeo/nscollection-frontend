import React from "react";

// Components
import TextInput from "../../components/inputs/TextInput";

const ChangePassword = ({ onChange, password, confirmPassword }) => {
  return (
    <React.Fragment>
      <h3 className="mb-sm">Change Password</h3>

      <TextInput
        label="New Password"
        labelId="password"
        type="password"
        value={password.value}
        onChange={onChange}
        name="password"
        focused={password.focused}
        err={password.value.length < 10}
        errText="Password must be at least 10 characters long"
        validField={password.value.length > 9}
      />

      <TextInput
        label="Confirm Password"
        labelId="confirmPassword"
        value={confirmPassword.value}
        type="password"
        onChange={onChange}
        name="confirmPassword"
        focused={confirmPassword.focused}
        err={password.value !== confirmPassword.value}
        errText="Passwords do not match"
        validField={
          password.value === confirmPassword.value && password.value !== ""
        }
      />
    </React.Fragment>
  );
};

export default ChangePassword;
