import React from "react";

import { sendEmail } from "../../../utils/Api";

export default class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameValue: "",
      emailValue: "",
      subjectValue: "",
      messageValue: "",
      disabled: false,
      sent: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * Handle updating state on all miscellaneous form element updating.
   */
  handleChange = (event) => {
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
  };

  /**
   * Handle submitting all form info to the server.
   * In this case, info is used to send an email.
   */
  async onSubmit(event) {
    event.preventDefault();
    this.setState({ disabled: true });
    let emailResult = await sendEmail(
      this.state.nameValue,
      this.state.emailValue,
      this.state.subjectValue,
      this.state.messageValue
    );
    if (emailResult && emailResult.success) {
      this.setState({ sent: true });
    } else {
      alert("Email did not send successfully.");
      this.setState({ disabled: false });
    }
  }

  render() {
    if (this.state.sent) {
      return (
        <div className="heading-container">
          <div className="contact-subtitle">Thank you for your message.</div>
        </div>
      );
    } else {
      let isEnabled = this.state.nameValue.length > 0 && this.state.emailValue.length > 0 && this.state.subjectValue.length > 0 && !this.state.disabled;
      return (
        <form name="contact-form" onSubmit={this.onSubmit}>
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
          <button
            disabled={!isEnabled}
            className={"contact-submitBtn"}
            type="submit"
          >
            {this.state.disabled ? "SENDING..." : "SEND"}
          </button>
        </form>
      );
    }
  }
}
