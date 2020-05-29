import React from "react";

import "./../styles/App.css";
import LinkList from "./LinkList";
import CreateLink from "./CreateLink";
import Header from "./Header";
import { Route } from "react-router";
import LogIn from "./LogIn";
function App() {
  return (
    <div className="ph3 pv1 background-gray">
      {" "}
      <Header />
      <div className="divider" />
      <Route exact path="/" component={(props) => <LinkList {...props} />} />
      <Route
        exact
        path="/create"
        component={(props) => <CreateLink {...props} />}
      />
      <Route exact path="/login" component={(props) => <LogIn {...props} />} />
    </div>
  );
}

export default App;
