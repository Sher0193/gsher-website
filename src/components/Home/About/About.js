import React from "react";

import "./About.css";

import { getAbout } from "../../../utils/Api";

export default class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      aboutLines: "",
    };
  }

  componentDidMount() {
    this.apiAbout();
  }

  async apiAbout() {
    let aboutRes = await getAbout();
    if (aboutRes !== null && aboutRes.success) {
      this.setState({ aboutLines: aboutRes.data });
    }
  }

  generateAboutLines(data) {
    return data.map((p, k) => <p key={k}>{p}</p>);
  }

  render() {
    if (this.state.aboutLines.length > 0) {
      return (
        <div className="text-break">
          <h3 style={{ textAlign: "center" }}>About</h3>
          {this.generateAboutLines(this.state.aboutLines)}
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}
