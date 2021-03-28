import React from "react";
import "./Navbar.css";

import sig from "../../../img/website-logo.png";

// const top = { top: "-50px" };
const scrolled = { top: "0px" };

export default class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {
      scrollStyle: scrolled,
      menuClicked: false,
    };
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  /**
   * Toggle state's menuClicked.
   */
  handleMenuClick = () => {
    let toggle = !this.state.menuClicked;
    this.setState({ menuClicked: toggle });
  };

  /**
   * Append "active" CSS class to given class list if state's menuClicked is true.
   */
  handleClassName = (name) => {
    return name + (this.state.menuClicked ? " active" : "");
  };

  render() {
    return (
      <nav>
        <ul className={this.handleClassName("menu")}>
          <li className={this.handleClassName("logo")}>
            {" "}
            <a className="logo-link" href="/">
              <img height="45" src={sig} alt="Greg Sherwood Canadian Painter" />
            </a>
          </li>
          <li className={this.handleClassName("toggle")}>
            <button
              onClick={this.handleMenuClick}
              className={this.handleClassName("icon")}
            >
              <div className={this.handleClassName("burger")}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>
          </li>
          <li className={this.handleClassName("menu-item")}>
            <a className={this.handleClassName("item")} href="/gallery">
              Gallery
            </a>
          </li>
          <li className={this.handleClassName("menu-item")}>
            <a className={this.handleClassName("item")} href="/bio">
              Bio
            </a>
          </li>
          <li className={this.handleClassName("menu-item")}>
            <a className={this.handleClassName("item")} href="/contact">
              Contact
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}
