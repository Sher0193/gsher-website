import React from "react";
import { observer } from "mobx-react";
import { Route } from "react-router-dom";

import UserStore from "../../stores/UserStore";
import LoginForm from "../../components/Login/LoginForm/LoginForm";

import Sidenav from "../../components/UI/Sidenav/Sidenav";
import PostForm from "../../components/Admin/PostForm/PostForm";
import Posts from "../../components/Admin/Posts/Posts";
import Site from "../../components/Admin/Site/Site";

import config from "../../config.json";

import "./Admin.css";

class Admin extends React.Component {
  async componentDidMount() {
    try {
      console.log(config.server);
      let res = await fetch(config.server + "isLoggedIn", {
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
        UserStore.loading = false;
        UserStore.isLoggedIn = true;
        UserStore.username = result.username;
      } else {
        UserStore.loading = false;
        UserStore.isLoggedIn = false;
      }
    } catch (e) {
      UserStore.loading = false;
      UserStore.isLoggedIn = false;
    }
  }

  onSubmit() {}

  /*<div className="container">Welcome, {UserStore.username}</div>*/

  render() {
    if (UserStore.loading) {
      return <div className="App">Loading, please wait...</div>;
    } else {
      if (UserStore.isLoggedIn) {
        return (
          <div className="App">
            <Route exact path={"/admin"}>
              <div className="container">Welcome, {UserStore.username}</div>
            </Route>
            <Route exact path={"/admin/posts/edit"}>
              <div className="container">
                <PostForm params={this.props.location.search} />
              </div>
            </Route>
            <Route exact path={"/admin/posts/new"}>
              <div className="container">
                <PostForm />
              </div>
            </Route>
            <Route exact path={"/admin/posts/"}>
              <div className="container">
                <Posts />
              </div>
            </Route>
            <Route exact path={"/admin/site/"}>
              <div className="container">
                <Site />
              </div>
            </Route>
            <Sidenav />
          </div>
        );
      } else {
        return (
          <div className="App">
            <div className="container">
              <LoginForm />
            </div>
          </div>
        );
      }
    }
  }
}
export default observer(Admin);
