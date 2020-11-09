import React from "react";
import "./Sidenav.css";
import SubmitButton from "../../../components/Login/SubmitButton/SubmitButton";

import UserStore from "../../../stores/UserStore";

import { logOut } from "../../../utils/Api";

export default class Sidenav extends React.Component {
  async doLogout() {
    let result = await logOut();

    if (result && result.success) {
      UserStore.isLoggedIn = false;
      UserStore.username = "";
    }
  }

  render() {
    return (
      <div className="sidenav">
        <a href="/admin">Admin</a>
        <a href="/admin/site">Site</a>
        <a href="/admin/posts">Posts</a>
        <SubmitButton
          text={"Log out"}
          disabled={false}
          onClick={() => this.doLogout()}
        />
      </div>
    );
  }
}
