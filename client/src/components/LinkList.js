import React, { Component } from "react";
import Link from "./Link";
import gql from "graphql-tag";
import { Query } from "react-apollo";

export default class LinkList extends Component {
  render() {
    const FEED_QUERY = gql`
      {
        feed {
          id
          description
          url
        }
      }
    `;
    return (
      <Query query={FEED_QUERY}>
        {({ data, loading, error }) => {
          if (loading) return <h1>Fetching Data</h1>;
          if (error) return <h1>GraphQL Error</h1>;
          const linkFeed = data.feed;

          return linkFeed.map((link) => <Link link={link} key={link.id} />);
        }}
      </Query>
    );
  }
}
