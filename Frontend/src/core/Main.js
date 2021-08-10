import React, { useState, useEffect } from "react";
import { signin, authenticate, isAuthenticated } from "./apiCore";
import { Alert, Button, Row, Col, Nav } from "reactstrap";
import "./styles/general.css";
import NavBar from "../components/nav-bar";
import SearchBar from "../components/search-bar";
import Post from "../components/post";
import Trending from "../components/trending";
import Auth from "../functions/auth";
import { apigetPublications } from "../functions/consultasAPI";

const Main = (req, res) => {
  const [post, setPost] = useState([]);

  const posts = () => {
    apigetPublications().then((data) => {
      let a = data;
      setPost(a);
    });
  };

  useEffect(() => {
    posts();
  }, []);

  const cards = () => {
    let postcards;
    postcards = [];
    post.forEach((a) => {
      console.log(a);
      let e = `${a.author.names} ${a.author.surnames}`;
      let i = "";
      a.labels.forEach((u) => {
        i = `${i} ${u}`;
      });
      let ok = 0;
      a.likes.forEach((oki) => {
        ok = ok + 1;
      });
      let o = (
        <Post
          id={a.author._id}
          idPost={a._id}
          title={a.title}
          description={a.description}
          author={e}
          tags={i}
          userok={ok}
        />
      );
      console.log(o);
      postcards.push(o);
    });
    console.log(postcards);
    return postcards;
  };

  return (
    <div>
      <Auth />
      <Row className="all-container">
        <Col>
          <Row>
            <SearchBar />
          </Row>
        </Col>
        <Row className="ms-5 mt-5">
          <Col className="mt-5 ms-5">
            <Button
              className="margin-sides-20px center button-newpost mt-2 mb-2"
              href="http://localhost:3000/profile/newpost"
            >
              Crear nueva publicación
            </Button>
            {cards()}
          </Col>
          <Col className="mt-1">
            <Trending />
          </Col>
        </Row>
      </Row>
    </div>
  );
};

export default Main;
