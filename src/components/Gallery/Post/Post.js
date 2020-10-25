import React from "react";

import "./Post.css";

import config from "../../../config.json";
import Spinner from "../../../components/UI/Spinner/Spinner";

// const scrollToRef = (ref) => window.scrollTo({
//       top: ref.current.offsetTop,
//       left: 0,
//       behavior: "smooth",
//   });

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
    this.imgRef = React.createRef();
  }

  componentDidMount() {
    //           window.scrollTo({
    //       top: 0,
    //       left: 0,
    //       behavior: "smooth",
    //   });
    //       scrollToRef(this.imgRef);
  }

  componentDidUpdate() {
    //         window.scrollTo({
    //       top: 0,
    //       left: 0,
    //       behavior: "smooth",
    //     });
    //       scrollToRef(this.imgRef);
  }

  onLoad() {
    // TODO: scrolling will not work on firefox on repeat requests due to caching. must be some fix
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    this.setState({ loaded: true });
  }

  render() {
    console.log(this.state.loaded);
    let imgClass = this.state.loaded ? "img-loaded" : "img-loading";
    let cardClass = this.state.loaded ? "card loaded" : "card loading";
    let backClass = this.state.loaded ? "back loaded" : "back loading";
    return (
      <div className="post-container">
        {this.state.loaded ? (
          ""
        ) : (
          <div className="spinner">
            <Spinner />
          </div>
        )}
        <div
          ref={this.imgRef}
          onClick={() => this.props.destroy()}
          className={backClass}
        >
          &#9666; Back To Gallery
        </div>
        <img
          className={imgClass}
          onLoad={() => this.onLoad()}
          src={config.server + "img/" + this.props.img}
          alt=""
        />
        <div className={cardClass}>
          <div className="title">
            <i>{'"' + this.props.title + '"'}</i>
          </div>
          <p>{this.props.meta}</p>
          <p>{this.props.dimensions}</p>
          <p>${this.props.price}</p>
        </div>
      </div>
    );
  }
}
