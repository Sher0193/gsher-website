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

  async apiStatement() {
    let statementRes = await getStatement();
    if (statementRes !== null && statementRes.success) {
      this.setState({ statementLines: statementRes.data });
    }
  }

  generateStatementLines(data) {
    return data.map((p, k) => <p key={k}>{p}</p>);
  }

  render() {
    if (this.state.statementLines.length > 0) {
      return (
        <div className="text-break">
          <h3 style={{ textAlign: "center" }}>Statement</h3>
          {this.generateStatementLines(this.state.statementLines)}
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}
