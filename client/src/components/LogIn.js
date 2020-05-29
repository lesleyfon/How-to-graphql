import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { AUTH_TOKEN } from "./../constant";

export default class LogIn extends Component {
  state = {
    login: true,
    email: "",
    name: "",
    password: "",
    error: {
      status: false,
      message: "",
    },
  };
  render() {
    const { email, password, login, name } = this.state;
    const LOGIN_MUTATION = gql`
      mutation LoginMutation($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          token
          user {
            name
            email
            id
          }
        }
      }
    `;
    const SINGUP_MUTATION = gql`
      mutation SignMutation(
        $name: String!
        $email: String!
        $number: Int
        $password: String!
      ) {
        login(
          name: $name
          email: $email
          number: $number
          password: $password
        ) {
          token
          user {
            name
            email
            id
          }
        }
      }
    `;
    return (
      <div>
        <h4 className="mv3">{login ? "Login" : "Sign Up"}</h4>
        {this.state.error && (
          <span className="error">{this.state.error.message}</span>
        )}
        <div className="flex flex-column">
          {!login && (
            <input
              name="name"
              value={name}
              placeholder="name"
              onChange={(event) => this.setState({ name: event.target.value })}
            />
          )}
          <input
            name="email"
            value={email}
            placeholder="Email"
            onChange={(event) => this.setState({ email: event.target.value })}
          />
          <input
            name="password"
            type="password"
            value={password}
            placeholder="Password"
            onChange={(event) =>
              this.setState({ password: event.target.value })
            }
          />
          <div className="flex mt3">
            <Mutation
              mutation={login ? LOGIN_MUTATION : SINGUP_MUTATION}
              variables={{ name, email, password }}
              onCompleted={(data) => {
                this._confirm(data);
              }}
              onError={(error) => {
                const message = error.message.split(":")[1];

                this.setState({
                  error: {
                    status: !this.state.error.status,
                    message: message,
                  },
                });
              }}
            >
              {(mutation) => (
                <div className="pointer mr2 button" onClick={mutation}>
                  {login ? "login" : "create account"}
                </div>
              )}
            </Mutation>

            <div
              className="pointer button"
              onClick={() => this.setState({ login: !login })}
            >
              {" "}
              {login
                ? "need to create an account?"
                : "already have an account?"}
            </div>
          </div>
        </div>
      </div>
    );
  }

  _confirm = async (data) => {
    const {
      login: { token },
    } = data;
    this._saveUserData(token);
    this.props.history.push("/");
  };

  _saveUserData = (token) => {
    localStorage.setItem(AUTH_TOKEN, token);
  };
}
