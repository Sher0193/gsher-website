import React from "react";
import "./AdminPanel.css";

import UserStore from "../../../stores/UserStore";
import { logOut } from "../../../utils/Api";

import config from "../../../config.json";

export default class AdminPanel extends React.Component {
  /**
   * Log out the current user.
   */
  async doLogout() {
    let result = await logOut();

    if (result && result.success) {
      UserStore.isLoggedIn = false;
      UserStore.username = "";
    }
  }

  render() {
    return (
      <adminnav>
        <ul className="menu">
          <a className="item" href="/admin/site">
            Site
          </a>
          <a className="item" href="/admin/posts">
            Posts
          </a>
          <a className="item" href={config.server + "api/analytics"}>
            Analytics
          </a>
          <div className="item" onClick={() => this.doLogout()}>
            Log Out
          </div>
        </ul>
      </adminnav>
    );
  }
}
