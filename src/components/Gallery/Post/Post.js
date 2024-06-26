import React from "react";

import "./Post.css";
import config from "../../../config.json";

import Spinner from "../../../components/UI/Spinner/Spinner";
import leftArrow from "../../../img/left-arrow.svg";
import rightArrow from "../../../img/right-arrow.svg";

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
    this.imgRef = React.createRef();
  }

  /**
   * Generate block for vendor information.
   */
  generateVendor(vendor) {
    if (!vendor || this.props.sold) {
      return "";
    }
    if (vendor.vendor_link) {
      return (
        <div className="vendor">
          <p>
            Available from{" "}
            <i>
              <a
                href={vendor.vendor_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {vendor.vendor_name}
              </a>
            </i>
            <br></br>
            <p className="phone">
              {vendor.vendor_phone ? " " + vendor.vendor_phone + "" : ""}
            </p>
          </p>
        </div>
      );
    } else {
      return (
        <div className="vendor">
          <p>
            Available from <i>{vendor.vendor_name}</i> <br></br>
            <p className="phone">
              {vendor.vendor_phone ? " " + vendor.vendor_phone + "" : ""}
            </p>
          </p>
        </div>
      );
    }
  }

  /**
   * Attempt to go to next image and track loading.
   */
  async next() {
    this.setState({ loaded: false }, () => {
      if (!this.props.nextImg()) this.setState({ loaded: true });
    });
  }

  /**
   * Attempt to go to previous image and track loading.
   */
  async prev() {
    this.setState({ loaded: false }, () => {
      if (!this.props.prevImg()) this.setState({ loaded: true });
    });
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
              onLoad={() => this.setState({ loaded: true })}
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
            <h1 className="title">{'"' + this.props.title + '"'}</h1>
            <p>{this.props.meta}</p>
            <p>{this.props.dimensions}</p>
            <div className="card-details">
              {this.props.sold ? (
                <p
                  style={{
                    color: "#eb0000",
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
      </div>
    );
  }
}
