import React from "react";

import "./Post.css";

import config from "../../../config.json";
import Spinner from "../../../components/UI/Spinner/Spinner";

import leftArrow from "../../../img/left-arrow.svg";
import rightArrow from "../../../img/right-arrow.svg";

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

  async next() {
    this.setState({ loaded: false }, () => {
      if (!this.props.nextImg()) this.setState({ loaded: true });
    });
  }

  async prev() {
    this.setState({ loaded: false }, () => {
      if (!this.props.prevImg()) this.setState({ loaded: true });
    });
  }

  onLoad() {
    // TODO: scrolling will not work on firefox on repeat requests due to caching. must be some fix
    window.scrollTo({
      top: 134,
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
    let arrowClass = this.state.loaded ? "arrow loaded" : "arrow loading";
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
        <div className="img-container">
          <div
            onClick={() => this.prev()}
            className={this.props.prevActive() ? arrowClass : "arrow-hide"}
          >
            <img src={leftArrow} alt="" />
          </div>
          <div className="main-img-container">
            <img
              className={imgClass}
              onLoad={() => this.onLoad()}
              src={config.server + "img/" + this.props.img}
              alt=""
            />
          </div>
          <div
            onClick={() => this.next()}
            className={this.props.nextActive() ? arrowClass : "arrow-hide"}
          >
            <img src={rightArrow} alt="" />
          </div>
        </div>
        <div className={cardClass}>
          <div className="title">
            <i>{'"' + this.props.title + '"'}</i>
          </div>
          <p>{this.props.meta}</p>
          <p>{this.props.dimensions}</p>
          {this.props.sold ? (
            <p>
              <b>
                <i>SOLD</i>
              </b>
            </p>
          ) : (
            <p>${this.props.price}</p>
          )}
        </div>
      </div>
    );
  }
}
