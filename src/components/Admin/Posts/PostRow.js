import React from "react";

import config from "../../../config.json";

const PostRow = (props) => (
  <tr className={props.index % 2 === 0 ? "tableRowOdd" : ""}>
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
      <a
        className="warning-btn fbtn"
        href={"/admin/posts/edit?post=" + props.postId}
      >
        Edit
      </a>
    </td>
    <td>
      <div className="danger-btn fbtn" onClick={props.handleClick}>
        Delete
      </div>
    </td>
    <td>
      <div
        className={props.featured === 1 ? "danger-btn fbtn" : "okay-btn fbtn"}
        onClick={props.handleFeature}
      >
        {props.featured === 1 ? "Unfeature" : "Feature"}
      </div>
    </td>
  </tr>
);

export default PostRow;
