import React from "react";
import "./Sidenav.css";
import SubmitButton from "../../../components/Login/SubmitButton/SubmitButton";
import UserStore from "../../../stores/UserStore";
import config from "../../../config.json";

export default class Sidenav extends React.Component {
  async doLogout() {
    try {
      let res = await fetch(config.server + "logout", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        mode: "cors",
        credentials: "include",
      });

      let result = await res.json();

      if (result && result.success) {
        UserStore.isLoggedIn = false;
        UserStore.username = "";
      }
    } catch (e) {
      console.log(e);
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
