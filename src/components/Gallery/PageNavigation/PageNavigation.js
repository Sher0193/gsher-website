import React from "react";

import "./PageNavigation.css";

const linkBgStyle = { width: "40px" };

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

  /**
   * Generate numbered page select buttons.
   */
  generatePages(pages, page, endPage, click, defaultClass) {
    return pages(page, endPage).map((x) => (
      <div
        key={"pgnav" + x}
        style={linkBgStyle}
        active={page === x}
        onClick={() => click(x)}
        className={
          page === x
            ? defaultClass + " pgnav-btn-active pgnav-btn-number"
            : defaultClass + " pgnav-btn-number"
        }
      >
        {x > 99 ? <p style={{ height: "2px", marginLeft: "-5px" }}>{x}</p> : x}
      </div>
    ));
  }

  render() {
    let defaultClass = this.state.loaded
      ? "pgnav-btn pgnav-btn-loaded"
      : "pgnav-btn";
    return (
      <div className={"page-navigation-container"}>
        <div className={"nav-buttons-container"}>
          <div
            className={
              this.props.page <= 1
                ? defaultClass + " pgnav-btn-disabled"
                : defaultClass
            }
            onClick={() => this.props.click(1)}
          >
            {"<<"}
          </div>
          <div
            className={
              this.props.page <= 1
                ? defaultClass + " pgnav-btn-disabled"
                : defaultClass
            }
            disabled={this.props.page <= 1}
            onClick={() =>
              this.props.click(
                this.props.page > 1 ? this.props.page - 1 : this.props.page
              )
            }
          >
            {"<"}
          </div>

          {this.generatePages(
            this.props.pages,
            this.props.page,
            this.props.endPage,
            this.props.click,
            defaultClass
          )}

          <div
            className={
              this.props.page >= this.props.endPage
                ? defaultClass + " pgnav-btn-disabled"
                : defaultClass
            }
            disabled={this.props.page >= this.props.endPage}
            onClick={() =>
              this.props.click(
                this.props.page < this.props.endPage
                  ? this.props.page + 1
                  : this.props.page
              )
            }
          >
            {">"}
          </div>
          <div
            className={
              this.props.page >= this.props.endPage
                ? defaultClass + " pgnav-btn-disabled"
                : defaultClass
            }
            disabled={this.props.page >= this.props.endPage}
            onClick={() => this.props.click(this.props.endPage)}
          >
            {">>"}
          </div>
        </div>
      </div>
    );
  }
}
