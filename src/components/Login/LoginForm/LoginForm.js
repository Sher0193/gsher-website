import React from "react";
import InputField from "../InputField/InputField";
import SubmitButton from "../SubmitButton/SubmitButton";
import UserStore from "../../../stores/UserStore";

import { logIn } from "../../../utils/Api";

import "./LoginForm.css";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      buttonDisabled: false,
    };
  }

  setInputValue(property, val) {
    val = val.trim();
    if (val.length > 12) {
      return;
    }
    this.setState({
      [property]: val,
    });
  }

  resetForm() {
    this.setState({
      username: "",
      password: "",
      buttonDisabled: "",
    });
  }

  async doLogin() {
    if (!this.state.username || !this.state.password) {
      return;
    }

    this.setState({
      buttonDisabled: true,
    });

    let result = await logIn(this.state.username, this.state.password);
    if (result && result.success) {
      UserStore.isLoggedIn = true;
      UserStore.username = result.username;
    } else if (result && !result.success) {
      this.resetForm();
      alert(result.msg);
    } else {
      this.resetForm();
    }
  }

  render() {
    return (
      <div className="loginForm">
        Log In
        <InputField
          type="text"
          placeholder="Username"
          value={this.state.username ? this.state.username : ""}
          onChange={(val) => this.setInputValue("username", val)}
        />
        <InputField
          type="password"
          placeholder="Password"
          value={this.state.password ? this.state.password : ""}
          onChange={(val) => this.setInputValue("password", val)}
        />
        <SubmitButton
          text="Login"
          disabled={this.state.buttonDisabled}
          onClick={() => this.doLogin()}
        />
      </div>
    );
  }
}
export default LoginForm;
