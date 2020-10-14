import React from "react";
import "./Post.css";

const Post = (props) => (
  <div className="post">
    <img src={"http://localhost:3001/img/thumbnails/" + props.image} alt={""} />
    <p>
      {props.text} {props.sold === 1 ? "(sold)" : ""}
    </p>
    <p>{props.dimensions}</p>
  </div>
);

export default Post;
