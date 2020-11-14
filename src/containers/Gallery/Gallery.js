import React from "react";
import "./Gallery.css";

import GridElement from "../../components/Gallery/Grid/GridElement";
import Post from "../../components/Gallery/Post/Post";
import GallerySelect from "../../components/Gallery/Select/GallerySelect";
import Spinner from "../../components/UI/Spinner/Spinner";
import PageNavigation from "../../components/Gallery/PageNavigation/PageNavigation";

import { getPosts, getCategories, getVendors } from "../../utils/Api";

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
      vendData: null,
    };
  }

  componentDidMount() {
    this.update();
  }
  componentDidUpdate() {
    this.update();
  }

  /**
   * Query any missing data on posts, categories, and vendors.
   */
  update() {
    if (this.state.catData === null) {
      this.apiCategories();
    } else if (this.state.vendData === null) {
      this.apiVendors();
    } else {
      this.checkParams();
    }
  }

  /**
   * Query the api for all posts given current tags, update state with returned information.
   */
  async apiPosts(tags) {
    let result = await getPosts(true, null, tags);
    if (result && result.success) {
      this.setGallery(null, tags, result.data, null);
    } else {
      this.setState({ data: [] });
    }
  }

  /**
   * Query the api for all categories, update state with returned information.
   */
  async apiCategories() {
    let result = await getCategories();
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

  /**
   * Query the api for all vendors, update state with returned information.
   */
  async apiVendors() {
    let result = await getVendors();
    if (result && result.success) {
      this.setState({ vendData: result.data });
      return;
    }
    this.setState({ vendData: [] });
  }

  /**
   * Update state variables based on information in the query parameters.
   */
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

  /**
   * Return information for a post with an id matching the given argument.
   */
  getImgById(id) {
    for (let i = 0; i < this.state.data.length; i++) {
      if (this.state.data[i].id === id) return this.state.data[i].link;
    }
    return null;
  }

  /**
   * Return information for a vendor with an id matching the given argument.
   */
  getVendorById(id) {
    for (let i = 0; i < this.state.vendData.length; i++) {
      if (id === this.state.vendData[i].id) {
        return this.state.vendData[i];
      }
    }
    return null;
  }

  /**
   * Return information for a category with an id matching the given argument.
   */
  getCatdataById(id) {
    for (let i = 0; i < this.state.catData.length; i++) {
      if (this.state.catData[i].value === id) {
        return this.state.catData[i];
      }
    }
    return null;
  }

  /**
   * Push query parameters based on selected tags.
   */
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

  /**
   * Remove image query parameter, thus returning to gallery after checkParams executes.
   */
  backToGallery = () => {
    const params = new URLSearchParams(this.props.location.search);
    params.delete("image");
    this.props.history.push({
      pathname: "/gallery",
      search: params.toString(),
    });
  };

  /**
   * Attempt to move to the next image in the state "data" array.
   */
  handleNextImg = () => {
    let idx = this.state.activeIndex + 1;
    let pageIdx = this.state.curPage - 1;
    if (idx >= this.state.data[pageIdx].length) {
      if (
        this.state.data[pageIdx + 1] &&
        this.state.data[pageIdx + 1].length > 0
      ) {
        const params = new URLSearchParams(this.props.location.search);
        params.set("page", pageIdx + 2);
        params.set("image", 0);
        this.props.history.push({
          pathname: "/gallery",
          search: params.toString(),
        });
        return true;
      }
      return false;
    }
    this.handlePostClick(idx);
    return true;
  };

  /**
   * Check if there is a subsequent image in the state "data" array.
   */
  isNextActive = () => {
    let idx = this.state.activeIndex + 1;
    let pageIdx = this.state.curPage - 1;
    return !(
      idx >= this.state.data[pageIdx].length &&
      !(this.state.data[pageIdx + 1] && this.state.data[pageIdx + 1].length > 0)
    );
  };

  /**
   * Attempt to move to the previous image in the state "data" array.
   */
  handlePrevImg = () => {
    let idx = this.state.activeIndex - 1;
    let pageIdx = this.state.curPage - 1;
    if (idx < 0) {
      if (
        this.state.data[pageIdx - 1] &&
        this.state.data[pageIdx - 1].length > 0
      ) {
        const params = new URLSearchParams(this.props.location.search);
        params.set("page", pageIdx);
        params.set("image", this.state.data[pageIdx - 1].length - 1);
        this.props.history.push({
          pathname: "/gallery",
          search: params.toString(),
        });
        return true;
      }
      return false;
    }
    this.handlePostClick(idx);
    return true;
  };

  /**
   * Check if there is a preceding image in the state "data" array.
   */
  isPrevActive = () => {
    let idx = this.state.activeIndex - 1;
    let pageIdx = this.state.curPage - 1;
    return !(
      idx < 0 &&
      !(this.state.data[pageIdx - 1] && this.state.data[pageIdx - 1].length > 0)
    );
  };

  /**
   * Push an "image" query parameter with the passed index.
   */
  handlePostClick = (idx) => {
    const params = new URLSearchParams(this.props.location.search);
    params.set("image", idx);
    this.props.history.push({
      pathname: "/gallery",
      search: params.toString(),
    });
  };

  /**
   * Push a "page" query parameter with passed page number.
   */
  handlePageClick = (page) => {
    const params = new URLSearchParams(this.props.location.search);
    params.set("page", page);
    this.props.history.push({
      pathname: "/gallery",
      search: params.toString(),
    });
  };

  /**
   * Update state's imageLoaded with given boolean, only if there is a change to make.
   */
  setImageLoaded(loaded) {
    if (loaded !== this.state.imageLoaded) {
      this.setState({ imageLoaded: loaded });
    }
  }

  /**
   * Update state's activeIndex with given index.
   */
  setIndex(idx) {
    this.setState({ activeIndex: idx });
  }

  /**
   * Update state's page with given page number, scroll directly to top of screen.
   */
  setPage(page) {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    this.setState({ curPage: page });
  }

  /**
   * Handle populating state variables to set all gallery info.
   */
  setGallery(page, tags, data, idx) {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
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

  /**
   * Generate GridElements based on a given array of posts.
   */
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

  render() {
    if (this.state.activeIndex !== null && this.state.data !== null) {
      let post = this.state.data[this.state.curPage - 1][
        this.state.activeIndex
      ];
      return (
        <div className="App">
          <Post
            destroy={this.backToGallery}
            nextActive={this.isNextActive}
            nextImg={this.handleNextImg}
            prevActive={this.isPrevActive}
            prevImg={this.handlePrevImg}
            loadedHook={() => this.setImageLoaded(true)}
            loaded={this.state.imageLoaded}
            img={post.link}
            title={post.name}
            meta={post.meta}
            dimensions={post.dimensions}
            price={post.price}
            sold={post.sold}
            vendor={this.getVendorById(post.vendor_id)}
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
