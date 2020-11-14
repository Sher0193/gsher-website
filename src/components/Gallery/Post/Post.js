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

  generateVendor(vendor) {
    if (!vendor) {
      return "";
    }
    if (vendor.vendor_link) {
      return (
        <div className="vendor">
          <p>
            Available from{" "}
            <i>
              <a href={vendor.vendor_link}>{vendor.vendor_name}</a>
            </i>
            <b>{vendor.vendor_phone ? " (" + vendor.vendor_phone + ")" : ""}</b>
          </p>
        </div>
      );
    } else {
      return (
        <div className="vendor">
          <p>
            Available from <i>{vendor.vendor_name}</i>{" "}
            <b>{vendor.vendor_phone ? " (" + vendor.vendor_phone + ")" : ""}</b>
          </p>
        </div>
      );
    }
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
    this.setState({ loaded: true });
  }

  render() {
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
          Back To Gallery
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
          <div className="title-container">
            <div className="title">{'"' + this.props.title + '"'}</div>
            <p>{this.props.meta}</p>
            <p>{this.props.dimensions}</p>
            {this.props.sold ? (
              <p
                style={{
                  color: "red",
                  fontStyle: "italic",
                  fontWeight: "bold",
                }}
              >
                SOLD
              </p>
            ) : (
              <p>${this.props.price}</p>
            )}
            {this.generateVendor(this.props.vendor)}
          </div>
        </div>
      </div>
    );
  }
}
