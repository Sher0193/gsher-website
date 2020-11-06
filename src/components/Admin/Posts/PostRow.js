import React from "react";

import config from "../../../config.json";

const PostRow = (props) => (
  <tr>
    <td>{props.postId}</td>
    <td>{props.postName}</td>
    <td>
      <img
        height="75"
        src={config.server + "img/thumbnails/" + props.image}
        alt=""
      />
    </td>
    <td>
      <a className="button" href={"/admin/posts/edit?post=" + props.postId}>
        Edit
      </a>
    </td>
    <td>
      <button onClick={props.handleClick}>Delete</button>
    </td>
    <td>
      <button
        className={
          props.featured === 1 ? "unfeature-btn fbtn" : "feature-btn fbtn"
        }
        onClick={props.handleFeature}
      >
        {props.featured === 1 ? "Unfeature" : "Feature"}
      </button>
    </td>
  </tr>
);

export default PostRow;
