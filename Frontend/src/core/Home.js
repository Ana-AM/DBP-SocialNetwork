import React, { useState } from "react";
import { Alert, Row, Col } from "reactstrap";
import { Redirect } from "react-router-dom";
import "./styles/Login.css";
import "./styles/general.css";
import Header from "../components/header";
import Contact from "../components/contact";
import home from "../img/home.svg";

const Home = (req, res) => {
  return (
    <div>
      <Header />
      <Row className="section-start">
        <Col className="ms-5 mt-5">
          <img className="imagen" src={home} alt="img-portada" />
        </Col>
        <Col className="mt-35">
          <h1 className="title1">Red Social</h1>
          <h1 className="title2">UNSA</h1>
        </Col>
      </Row>

      <Row>
        <Col className="ms-5 mt-5" className="section-description">
          <h1 className="section-title">Descripción</h1>
          <p className="parraf">
            Esta Red Social fue diseñada con el objetivo de instruir conceptos
            fundamentales relacionados a la metodología de trabajo agil. Fue
            desarrollado por un grupo de cinco estudiantes para la carrera
            profesional de Ciencia de la Computación.{" "}
          </p>

          <p className="parraf">
            La Red Social fue creada con el objetivo de facilitar los articulos
            relacionados con nuestra carrera, con el fin de promover la
            investigación y tener un lugar donde poder encontrar información
            referenciable en proyectos de investigación.{" "}
          </p>
        </Col>
      </Row>

      <Row>
        <h1 className="section-title">Contacto</h1>
        <Col className="mt-5">
          <Contact img={home} name="Juan Manuel Soto" area="Suport" />
        </Col>
        <Col className="mt-5">
          <Contact img={home} name="Julio Enrique Yauri" area="Suport" />
        </Col>
        <Col className="mt-5">
          <Contact img={home} name="Juan Carlos Postigo" area="Suport" />
        </Col>
      </Row>

      <Row className="mb-5">
        <Col className="mt-5">
          <Contact img={home} name="Samuel Chambi Ytusaca" area="Suport" />
        </Col>
        <Col className="mt-5">
          <Contact img={home} name="Alejandro Villa" area="Suport" />
        </Col>
        <Col className="mt-5"></Col>
      </Row>
    </div>
  );
};

export default Home;
