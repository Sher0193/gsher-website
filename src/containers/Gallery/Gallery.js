import React from "react";
import "./Gallery.css";

import Post from "../../components/Grid/Post";
import config from "../../config.json";

export default class Gallery extends React.Component {
  constructor() {
    super();
    this.state = {
      data: null,
      activeImage: null,
    };
  }

  componentDidMount() {
    this.update();
  }
  componentDidUpdate() {
    this.update();
  }

  update() {
    if (this.state.data === null) {
      this.apiPosts();
    }
  }

  async apiPosts() {
    try {
      let res = await fetch(config.server + "api/posts/1", {
        method: "get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      let result = await res.json();
      if (result !== null && result.success) {
        this.setState({ data: result.results });
      }
    } catch (e) {
      console.log(e);
    }

    /*axios.get('localhost:3001/api/posts')
            .then(response => {
                this.setState({data: response.data});
                console.log(this.state.data.response[0].name);
            })
            .catch(error => {
                console.log(error);
            })
            .finally();*/
  }

  generatePosts(data) {
    return data.map((p, k) => (
      <Post
        text={p.name}
        image={p.link}
        dimensions={p.dimensions}
        sold={p.sold}
      />
    ));
  }
  //{this.generatePosts(this.state.data)}

  render() {
    if (this.state.data !== null) {
      return (
        <div className="App">
          <div className="gallery">
            <div className="grid">{this.generatePosts(this.state.data)}</div>
          </div>
        </div>
      );
    } else {
      return <div className="App"></div>;
    }
  }
}
