import React from "react";
import "./Home.css";

// import image1 from "../../img/asters-1.jpg";
// import image2 from "../../img/plum-1.jpg";
// import image3 from "../../img/apple-1.jpg";
// import image4 from "../../img/winter-1.jpg";

import Slider from "../../components/Slider/Slider";
import Spinner from "../../components/UI/Spinner/Spinner";
import About from "../../components/Home/About/About";
import Statement from "../../components/Home/Statement/Statement";
import { featuredImages } from "../../utils/Api";
import config from "../../config.json";

// const images = [image1, image2, image3, image4];

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      imgData: null,
    };
  }
  componentDidMount() {
    this.update();
  }

  componentDidUpdate() {
    this.update();
  }

  update() {
    if (this.state.imgData === null) {
      this.apiImages();
    }
  }

  async apiImages() {
    let imgData = [];
    let result = await featuredImages();
    if (result && result.success) {
      for (let i = 0; i < result.data.length; i++) {
        imgData.push(config.server + "img/" + result.data[i].link);
      }
    }
    this.setState({
      imgData: imgData,
    });
  }
  //
  render() {
    if (this.state.imgData) {
      return (
        <div className="App">
          <div className="home">
            <div className="bgimg-1">
              <div className="caption">
                <span className="border">Greg Sherwood</span>
              </div>
              <Slider slides={this.state.imgData} autoPlay={10} />
            </div>
          </div>
          <About />
          <div className="bgimg-2"></div>
          <Statement />
        </div>
      );
    } else {
      return (
        <div className="load-container">
          <div className="spinner">
            <Spinner />
          </div>
        </div>
      );
    }
  }
}
