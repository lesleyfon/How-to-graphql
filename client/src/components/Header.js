import React, { Component } from "react";

import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { AUTH_TOKEN } from "../constant";

class Header extends Component {
  componentDidMount() {
    const authToken = localStorage.getItem(AUTH_TOKEN);
    authToken
      ? this.props.history.push("/")
      : this.props.history.push("/login");
  }
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN);

    return (
      <div className="flex pa1 justify-between nowrap orange">
        <div className="flex flex-fixed black">
          <div className="fw7 mr1">Hacker News</div>
          <Link to="/" className="ml1 no-underline black">
            new
          </Link>

          {authToken && (
            <>
              <div className="ml1">|</div>
              <Link to="/create" className="ml1 no-underline black">
                submit
              </Link>
            </>
          )}

          {authToken ? (
            <>
              <div className="ml1">|</div>
              <Link
                to="/login"
                className="ml1 no-underline black"
                onClick={() => {
                  localStorage.removeItem(AUTH_TOKEN);
                  this.props.history.push("/login");
                }}
              >
                Logout
              </Link>
            </>
          ) : (
            <>
              <div className="ml1">|</div>
              <Link to="/login" className="ml1 no-underline black">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
