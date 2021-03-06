import React from "react";
import { Redirect } from "react-router-dom";
import "./PostForm.css";

import Select from "react-select";
import makeAnimated from "react-select/animated";

import {
  createPost,
  updatePost,
  uploadImage,
  deleteImage,
  getPost,
  getCategories,
  getCategoriesByPost,
  getVendors,
} from "../../../utils/Api";

const animatedComponents = makeAnimated();

export default class PostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
      postId: -1,
      catData: null,
      nameValue: "",
      dimValue: "",
      metaValue: "",
      priceValue: 0,
      soldValue: "false",
      dateValue: "2000-01-01",
      dateValueNumeric: 1,
      fileName: "",
      btnDisabled: false,
      editForm: false,
      catValues: null,
      featuredValue: null,
      vendData: null,
      vendValue: -1,
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.fileInput = React.createRef();
  }

  componentDidUpdate() {
    this.update();
  }

  /**
   * Update any missing category or vendor data, check parameters.
   */
  update() {
    const params = new URLSearchParams(this.props.params);
    if (params.has("post")) {
      if (!this.state.editForm) {
        this.apiPost(params.get("post"));
        return;
      }
    }
    if (this.state.catData === null) {
      this.apiCategories();
    } else if (this.state.vendData === null) {
      this.apiVendors();
    }
  }

  /**
   * Query the api for categories, update state.
   */
  async apiCategories() {
    let result = await getCategories();
    if (result !== null && result.success) {
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
   * Query the api for vendors, update state.
   */
  async apiVendors() {
    let result = await getVendors();
    if (result !== null && result.success) {
      let options = [];
      for (let i = 0; i < result.data.length; i++) {
        options.push({
          value: result.data[i].id,
          label: result.data[i].vendor_name,
        });
      }
      this.setState({
        vendData: options,
      });
    } else {
      this.setState({ vendData: [] });
    }
  }

  /**
   * Query the api for information on a post with matching id, update state (form values).
   */
  async apiPost(id) {
    let postResult = await getPost(id);
    if (!postResult) {
      this.setState({ editForm: true });
      return;
    }
    let data = postResult.data;

    let catResult = await getCategoriesByPost(id);
    let values = [];
    if (catResult) {
      for (let i = 0; i < catResult.data.length; i++) {
        values.push({
          value: catResult.data[i].id,
          label: catResult.data[i].category,
        });
      }
    }
    console.log(values);
    this.setState({
      editForm: true,
      editFilename: data.link,
      nameValue: data.name,
      dimValue: data.dimensions,
      metaValue: data.meta,
      priceValue: data.price,
      soldValue: data.sold === 1 ? "true" : "false",
      dateValue: data.date_painted.substring(0, 10),
      catValues: values,
      featuredValue: data.featured,
      vendValue: data.vendor_id,
    });
  }

  /**
   * Generate option tags for vendors given information in state.
   */
  generateVendorOptions(data) {
    return data.map((p, k) => (
      <option key={k} value={p.value}>
        {p.label}
      </option>
    ));
  }

  /**
   * Handle all miscellaneous form state updating on change.
   */
  handleChange(event) {
    if (event.target.type === "radio") {
      this.setState({ soldValue: event.target.value });
      return;
    }
    switch (event.target.name) {
      case "name":
        if (event.target.value.length > 100) return;
        this.setState({ nameValue: event.target.value });
        break;
      case "dimensions":
        if (event.target.value.length > 100) return;
        this.setState({ dimValue: event.target.value });
        break;
      case "meta":
        if (event.target.value.length > 100) return;
        this.setState({ metaValue: event.target.value });
        break;
      case "price":
        if (isNaN(event.target.value)) return;
        this.setState({ priceValue: event.target.value });
        break;
      case "date":
        this.setState({ dateValue: event.target.value });
        this.setState({ dateValueNumeric: event.target.valueAsNumber });
        return;
      case "image":
        if (this.fileInput.current.files.length < 1) {
          return;
        }
        this.setState({ fileName: this.fileInput.current.files[0].name });
        break;
      case "vendor":
        this.setState({ vendValue: event.target.value });
        break;
      default:
        break;
    }
  }

  /**
   * Handle state updating on change for the React Select element.
   */
  handleMultiSelectChange = (selectedOptions) => {
    this.setState({ catValues: selectedOptions });
    console.log(this.state.catValues);
  };

  /**
   * Handle submitting all form info to the api.
   */
  async onSubmit(event) {
    event.preventDefault();
    this.setState({ btnDisabled: true });
    let catValues = [];
    if (this.state.catValues) {
      for (let i = 0; i < this.state.catValues.length; i++) {
        catValues.push(this.state.catValues[i].value);
      }
    }
    if (this.state.editForm) {
      let filename = this.state.editFilename;
      console.log(filename);
      if (this.fileInput.current.files.length >= 1) {
        let uploadResult = await uploadImage(this.fileInput.current.files[0]);
        if (!uploadResult) {
          alert("Issue uploading image.");
          this.setState({ btnDisabled: false });
          return;
        }
        filename = uploadResult.filename;
        let deleteResult = await deleteImage(this.state.editFilename);
        if (!deleteResult) {
          alert("Issue deleting old image. Contact admin.");
        }
      }
      const params = new URLSearchParams(this.props.params);
      if (!params.has("post")) return;
      let updateResult = await updatePost(
        params.get("post"),
        this.state.nameValue,
        this.state.dimValue,
        this.state.metaValue,
        this.state.priceValue,
        this.state.soldValue === "true" ? 1 : 0,
        this.state.dateValue,
        filename,
        catValues,
        this.state.featuredValue,
        this.state.vendValue
      );
      if (!updateResult) {
        alert("Issue updating database entry.");
        this.setState({ btnDisabled: false });
        return;
      }
      alert("Successfully updated post.");
      this.setState({
        redirect: "/admin/posts/",
      });
    } else {
      if (this.fileInput.current.files.length < 1) {
        this.setState({ btnDisabled: false });
        return;
      }
      let uploadResult = await uploadImage(this.fileInput.current.files[0]);
      if (!uploadResult) {
        alert("Issue uploading image.");
        this.setState({ btnDisabled: false });
        return;
      }
      let filename = uploadResult.filename;
      console.log(filename);
      let createResult = await createPost(
        this.state.nameValue,
        this.state.dimValue,
        this.state.metaValue,
        this.state.priceValue,
        this.state.soldValue === "true" ? 1 : 0,
        this.state.dateValue,
        filename,
        catValues,
        this.state.vendValue
      );
      if (!createResult) {
        alert("Issue creating database entry.");
        this.setState({ btnDisabled: false });
        return;
      }
      alert("Successfully added entry.");
      this.setState({
        redirect: "/admin/posts/",
      });
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    const isEnabled =
      ((this.fileInput.current !== null &&
        this.fileInput.current.files.length > 0) ||
        this.state.editForm) &&
      this.state.nameValue.length > 0 &&
      this.state.dimValue.length > 0 &&
      this.state.metaValue.length > 0 &&
      this.state.priceValue > 0 &&
      this.state.dateValueNumeric > 0 &&
      !this.state.btnDisabled;
    if (this.state.catData !== null && this.state.vendData !== null) {
      return (
        <div className="postForm-container">
          {!this.state.editForm ? "NEW POST" : "EDIT POST"}
          <form className="postForm" onSubmit={this.onSubmit}>
            <label>
              Name:
              <input
                name="name"
                type="text"
                value={this.state.nameValue}
                onChange={this.handleChange}
              />
            </label>
            <label>
              Dimensions:
              <input
                name="dimensions"
                type="text"
                value={this.state.dimValue}
                onChange={this.handleChange}
              />
            </label>
            <label>
              Meta:
              <input
                name="meta"
                type="text"
                value={this.state.metaValue}
                onChange={this.handleChange}
              />
            </label>
            <label>
              Price ($CAD):
              <input
                name="price"
                type="text"
                pattern="[0-9]*"
                value={this.state.priceValue}
                onChange={this.handleChange}
              />
            </label>
            <div className="radioCon">
              <label>Sold:</label>
              <div className="radio">
                <label>
                  <input
                    type="radio"
                    value="false"
                    checked={this.state.soldValue === "false"}
                    onChange={this.handleChange}
                  />
                  No
                </label>
              </div>
              <div className="radio">
                <label>
                  <input
                    type="radio"
                    value="true"
                    checked={this.state.soldValue === "true"}
                    onChange={this.handleChange}
                  />
                  Yes
                </label>
              </div>
            </div>
            <label> Date Painted:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={this.state.dateValue}
              valueasnumber={this.state.dateValueAsNumber}
              min="1961-01-01"
              max="2200-12-31"
              onChange={this.handleChange}
            />
            <label>Painting:</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              ref={this.fileInput}
              onChange={this.handleChange}
            />
            <label>Category:</label>
            <Select
              onChange={this.handleMultiSelectChange}
              value={this.state.catValues}
              className="admin-react-select"
              isMulti={true}
              options={this.state.catData}
              components={animatedComponents}
            />
            <label>Vendor:</label>
            <select
              name="vendor"
              value={this.state.vendValue}
              onChange={this.handleChange}
            >
              <option selected value={-1}>
                Select a vendor
              </option>
              {this.generateVendorOptions(this.state.vendData)}
            </select>
            <button disabled={!isEnabled} className={"submitBtn"} type="submit">
              Submit
            </button>
          </form>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}
