import React from "react";
import { Redirect } from "react-router-dom";
import "./PostForm.css";

import { createVendor, updateVendor, getVendor } from "../../../utils/Api";

export default class VendorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
      vendorId: -1,
      nameValue: "",
      linkValue: "",
      phoneValue: "",
      btnDisabled: false,
      editForm: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidUpdate() {
    this.update();
  }

  /**
   * Check parameters for any instructions on any missing info.
   */
  update() {
    const params = new URLSearchParams(this.props.params);
    if (params.has("vendor")) {
      if (!this.state.editForm) {
        this.apiVendor(params.get("vendor"));
        return;
      }
    }
  }

  /**
   * Query the api for information on a vendor with matching id, update state.
   */
  async apiVendor(id) {
    let result = await getVendor(id);
    if (!result) {
      this.setState({ editForm: true });
      return;
    }
    let data = result.data;

    this.setState({
      editForm: true,
      vendorId: id,
      nameValue: data.vendor_name,
      linkValue: data.vendor_link,
      phoneValue: data.vendor_phone,
    });
  }

  /**
   * Handle all miscellaneous state updating on form element change.
   */
  handleChange(event) {
    switch (event.target.name) {
      case "name":
        if (event.target.value.length > 100) return;
        this.setState({ nameValue: event.target.value });
        break;
      case "phone":
        if (event.target.value.length > 15) return;
        this.setState({ phoneValue: event.target.value });
        break;
      case "link":
        if (event.target.value.length > 256) return;
        this.setState({ linkValue: event.target.value });
        break;
      default:
        break;
    }
  }

  /**
   * Handle submitting form info to the server.
   */
  async onSubmit(event) {
    event.preventDefault();
    this.setState({ btnDisabled: true });
    if (this.state.editForm) {
      let result = await updateVendor(
        this.state.vendorId,
        this.state.nameValue,
        this.state.linkValue,
        this.state.phoneValue
      );
      if (result !== null && result.success) {
        alert("Successfully updated vendor.");
        this.setState({
          redirect: "/admin/posts/",
        });
      } else {
        alert("Something went wrong.");
        this.setState({ btnDisabled: false });
      }
    } else {
      let result = await createVendor(
        this.state.nameValue,
        this.state.linkValue,
        this.state.phoneValue
      );
      if (result !== null && result.success) {
        alert("Successfully created vendor.");
        this.setState({
          redirect: "/admin/posts/",
        });
      } else {
        alert("Something went wrong.");
        this.setState({ btnDisabled: false });
      }
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    const isEnabled =
      this.state.nameValue.length > 0 && !this.state.btnDisabled;
    return (
      <div className="postForm-container">
        {!this.state.editForm ? "NEW VENDOR" : "EDIT VENDOR"}
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
            Link:
            <input
              name="link"
              type="text"
              value={this.state.linkValue}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Phone:
            <input
              name="phone"
              type="text"
              value={this.state.phoneValue}
              onChange={this.handleChange}
            />
          </label>
          <button disabled={!isEnabled} className={"submitBtn"} type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
