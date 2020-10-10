import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Navbar from '../../components/UI/Navbar/Navbar';

import Home from '../../containers/Home/Home';
import Admin from '../../containers/Admin/Admin';
import Contact from '../../containers/Contact/Contact';

export default class Layout extends Component {
    render() {
        return (
            <div className="App">
                <Switch>   
                    <Route path="/" exact component={Home} />
                    <Route path="/admin" exact component={Admin} />
                    <Route path="/contact" exact component={Contact} />
                </Switch>
                <Navbar />
            </div>
        );
    }
}
