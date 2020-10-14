import React from "react";
import "./PostForm.css";

import config from "../../../config.json";

export default class PostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameValue: "",
      dimValue: "",
      metaValue: "",
      catValue: "",
      priceValue: 0,
      soldValue: "false",
      dateValue: "1961-01-01",
      dateValueNumeric: 1,
      fileName: "",
      btnDisabled: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.fileInput = React.createRef();
  }

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
      case "category":
        if (event.target.value.length > 256) return;
        this.setState({ catValue: event.target.value });
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
      default:
        break;
    }
  }

  async onSubmit(event) {
    event.preventDefault();
    this.setState({ btnDisabled: true });
    if (this.fileInput.current.files.length < 1) {
      this.setState({ btnDisabled: false });
      return;
    }
    try {
      const formData = new FormData();
      formData.append("name", this.state.nameValue);
      formData.append("dimensions", this.state.dimValue);
      formData.append("meta", this.state.metaValue);
      formData.append("category", this.state.catValue);
      formData.append("price", this.state.priceValue);
      formData.append("sold", this.state.soldValue);
      formData.append("date", this.state.dateValue);
      formData.append("image", this.fileInput.current.files[0]);

      let res = await fetch(config.server + "uploadimage", {
        method: "post",
        mode: "cors",
        credentials: "include",
        body: formData,
      });
      let result = await res.json();
      alert(result.success);
    } catch (e) {
      console.log(e);
      this.setState({ btnDisabled: false });
    }
  }

  render() {
    const isEnabled =
      this.fileInput.current !== null &&
      this.fileInput.current.files.length > 0 &&
      this.state.nameValue.length > 0 &&
      this.state.dimValue.length > 0 &&
      this.state.metaValue.length > 0 &&
      this.state.catValue.length > 0 &&
      this.state.priceValue.length > 0 &&
      this.state.dateValueNumeric > 0 &&
      !this.state.btnDisabled;
    return (
      <div className="form">
        NEW POST
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
            Category:
            <input
              name="category"
              type="text"
              value={this.state.catValue}
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
            valueAsNumber={this.state.dateValueAsNumber}
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
          <button disabled={!isEnabled} className={"submitBtn"} type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
