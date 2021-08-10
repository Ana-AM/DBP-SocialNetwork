const API = "http://localhost:5000/api";

export default API;
export const DOM = () =>{
  return "http://localhost:3000";
} 

export const apigetPublications = () => {
  return fetch(`${API}/p/list`, {
    method: "get",
    headers: {
      "Content-Type": "application/json"
    },
  })
    .then(response => {
      return response.json()
    })
    .catch(err => {
      console.log(err);
    })
}

export const apigetPublicationsByUser = (id) => {
  return fetch(`${API}/p/postsbyuser/${id}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json"
    },
  })
    .then(response => {
      return response.json()
    })
    .catch(err => {
      console.log(err);
    })
}

export const apigetDataFollow = (id, Userid) => {
  return fetch(`${API}/u/follow/check`, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({id,Userid})
  })
    .then(response => {
      return response.json()
    })
    .catch(err => {
      console.log(err);
    })
}


export const apicheckFile = (id) => {
  return fetch(`${API}/p/file/check/${id}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json"
    },
  })
    .then(response => {
      return response.json()
    })
    .catch(err => {
      console.log(err);
    })
}

export const apipostStatusFollow = (id, Userid) => {
  return fetch(`${API}/u/follow/modify`, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({id,Userid})
  })
    .then(response => {
      return response.json()
    })
    .catch(err => {
      console.log(err);
    })
}

export const apimodifyUser = (object) => {
  return fetch(`${API}/u/modify`, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(object)
  })
    .then(response => {
      return response.json()
    })
    .catch(err => {
      console.log(err);
    })
}

export const apicreatePost = (object) => {
  return fetch(`${API}/p/create`, {
    method: "POST",
    headers: {
      Accept: 'application/json',
    },
    body: object
  })
    .then(response => {
      return response.json()
    })
    .catch(err => {
      console.log(err);
    })
}

export const apigetDataUser = (id) => {
  return fetch(`${API}/u/data/${id}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json"
    },
  })
    .then(response => {
      return response.json()
    })
    .catch(err => {
      console.log(err);
    })
}

export const apigetPostSearched = (object) => {
  return fetch(`${API}/p/search`, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(object)
  })
    .then(response => {
      return response.json()
    })
    .catch(err => {
      console.log(err);
    })
}