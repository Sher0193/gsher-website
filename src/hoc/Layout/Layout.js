import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Navbar from "../../components/UI/Navbar/Navbar";
import Footer from "../../components/UI/Footer/Footer";

import Home from "../../containers/Home/Home";
import Admin from "../../containers/Admin/Admin";
import Contact from "../../containers/Contact/Contact";
import Gallery from "../../containers/Gallery/Gallery";

export default class Layout extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/admin*" exact component={Admin} />
            <Route path="/contact" exact component={Contact} />
            <Route path="/gallery" exact component={Gallery} />
          </Switch>
        </div>
        <Footer />
        <Navbar />
      </div>
    );
  }
}
