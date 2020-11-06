import React from "react";

import "./Contact.css";

export default class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameValue: "",
      emailValue: "",
      subjectValue: "",
      messageValue: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = event => {
    switch (event.target.name) {
      case "name":
        if (event.target.value.length > 100) return;
        this.setState({ nameValue: event.target.value });
        break;
      case "email":
        if (event.target.value.length > 100) return;
        this.setState({ emailValue: event.target.value });
        break;
      case "subject":
        if (event.target.value.length > 100) return;
        this.setState({ subjectValue: event.target.value });
        break;
      case "message":
        if (event.target.value.length > 6000) return;
        this.setState({ messageValue: event.target.value });
        break;
      default:
        break;
    }
  }
  
  onSubmit = event => {
      event.preventDefault();
      let array = this.state.messageValue.split("\n");
      console.log(array);
  }
  
  render() {
    return (
      <div className="App">
        <div className="contact">
          <div className="form">
            <form name="contact-form" onSubmit={this.onSubmit}>
              <div className="form-title">GET IN TOUCH</div>
              <div className="form-subtitle">
                Contact me for more information about my work.
              </div>
              <div className="form-links">
                <a href="https://www.facebook.com/gregsherwood.artist">
                  Facebook
                </a>{" "}
                | <a href="mailto:greg.sherwood1@gmail.com">Email</a>
              </div>
              <label>
                Name *
                <input
                  name="name"
                  type="text"
                  value={this.state.nameValue}
                  onChange={this.handleChange}
                />
              </label>
              <label>
                Email Address *
                <input
                  name="email"
                  type="text"
                  value={this.state.emailValue}
                  onChange={this.handleChange}
                />
              </label>
              <label>
                Subject *
                <input
                  name="subject"
                  type="text"
                  value={this.state.subjectValue}
                  onChange={this.handleChange}
                />
              </label>
              <label>
                Message
                <textarea
                  name="message"
                  value={this.state.messageValue}
                  onChange={this.handleChange}
                />
              </label>
              <button disabled={false} className={"contact-submitBtn"} type="submit">
                SEND
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
