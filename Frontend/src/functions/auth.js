import React from "react";
import { Redirect } from 'react-router-dom';
  
const Auth = () => {

  const isAuthenticated = () => {
    if(typeof window == 'undefined') {
      return false;
  }
  if (localStorage.getItem('jwt')) {
    return JSON.parse(localStorage.getItem('jwt'));
  }
    return false;
  }

  const redirectUser = () => {
    if(!isAuthenticated()) {
      return <Redirect to="/signin" />
    }
  }

  return (
    <div>
      {redirectUser()}
    </div>
  );
};

export default Auth;