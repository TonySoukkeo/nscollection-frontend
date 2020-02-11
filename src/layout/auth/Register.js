import React, { useEffect } from "react";

// Components
import SubNavigation from "../../components/navigation/SubNavigation";

const Register = () => {
  useEffect(() => {
    console.log("Component Mounted");
  });
  return (
    <React.Fragment>
      <SubNavigation title="Register" />

      <section className="register">
        <form className="form">
          <div className="form__group">
            <label className="form__label" htmlFor="firstName">
              First Name
            </label>
            <input type="text" id="firstName" className="form__input" />
          </div>

          <div className="form__group">
            <label className="form__label" htmlFor="lastName">
              Last Name
            </label>
            <input type="text" id="lastName" className="form__input" />
          </div>

          <div className="form__group">
            <label className="form__label" htmlFor="email">
              Email
            </label>
            <input type="email" id="email" className="form__input" />
          </div>

          <div className="form__group">
            <label className="form__label" htmlFor="password">
              Password
            </label>
            <input type="password" id="password" className="form__input" />
          </div>

          <div className="form__group">
            <label className="form__label" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input type="text" id="confirmPassword" className="form__input" />
          </div>
        </form>
      </section>
    </React.Fragment>
  );
};

export default Register;
