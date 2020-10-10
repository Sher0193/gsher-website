import React from 'react';
import './Navbar.css';

const top = {top: '-50px'};
const scrolled = {top: '0px'};

class Navbar extends React.Component {
    constructor() {
        super();
        this.state = {
            scrollStyle: scrolled
        };

        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
    

    handleScroll = e => {
        //if (path === "/") {
            if (window.scrollY < 50) {
            this.setState({scrollStyle: scrolled})
            } else if (window.scrollY > 50) {
            this.setState({scrollStyle: top})
            }
        //}
    }
    
    render() {
        return (
            <div className="navbar" onScroll={this.handleScroll} style={this.state.scrollStyle}>

                <a href="blog">Blog</a>
                <a href="contact">Contact</a>
                <a href="gallery">Gallery</a>
            </div>
        );
    }
}
export default Navbar;
