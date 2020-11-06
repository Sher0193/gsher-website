import React from "react";

import "./Site.css";

import {
  getAbout,
  getStatement,
} from "../../../utils/Api";

export default class Site extends React.Component {
    
    constructor(props) {
    super(props);
    this.state = {
        aboutValue: "",
      statementValue: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }
    
    componentDidMount() {
       this.loadText();
    }
    
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
    
    handleChange = event => {
    }
    
    render() {
        return (
             <div className="siteContainer">
              <div className="statement-form">
                <form name="statement-form" onSubmit={this.onSubmit}>
                <textarea name="statement" value={this.state.statementValue}/>
                <textarea name="about" value={this.state.aboutValue}/>
                </form>
             </div>
             </div>
        );
    }
}
