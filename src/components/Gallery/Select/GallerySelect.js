import React from "react";

import Select from "react-select";
import makeAnimated from "react-select/animated";

import "./GallerySelect.css";

const animatedComponents = makeAnimated();

const colourStyles = {
    placeholder: (defaultStyles) => {
        return {
            ...defaultStyles,
            color: '#565656',
        }
    }
}

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }

  componentDidMount() {
    this.setState({ loaded: true });
  }

  render() {
    let selClass = this.state.loaded
      ? "react-select react-select-loaded"
      : "react-select";
    return (
      <Select
        aria-label={"Select a collection"}
        loadingMessage="Loading..."
        placeholder="Collections..."
        onChange={this.props.onChange}
        value={this.props.value}
        className={selClass}
        isMulti={true}
        options={this.props.options}
        components={animatedComponents}
        styles = {colourStyles}
      />
    );
  }
}
