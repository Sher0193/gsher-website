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
    console.log("fuck");
  };

  //   <img src={sig} alt=""/>
  render() {
    let linksClass = this.state.menuClicked ? "right responsive" : "right";
    let iconClass = this.state.menuClicked ? "icon responsive" : "icon";
    let ddClass = this.state.menuClicked ? "dropdown" : "none";
    console.log(linksClass);
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
          <button className={iconClass} onClick={this.handleMenuClick}>
            Menu
          </button>
          <div className={ddClass}>
                      <a className={linksClass} href="/gallery">
              Gallery
            </a>
                        <a className={linksClass} href="/bio">
              Bio
            </a>
                      <a className={linksClass} href="/contact">
              Contact
            </a>

          </div>
        </div>
      </div>
    );
  }
}
export default Navbar;
