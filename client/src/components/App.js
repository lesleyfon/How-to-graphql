import React from "react";

import "./../styles/App.css";
import LinkList from "./LinkList";
import CreateLink from "./CreateLink";
import Header from "./Header";
import { Route } from "react-router";
function App() {
  return (
    <div className="ph3 pv1 background-gray">
      {" "}
      <Header />
      <Route exact path="/" component={(props) => <LinkList {...props} />} />
      <Route
        exact
        path="/create"
        component={(props) => <CreateLink {...props} />}
      />
    </div>
  );
}

export default App;
