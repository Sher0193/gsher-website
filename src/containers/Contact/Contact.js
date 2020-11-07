import React from "react";

import "./Contact.css";

import ContactForm from "../../components/Contact/ContactForm/ContactForm";

export default class About extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="contact">
          <div className="form">
            <div className="heading-container">
              <div className="contact-title">GET IN TOUCH</div>
              <div className="contact-subtitle">
                Contact me for more information about my work.
              </div>
              <div className="contact-links">
                <a href="https://www.facebook.com/gregsherwood.artist">
                  Facebook
                </a>{" "}
                | <a href="mailto:greg.sherwood1@gmail.com">Email</a>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </div>
    );
  }
}
