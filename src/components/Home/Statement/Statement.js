import React from "react";

import "./Statement.css";

import { getStatement } from "../../../utils/Api";

export default class Statement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      statementLines: "",
    };
  }

  componentDidMount() {
    this.apiStatement();
  }

  /**
   * Query the api for "statement" information.
   */
  async apiStatement() {
    let statementRes = await getStatement();
    if (statementRes !== null && statementRes.success) {
      this.setState({ statementLines: statementRes.data });
    }
  }

  /**
   * Generate a <p> line for every line in the passed array.
   */
  generateStatementLines(data) {
    return data.map((p, k) => <p key={k}>{p}</p>);
  }

  render() {
    if (this.state.statementLines.length > 0) {
      return (
        <div className="background-solid">
          <div className="text-break">
            <h2 style={{ textAlign: "center" }}>Statement</h2>
            {this.generateStatementLines(this.state.statementLines)}
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}
