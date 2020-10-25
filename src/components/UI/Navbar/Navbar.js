import React from "react";
import "./Navbar.css";

import sig from "../../../img/website-logo.png";

// const top = { top: "-50px" };
const scrolled = { top: "0px" };

class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {
      scrollStyle: scrolled,
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

  //   <img src={sig} alt=""/>
  render() {
    return (
      <div
        className="navbar"
        onScroll={this.handleScroll}
        style={this.state.scrollStyle}
      >
        <a href="/">
          <img height="65" src={sig} alt="" />
        </a>
        <div className="links">
          <a className="right" href="/bio">
            Bio
          </a>
          <a className="right" href="/contact">
            Contact
          </a>
          <a className="right" href="/gallery">
            Gallery
          </a>
          <button className="icon" onclick="myFunction()">
            Menu
          </button>
        </div>
      </div>
    );
  }
}
export default Navbar;
