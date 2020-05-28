import React, { Component } from "react";

class Link extends Component {
  render() {
    return (
      <div>
        Link: {this.props.link.url}
        Description: {this.props.link.description}
      </div>
    );
  }
}

export default Link;
