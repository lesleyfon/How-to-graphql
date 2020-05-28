import React, { Component } from "react";
import Link from "./Link";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { AUTH_TOKEN } from "../constant";

export default class LinkList extends Component {
  componentDidMount() {
    const token = localStorage.getItem(AUTH_TOKEN);
    token ? this.props.history.push("/") : this.props.history.push("/login");
  }
  render() {
    // Schema defination for querying data
    // The gql function us used for parsing plain string into graphql code
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
      // The Query HOC is going to resolve the Query string above. it accepts a function which is where we are able to get infomation about graphql query
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
