import React, { useState, useEffect } from "react";
// import { Link, Redirect } from "react-router-dom";
import { Button } from "reactstrap";
// import { Button } from 'reactstrap';
import "./styles/post.css";
import ImgPerfil from "../img/perfil.svg";
import ShowFile from "./file";
import { DOMAIN } from "../config/confing";
import { apigetDataLike, apigetLikes, apipostStatusLike } from "../functions/consultasAPI";

const Post = (props) => {
  const { idPost, title, author, id, description, tags, createdAt } = props;

  const [statuslike, setstatusLike] = useState([]);
  const [likes, setLikes] = useState([]);

  const dataLike = () => {
    apigetDataLike(id, idPost).then((data) => {
      setstatusLike(data);
    });
  };

  const changeLike = () => {
    apipostStatusLike(id, idPost).then((data) => {
      setstatusLike(data);
    });
  };

  const cantLikes = () => {
    apigetLikes(idPost).then((data) => {
      let c=0;
      console.log(data)
      data.forEach((a) => {
        c=c+1;
      })
      setLikes(c);
    });
  };

  useEffect(() => {
    dataLike();
    cantLikes();
  }, []);

  const buttonValue = (a) => {
    if (a) {
      return "Ya no me gusta";
    } else {
      return "Me gusta";
    }
  };

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
            <ShowFile id={idPost} />
          </div>
        </div>
        <div class="facebook-reaction-butoms">
          <div class="butom-like mt-3">
            <p class="reactions">
              {likes}
              <a class="mas-info-2" role="button" onClick={changeLike}>
                {buttonValue(statuslike)}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
