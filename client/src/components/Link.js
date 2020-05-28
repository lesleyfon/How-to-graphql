import React, { Component } from "react";

class Link extends Component {
  render() {
    return (
      <div>
        <h3>Link: {this.props.link.url}</h3>
        <h5>Description: {this.props.link.description}</h5>
      </div>
    );
  }
}

export default Link;
