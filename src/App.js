/* global React ReactDOM */
// The above is used to ommit throwing error on global React and ReactDOM object

import React from "react";
import { Router, Link } from "@reach/router";
import Results from "./Results";
import Details from "./Details";
import SearchParams from "./SearchParams";
import { Provider } from "react-redux";
import store from "./store";

class App extends React.Component {
  render() {
    return (
      <div id="myId">
        <header>
          <Link to={"/"}>You can adopt me here</Link>
        </header>
        <nav className="">
          <Link to={"/search-params"}>Find more pets</Link>
        </nav>
        <Provider store={store}>
          <Router>
            <Results path="/" />
            <Details path="details/:id/" />
            <SearchParams path="search-params" />
          </Router>
        </Provider>
      </div>
    );
  }
}

export default App;
