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

    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = (e) => {
    //if (path === "/") {
    //     if (window.scrollY < 50) {
    //       this.setState({ scrollStyle: scrolled });
    //     } else if (window.scrollY > 50) {
    //       this.setState({ scrollStyle: top });
    //     }
    //}
  };

  handleMenuClick = () => {
    let toggle = !this.state.menuClicked;
    this.setState({ menuClicked: toggle });
  };

  handleClassName = (name) => {
    return name + (this.state.menuClicked ? " active" : "");
  };

  //   <img src={sig} alt=""/>
  render() {
    return (
      <nav>
        <ul className={this.handleClassName("menu")}>
          <li className={this.handleClassName("logo")}>
            {" "}
            <a href="/">
              <img height="45" src={sig} alt="" />
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

          <a className={this.handleClassName("item")} href="/gallery">
            Gallery
          </a>
          <a className={this.handleClassName("item")} href="/bio">
            Bio
          </a>
          <a className={this.handleClassName("item")} href="/contact">
            Contact
          </a>
        </ul>
      </nav>
    );
  }
}
