import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
export default class CreateLink extends Component {
  state = {
    description: "",
    url: "",
  };

  componentDidMount() {}
  render() {
    const { description, url } = this.state;

    const POST_FEED = gql`
      mutation PostMutation($description: String!, $url: String!) {
        post(url: $url, description: $description) {
          id
          description
          url
        }
      }
    `;
    return (
      <div className="flex flex-column mt3">
        <input
          className="mb2"
          name="description"
          value={description}
          placeholder="description"
          onChange={(e) => this.setState({ description: e.target.value })}
        />
        <input
          className="mb2"
          name="url"
          placeholder="url"
          value={url}
          onChange={(e) => this.setState({ url: e.target.value })}
        />

        <Mutation mutation={POST_FEED} variables={{ description, url }}>
          {(PostMutation) => <button onClick={PostMutation}>Submit</button>}
        </Mutation>
      </div>
    );
  }
}
