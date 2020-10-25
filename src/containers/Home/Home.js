import React from "react";
import "./Home.css";

// import image1 from "../../img/asters-1.jpg";
// import image2 from "../../img/plum-1.jpg";
// import image3 from "../../img/apple-1.jpg";
// import image4 from "../../img/winter-1.jpg";

import Slider from "../../components/Slider/Slider";
import Spinner from "../../components/UI/Spinner/Spinner";
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
        imgData.push(config.server + "img/featured/" + result.data[i]);
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
          <div className="text-break">
            <h3 style={{ textAlign: "center" }}>About</h3>
            <p>
              Greg Sherwood began creating art in high school and has fond
              memories of bringing his sketchbooks and art materials along with
              him on canoe trips with his father.
            </p>

            <p>
              Greg attended the University of Western Ontario in London where he
              first studied geology and received his Bachelor degree. He
              returned to Western to study art and received his Honours Bachelor
              of Fine Arts and later his Bachelor of Education from Althouse
              College.
            </p>

            <p>
              Greg’s interest in science has shaped his life as an artist. He
              continues to explore his fascination with the natural world,
              documenting the processes and forces that shape our environment in
              his oil paintings and mixed media work.
            </p>

            <p>
              Greg worked as a painter and educator in Huron County for 28
              years. He currently lives and works as a full time artist in
              London, Ontario with his wife and has two adult sons.
            </p>

            <p>
              His paintings are in collections throughout Canada and the US.
            </p>
          </div>
          <div className="bgimg-2"></div>
          <div className="text-break">
            <h3 style={{ textAlign: "center" }}>Artist Statement</h3>
            <p>
              I endeavour with my paintings to express a sense of a particular
              place through an examination of the environmental and human forces
              that shape it. The subjects of the paintings reflect the various
              aspects of the Ontario landscape, especially those found in Huron
              and Bruce counties, with emphasis on the water, the fields, the
              sky and its changing patterns of weather.
            </p>
          </div>
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