import React from "react";
import "./Gallery.css";

import GridElement from "../../components/Gallery/Grid/GridElement";
import Post from "../../components/Gallery/Post/Post";
import Spinner from "../../components/UI/Spinner/Spinner";

import { getPosts, getCategories } from "../../utils/Api";

import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

export default class Gallery extends React.Component {
  constructor() {
    super();
    this.state = {
      data: null,
      activeIndex: null,
      imageLoaded: false,
      catData: null,
      catValues: null,
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
    } else if (this.state.catData === null) {
      this.apiCategories();
    }
  }

  getImgById(id) {
    for (let i = 0; i < this.state.data.length; i++) {
      if (this.state.data[i].id === id) return this.state.data[i].link;
    }
    return null;
  }

  async apiPosts() {
    let catValues = [];
    if (this.state.catValues) {
      for (let i = 0; i < this.state.catValues.length; i++) {
        catValues.push(this.state.catValues[i].value);
      }
    }
    let result = await getPosts(
      1,
      null,
      catValues.length > 0 ? catValues : null
    );
    if (result && result.success) {
      this.setState({ data: result.data });
    } else {
      this.setState({ data: [] });
    }
  }

  async apiCategories() {
    let result = await getCategories();
    console.log(result.data);
    if (result && result.success) {
      let options = [];
      for (let i = 0; i < result.data.length; i++) {
        options.push({
          value: result.data[i].id,
          label: result.data[i].category,
        });
      }
      this.setState({
        catData: options,
      });
    } else {
      this.setState({ catData: [] });
    }
  }

  handleMultiSelectChange = (selectedOptions) => {
    this.setState({
      catValues: selectedOptions,
      data: null,
    });
    console.log(this.state.catValues);
  };

  setIndex(idx) {
    this.setState({ activeIndex: idx });
  }

  setImageLoaded(loaded) {
    if (loaded !== this.state.imageLoaded) {
      this.setState({ imageLoaded: loaded });
    }
  }

  generatePosts(data) {
    return data.map((p, k) => (
      <GridElement
        key={p.id}
        id={p.id}
        text={p.name}
        image={p.link}
        dimensions={p.dimensions}
        sold={p.sold}
        meta={p.meta}
        price={p.price}
        handleClick={() => this.setIndex(k)}
      />
    ));
  }
  //{this.generatePosts(this.state.data)}

  render() {
    if (this.state.activeIndex !== null) {
      let post = this.state.data[this.state.activeIndex];
      return (
        <div className="App">
          <Post
            destroy={() => this.setIndex(null)}
            loadedHook={() => this.setImageLoaded(true)}
            loaded={this.state.imageLoaded}
            img={post.link}
            title={post.name}
            meta={post.meta}
            dimensions={post.dimensions}
            price={post.price}
          />
        </div>
      );
    } else if (this.state.data !== null) {
      return (
        <div className="App">
          <div className="gallery">
            <div className="divider"></div>
            <Select
              loadingMessage="Loading..."
              placeholder="Collections..."
              onChange={this.handleMultiSelectChange}
              value={this.state.catValues}
              className="react-select"
              isMulti={true}
              options={this.state.catData}
              components={animatedComponents}
            />
            <div className={"grid"}>{this.generatePosts(this.state.data)}</div>
          </div>
        </div>
      );
    } else {
      // loading
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
