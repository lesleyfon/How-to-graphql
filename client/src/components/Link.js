import React, { Component } from "react";

class Link extends Component {
  render() {
    return (
      <div className="links">
        <p>{this.props.link.description}</p>
        <a href={`http://${this.props.link.url}`} target="_blank">
          {this.props.link.url}
        </a>
      </div>
    );
  }
}

export default Link;
