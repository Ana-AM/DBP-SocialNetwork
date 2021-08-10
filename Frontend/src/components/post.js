import React from "react";
// import { Link, Redirect } from "react-router-dom";
// import { Alert, Row, Col, Nav } from "reactstrap";
// import { Button } from 'reactstrap';
import "./styles/post.css";
import ImgPerfil from "../img/perfil.svg";
import ShowFile from "./file";
import { DOMAIN } from "../config/confing";

class Post extends React.Component {
  render() {
    const {  idPost, title, author, id, description, tags, userok, createdAt } = this.props;
  
    return (
      <div class="facebook-thumbnail mt-2 mb-3">
        <div class="facebook-card-pub">
          <div class="facebook-card-head mt-2">
            <img class="facebook-card-user-image" src={ImgPerfil} />
            <a class="facebook-user-name" href={`${DOMAIN}/user/${id}`}>
              {author}
            </a>
          </div>
          <div class="facebook-text">
            <br></br>
            <p class="text-content">{tags}</p>
          </div>

          <div class="facebook-content">
            <div class="facebook-down-post">
              <p class="text-content-down"> {title} </p>
              <p class="text-content-info">{description}</p>
            </div>
            <div className="content-file ms-5 mb-2">
            <ShowFile id={idPost}/>
            </div>
          </div>
          <div class="facebook-reaction-butoms">
            <div class="butom-like mt-3">
              <p class="reactions">
                {userok}
                <a class="mas-info-2" role="button" href="#">
                  <i> Me Gusta</i>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Post;
