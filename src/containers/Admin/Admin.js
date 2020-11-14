import React from "react";
import { observer } from "mobx-react";
import { Route } from "react-router-dom";

import UserStore from "../../stores/UserStore";
import LoginForm from "../../components/Login/LoginForm/LoginForm";

import AdminPanel from "../../components/UI/AdminPanel/AdminPanel";
import PostForm from "../../components/Admin/AdminForm/PostForm";
import VendorForm from "../../components/Admin/AdminForm/VendorForm";
import Posts from "../../components/Admin/Posts/Posts";
import Site from "../../components/Admin/Site/Site";

import { isLoggedIn } from "../../utils/Api";

import "./Admin.css";

class Admin extends React.Component {
  async componentDidMount() {
    let result = await isLoggedIn();

    if (result && result.success) {
      UserStore.loading = false;
      UserStore.isLoggedIn = true;
      UserStore.username = result.username;
    } else {
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
            <AdminPanel />
            <Route exact path={"/admin"}>
              <div className="empty-container admin-container">
                Welcome, {UserStore.username}
              </div>
            </Route>
            <Route exact path={"/admin/posts/edit"}>
              <div className="empty-container">
                <PostForm params={this.props.location.search} />
              </div>
            </Route>
            <Route exact path={"/admin/posts/vendors/edit"}>
              <div className="empty-container">
                <VendorForm params={this.props.location.search} />
              </div>
            </Route>
            <Route exact path={"/admin/posts/vendors/new"}>
              <div className="empty-container">
                <VendorForm />
              </div>
            </Route>
            <Route exact path={"/admin/posts/new"}>
              <div className="empty-container">
                <PostForm />
              </div>
            </Route>
            <Route exact path={"/admin/posts/"}>
              <div className="empty-container">
                <Posts />
              </div>
            </Route>
            <Route exact path={"/admin/site/"}>
              <div className="empty-container">
                <Site />
              </div>
            </Route>
          </div>
        );
      } else {
        return (
          <div className="App">
            <div className="login-container empty-container">
              <LoginForm />
            </div>
          </div>
        );
      }
    }
  }
}
export default observer(Admin);
