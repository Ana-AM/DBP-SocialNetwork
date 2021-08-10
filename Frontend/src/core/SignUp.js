import React, { useState } from "react";
import Body from "../components/signUp";
import { signin, signup, isAuthenticated, authenticate } from "./apiCore";
import { Redirect } from "react-router-dom";
import "./styles/Login.css";

const Login = (req, res) => {
  const [values, setValues] = useState({
    names: "",
    surnames: "",
    email: "",
    password: "",
    redirectToReferrer: false,
  });

  const { names, surnames, email, password, redirectToReferrer } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signup({ names, surnames, email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        signin({ email, password }).then((data) => {
          if (data.error) {
            setValues({ ...values, error: data.error, loading: false });
          } else {
            authenticate(data, () => {
              setValues({
                ...values,
                redirectToReferrer: true,
              });
            });
          }
        });
      }
    });
  };

  const redirectUser = () => {
    if (redirectToReferrer) {
      return <Redirect to={`/main/`} />;
    }
    if (isAuthenticated()) {
      return <Redirect to={`/main/`} />;
    }
  };

  return (
    <div>
      <div className="body">
        {redirectUser()}
        <Body
          onClick={clickSubmit}
          onChangeEmail={handleChange("email")}
          onChangePassword={handleChange("password")}
          onChangeNames={handleChange("names")}
          onChangeSurnames={handleChange("surnames")}
          email={email}
          password={password}
          names={names}
          surnames={surnames}
        />
      </div>
    </div>
  );
};

export default Login;
