import React from "react";
import "./Gallery.css";

import GridElement from "../../components/Gallery/Grid/GridElement";
import Post from "../../components/Gallery/Post/Post";
import GallerySelect from "../../components/Gallery/Select/GallerySelect";
import Spinner from "../../components/UI/Spinner/Spinner";
import PageNavigation from "../../components/Gallery/PageNavigation/PageNavigation";

import { getPosts, getCategories } from "../../utils/Api";

import { populatePages, arraysEqual } from "../../utils/Utils";

export default class Gallery extends React.Component {
  constructor() {
    super();
    this.state = {
      data: null,
      activeIndex: null,
      imageLoaded: false,
      catData: null,
      catValues: null,
      curPage: 1,
      endPage: -1,
      selected: null,
    };
  }

  componentDidMount() {
    console.log("mount");
    this.update();
  }
  componentDidUpdate() {
    console.log("update");
    this.update();
  }

  update() {
    if (this.state.catData === null) {
      this.apiCategories();
    } else {
      this.checkParams();
    }
  }

  checkParams() {
    const params = new URLSearchParams(this.props.location.search);

    let page = params.has("page") ? parseInt(params.get("page")) : 1;
    let image = params.has("image") ? parseInt(params.get("image")) : null;
    let tags = params.has("tag") ? params.getAll("tag") : null;
    if (this.state.data === null) {
      this.apiPosts(tags);
    } else if (
      image !== this.state.activeIndex ||
      page !== this.state.curPage ||
      !arraysEqual(tags, this.state.catValues)
    ) {
      let data = !arraysEqual(tags, this.state.catValues)
        ? null
        : this.state.data;
      this.setGallery(page, tags, data, image);
    }
  }

  getImgById(id) {
    for (let i = 0; i < this.state.data.length; i++) {
      if (this.state.data[i].id === id) return this.state.data[i].link;
    }
    return null;
  }

  async apiPosts(tags) {
    let result = await getPosts(true, null, tags);
    if (result && result.success) {
      this.setGallery(null, tags, result.data, null);
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
    const params = new URLSearchParams(this.props.location.search);
    params.delete("page");
    params.delete("tag");
    if (selectedOptions) {
      for (let i = 0; i < selectedOptions.length; i++) {
        params.append("tag", selectedOptions[i].value);
      }
    }
    this.props.history.push({
      pathname: "/gallery",
      search: params.toString(),
    });
  };

  backToGallery = () => {
    const params = new URLSearchParams(this.props.location.search);
    params.delete("image");
    this.props.history.push({
      pathname: "/gallery",
      search: params.toString(),
    });
  };

  handlePostClick = (idx) => {
    const params = new URLSearchParams(this.props.location.search);
    params.set("image", idx);
    this.props.history.push({
      pathname: "/gallery",
      search: params.toString(),
    });
  };

  setIndex(idx) {
    this.setState({ activeIndex: idx });
  }

  setImageLoaded(loaded) {
    if (loaded !== this.state.imageLoaded) {
      this.setState({ imageLoaded: loaded });
    }
  }

  handlePageClick = (page) => {
    const params = new URLSearchParams(this.props.location.search);
    params.set("page", page);
    this.props.history.push({
      pathname: "/gallery",
      search: params.toString(),
    });
  };

  getCatdataById(id) {
    for (let i = 0; i < this.state.catData.length; i++) {
      if (this.state.catData[i].value === id) {
        return this.state.catData[i];
      }
    }
    return null;
  }

  setGallery(page, tags, data, idx) {
    console.log("page : " + page + "\ntags: " + tags);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    page = page === null ? this.state.curPage : page;
    let endPage = data === null ? -1 : data.length;
    let selected = [];
    if (tags !== null) {
      for (let i = 0; i < tags.length; i++) {
        let catData = this.getCatdataById(parseInt(tags[i]));
        if (catData !== null) {
          selected.push({ label: catData.label, value: catData.value });
        }
      }
    }
    this.setState({
      activeIndex: idx,
      curPage: page,
      catValues: tags,
      data: data,
      endPage: endPage,
      selected: selected,
    });
  }

  setPage(page) {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    this.setState({ curPage: page });
  }

  generatePosts(data) {
    return data[this.state.curPage - 1].map((p, k) => (
      <GridElement
        key={p.id}
        id={p.id}
        text={p.name}
        image={p.link}
        dimensions={p.dimensions}
        sold={p.sold}
        meta={p.meta}
        price={p.price}
        handleClick={() => this.handlePostClick(k)}
      />
    ));
  }
  //{this.generatePosts(this.state.data)}

  render() {
    if (this.state.activeIndex !== null && this.state.data !== null) {
      let post = this.state.data[this.state.curPage - 1][
        this.state.activeIndex
      ];
      return (
        <div className="App">
          <Post
            destroy={this.backToGallery}
            loadedHook={() => this.setImageLoaded(true)}
            loaded={this.state.imageLoaded}
            img={post.link}
            title={post.name}
            meta={post.meta}
            dimensions={post.dimensions}
            price={post.price}
            sold={post.sold}
          />
        </div>
      );
    } else if (this.state.data !== null) {
      if (this.state.curPage > this.state.endPage || this.state.curPage <= 0) {
        return <div className="load-container"></div>;
      } else {
        return (
          <div className="App">
            <div className="gallery">
              <div className="divider"></div>
              <GallerySelect
                onChange={this.handleMultiSelectChange}
                options={this.state.catData}
                value={this.state.selected}
              />
              <div className={"grid-container"}>
              <div className={"grid"}>
                {this.generatePosts(this.state.data)}
              </div>
              </div>
              <PageNavigation
                page={this.state.curPage}
                pages={populatePages}
                endPage={this.state.endPage}
                click={this.handlePageClick}
              />
            </div>
          </div>
        );
      }
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
