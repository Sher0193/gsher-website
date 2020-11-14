import React from "react";

import PostRow from "./PostRow";

import {
  updatePost,
  getPost,
  getPosts,
  deletePost,
  deleteImage,
  getCategories,
  createCategory,
  deleteCategory,
  updateCategory,
  getVendors,
  deleteVendor,
} from "../../../utils/Api";

import "./Posts.css";

export default class Posts extends React.Component {
  constructor() {
    super();
    this.state = {
      postData: null,
      catData: null,
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
   * Query the api for any missing information.
   */
  update() {
    if (this.state.postData === null) {
      this.apiPosts();
    } else if (this.state.catData === null) {
      this.apiCategories();
    } else if (this.state.vendData === null) {
      this.apiVendors();
    }
  }

  /**
   * Query api for all posts, update state.
   */
  async apiPosts() {
    let result = await getPosts();
    if (result !== null && result.success) {
      this.setState({ postData: result.data });
      return;
    }
    this.setState({ postData: [] });
  }

  /**
   * Query api for all categories, update state.
   */
  async apiCategories() {
    let result = await getCategories();
    if (result && result.success) {
      this.setState({ catData: result.data });
      return;
    }
    this.setState({ catData: [] });
  }

  /**
   * Query api for all vendors, update state.
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
   * Prompt user for a name, use given name to create a new category.
   */
  async createCategory() {
    let name = prompt("Please enter a category name.");
    let result = await createCategory(name);
    if (result !== null && result.success) {
      this.setState({ catData: null });
    }
  }

  /**
   * Delete category at id if user agrees to prompt.
   */
  async deleteCategory(id) {
    if (window.confirm("Do you wish to delete this category?")) {
      let result = await deleteCategory(id);
      if (result !== null && result.success) {
        this.setState({ catData: null });
      }
    }
  }

  /**
   * Prompt user for a new category name for category at id.
   */
  async editCategory(id) {
    let name = prompt("Please enter a new category name.");
    let result = await updateCategory(id, name);
    if (result !== null && result.success) {
      this.setState({ catData: null });
    }
  }

  /**
   * Delete post at id if user agrees to prompt.
   */
  async deletePost(id) {
    if (window.confirm("Do you wish to delete this post?")) {
      let getResult = await getPost(id);
      if (getResult === null || !getResult.success) {
        return;
      }
      let delResult = await deletePost(id);
      if (delResult === null || !delResult.success) {
        return;
      }
      let delImageResult = await deleteImage(getResult.data.link);
      if (delImageResult === null || !delImageResult.success) {
        return;
      }
      this.setState({ postData: null });
    }
  }

  /**
   * Delete vendor at id if user agrees to prompt.
   */
  async deleteVendor(id) {
    if (window.confirm("Do you wish to delete this vendor?")) {
      let result = await deleteVendor(id);
      if (result !== null && result.success) {
        this.setState({ vendData: null });
      }
    }
  }

  /**
   * Update given post, toggling the feature field.
   */
  async toggleFeature(post) {
    let updateResult = await updatePost(
      post.id,
      post.name,
      post.dimensions,
      post.meta,
      post.price,
      post.sold,
      post.date_painted.substring(0, 10),
      post.link,
      null,
      post.featured === 1 ? 0 : 1
    );
    if (updateResult === null || !updateResult.success) {
      return;
    }
    this.setState({ postData: null });
  }

  /**
   * Generate a PostRow for each post in data.
   */
  generatePostRows(data) {
    return data.map((p, k) => (
      <PostRow
        handleFeature={() => this.toggleFeature(p)}
        featured={p.featured}
        key={k}
        index={k}
        postId={p.id}
        postName={p.name}
        image={p.link}
        handleClick={() => this.deletePost(p.id)}
      />
    ));
  }

  /**
   * Generate a <tr> for each category in data.
   */
  generateCategoryRows(data) {
    return data.map((p, k) => (
      <tr className={k % 2 === 0 ? "tableRowOdd" : ""} key={p.id}>
        <td>{p.id}</td>
        <td>{p.category}</td>
        <td>
          <div
            className="warning-btn fbtn"
            onClick={() => this.editCategory(p.id)}
          >
            Edit
          </div>
        </td>
        <td>
          <div
            className="danger-btn fbtn"
            onClick={() => this.deleteCategory(p.id)}
          >
            Delete
          </div>
        </td>
      </tr>
    ));
  }

  /**
   * Generate a <tr> for each vendor in data.
   */
  generateVendorRows(data) {
    return data.map((p, k) => (
      <tr className={k % 2 === 0 ? "tableRowOdd" : ""} key={p.id}>
        <td>{p.id}</td>
        <td>{p.vendor_name}</td>
        <td>
          <a
            className="warning-btn fbtn"
            href={"/admin/posts/vendors/edit?vendor=" + p.id}
          >
            Edit
          </a>
        </td>
        <td>
          <div
            className="danger-btn fbtn"
            onClick={() => this.deleteVendor(p.id)}
          >
            Delete
          </div>
        </td>
      </tr>
    ));
  }

  render() {
    if (
      this.state.postData !== null &&
      this.state.catData !== null &&
      this.state.vendData !== null
    ) {
      return (
        <div className="postsContainer">
          <div className="tableFlex">
            <div className="tableContainer posts-table">
              <div className="tableHeader">
                <div className="tableHeading">Posts</div>
                <a href="/admin/posts/new" className="okay-btn new-btn fbtn">
                  New Post
                </a>
              </div>
              <div className="tableContent">
                <table>
                  <tbody>{this.generatePostRows(this.state.postData)}</tbody>
                </table>
              </div>
            </div>
            <div className="topRow">
              <div className="tableContainer half-table">
                <div className="tableHeader">
                  <div className="tableHeading">Categories</div>
                  <div
                    className="okay-btn new-btn fbtn"
                    onClick={() => this.createCategory()}
                  >
                    New Category
                  </div>
                </div>
                <div className="tableContent">
                  <table>
                    <tbody>
                      {this.generateCategoryRows(this.state.catData)}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="tableContainer half-table">
                <div className="tableHeader">
                  <div className="tableHeading">Vendors</div>
                  <a
                    href="/admin/posts/vendors/new"
                    className="okay-btn new-btn fbtn"
                  >
                    New Vendor
                  </a>
                </div>
                <div className="tableContent">
                  <table>
                    <tbody>
                      {this.generateVendorRows(this.state.vendData)}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}
