import React from "react";

import "./Site.css";

import {
  getAbout,
  updateAbout,
  getStatement,
  updateStatement,
} from "../../../utils/Api";

export default class Site extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      aboutValue: "",
      statementValue: "",
    };
    this.handleAboutChange = this.handleAboutChange.bind(this);
    this.handleStatementChange = this.handleStatementChange.bind(this);
    this.aboutSubmit = this.aboutSubmit.bind(this);
    this.statementSubmit = this.statementSubmit.bind(this);
  }

  componentDidMount() {
    this.loadText();
  }

  /**
   * Query the api for about and statement info, update state.
   */
  async loadText() {
    let aboutContent = "";
    let statementContent = "";
    let aboutRes = await getAbout();
    if (aboutRes !== null && aboutRes.success) {
      aboutContent = aboutRes.data.join("\n");
    }
    let statementRes = await getStatement();
    if (statementRes !== null && statementRes.success) {
      statementContent = statementRes.data.join("\n");
    }
    this.setState({
      aboutValue: aboutContent,
      statementValue: statementContent,
    });
  }

  /**
   * Handle updating state on "statement" form changes.
   */
  handleStatementChange = (event) => {
    if (event.target.value.length > 6000) return;
    this.setState({ statementValue: event.target.value });
  };

  /**
   * Handle updating state on "about" form changes.
   */
  handleAboutChange = (event) => {
    if (event.target.value.length > 6000) return;
    this.setState({ aboutValue: event.target.value });
  };

  /**
   * Submit information in "statement" form to the server.
   */
  async statementSubmit(event) {
    event.preventDefault();
    let statement = this.state.statementValue;
    let content = statement.split("\n");
    let res = await updateStatement(content);
    if (!res) {
      alert("Error updating artist statement.");
      return;
    }
    alert("Updated artist statement.");
  }

  /**
   * Submit information in "about" form to the server.
   */
  async aboutSubmit(event) {
    event.preventDefault();
    let about = this.state.aboutValue;
    let content = about.split("\n");
    let res = await updateAbout(content);
    if (!res || !res.success) {
      alert("Error updating about.");
      return;
    }
    alert("Updated about.");
  }

  render() {
    return (
      <div className="siteContainer">
        <div className="forms">
          <form name="statement-form" onSubmit={this.statementSubmit}>
            <textarea
              name="statement"
              value={this.state.statementValue}
              onChange={this.handleStatementChange}
            />
            <button className={"submitBtn"} type="submit">
              Update Artist Statement
            </button>
          </form>
          <form name="about-form" onSubmit={this.aboutSubmit}>
            <textarea
              name="about"
              value={this.state.aboutValue}
              onChange={this.handleAboutChange}
            />
            <button className={"submitBtn"} type="submit">
              Update About
            </button>
          </form>
        </div>
      </div>
    );
  }
}
