import React from "react";
import { Alert, Row, Col } from "reactstrap";
import "./styles/contact.css";

import mail from "../img/mail.svg";
import fb from "../img/fb.svg";
import github from "../img/github.svg";

const Contact = (props) => {
  return (
    <div class="card">
      <div>
        <img className="picture" src={props.img} alt="img-portada" />
      </div>

      <div class="container-date">
        <h4>
          <b>{props.name}</b>
        </h4>
        <p>{props.area}</p>
        <p>{props.description}</p>
      </div>
      
      <div class="container-aux">
        <img className="aux" src={mail} alt="Mail" />
        <img className="aux" src={fb} alt="fb" />
        <img className="aux" src={github} alt="github" />
      </div>
    </div>
  );
};

export default Contact;
