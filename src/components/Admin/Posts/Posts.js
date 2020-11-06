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
} from "../../../utils/Api";

import "./Posts.css";

export default class Posts extends React.Component {
  constructor() {
    super();
    this.state = {
      postData: null,
      catData: null,
    };
  }
  componentDidMount() {
    this.update();
  }
  componentDidUpdate() {
    this.update();
  }

  update() {
    if (this.state.postData === null) {
      this.apiPosts();
    } else if (this.state.catData === null) {
      this.apiCategories();
    }
  }
  async apiPosts() {
    let result = await getPosts();
    if (result !== null && result.success) {
      this.setState({ postData: result.data });
      return;
    }
    this.setState({ postData: [] });
  }

  async apiCategories() {
    let result = await getCategories();
    if (result && result.success) {
      this.setState({ catData: result.data });
      return;
    }
    this.setState({ catData: [] });
  }

  async createCategory() {
    let name = prompt("Please enter a category name.");
    let result = await createCategory(name);
    if (result !== null && result.success) {
      this.setState({ catData: null });
    }
  }

  async deleteCategory(id) {
    if (window.confirm("Do you wish to delete this category?")) {
      let result = await deleteCategory(id);
      if (result !== null && result.success) {
        this.setState({ catData: null });
      }
    }
  }

  async editCategory(id) {
    let name = prompt("Please enter a new category name.");
    let result = await updateCategory(id, name);
    if (result !== null && result.success) {
      this.setState({ catData: null });
    }
  }

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

  generatePostRows(data) {
    return data.map((p, k) => (
      <PostRow
        handleFeature={() => this.toggleFeature(p)}
        featured={p.featured}
        key={p.id}
        postId={p.id}
        postName={p.name}
        image={p.link}
        handleClick={() => this.deletePost(p.id)}
      />
    ));
  }

  generateCategoryRows(data) {
    return data.map((p, k) => (
      <tr key={p.id}>
        <td>{p.id}</td>
        <td>{p.category}</td>
        <td>
          <button onClick={() => this.editCategory(p.id)}>Edit</button>
        </td>
        <td>
          <button onClick={() => this.deleteCategory(p.id)}>Delete</button>
        </td>
      </tr>
    ));
  }

  render() {
    if (this.state.postData !== null && this.state.catData !== null) {
      return (
        <div className="postsContainer">
          <div className="tableContainer">
            Categories:
            <button onClick={() => this.createCategory()}>New Category</button>
            <table>
              <tbody>
                <tr>
                  <th>ID</th>
                  <th>Category Name</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
                {this.generateCategoryRows(this.state.catData)}
              </tbody>
            </table>
          </div>
          <div className="tableContainer">
            Posts:
            <a href="/admin/posts/new" className="button">
              New Post
            </a>
            <table>
              <tbody>
                <tr>
                  <th>ID</th>
                  <th>Painting Name</th>
                  <th>Thumbnail</th>
                  <th>Edit</th>
                  <th>Delete</th>
                  <th>Feature</th>
                </tr>
                {this.generatePostRows(this.state.postData)}
              </tbody>
            </table>
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}
