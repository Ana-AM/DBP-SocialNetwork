import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Row, Col } from "reactstrap";
import "./styles/general.css";
import NavBar from "../components/nav-bar";
import SearchBar from "../components/search-bar";
import Post from "../components/post";
import Auth from "../functions/auth";
import { apigetPublicationsByUser } from "../functions/consultasAPI";
import ProfileInfU from "../components/profileUser";

function User() {
  
  let { Userid } = useParams();
  const id = JSON.parse(localStorage.getItem('jwt')).user._id;

  const [post, setPost] = useState([]);

  const posts = () => {
    apigetPublicationsByUser(Userid).then((data) => {
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
          idPost={a._id}
          title={a.title}
          description={a.description}
          author={e}
          tags={i}
          userok={ok}
        />
      );
      postcards.push(o);
    });
    return postcards;
  };

  const nposts = () => {
    let n = 0;
    post.forEach((a) => {
      n = n + 1;
    });
    return n;
  };

  return (
    <div>
      <Auth />
      <Row className="all-container">
        <ProfileInfU
          Userid={Userid}
        />
        <Col className="section-main">
          <Row>
              <SearchBar
                space="yes"
              />
          </Row>
          <Row className="mt-4"></Row>
          <Col className="section-main">
          <Row className="mt-5">
            <Col className="me-2 ms-2">
              <NavBar
                select="U"
                n={nposts()}
              />
            </Col>
          </Row>
          <Row>
            {cards()}
          </Row>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default User;
