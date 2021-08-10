import {API} from "../config/confing";

export const signin = user => {
  console.log(API)
  return fetch(`${API}/u/signin`, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    })
};

export const authenticate = (data, next) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('jwt', JSON.stringify(data));
    next();
  }
}

export const isAuthenticated = () => {
  if(typeof window == 'undefined') {
    return false;
  }
  if (localStorage.getItem('jwt')) {
    if (JSON.parse(localStorage.getItem('jwt')).domain === 'EPCC') {
      return JSON.parse(localStorage.getItem('jwt'));
      // return localStorage.getItem('jwt')
    }
    return false;
  }
    return false;
}

//register

export const signup = user => {
  return fetch(`${API}/u/signup`, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    })
};