import React from "react";
import "./GridElement.css";

import config from "../../../config.json";

export default class GridElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }
  render() {
    let divClass = this.state.loaded
      ? "post post-loaded"
      : "post post-unloaded";
    return (
      <div className={divClass} onClick={() => this.props.handleClick()}>
        <div className="text-container">
         <div className={this.props.sold ? "persistent-badge" : "no-display"}>SOLD</div>
          <h1>{this.props.text} </h1>
          <p>
            {this.props.dimensions}, {this.props.meta}
          </p>
          {this.props.sold ? (
            <span className="badge">SOLD</span>
          ) : (
            <p>${this.props.price}</p>
          )}
        </div>
        <img
          onLoad={() => this.setState({ loaded: true })}
          src={config.server + "img/thumbnails/" + this.props.image}
          alt={""}
        ></img>
      </div>
    );
  }
}
