/* global React ReactDOM */
// The above is used to ommit throwing error on global React and ReactDOM object

import React from 'react';
import { render } from 'react-dom';
import { Router, Link } from '@reach/router';
import Results from './Results';
import Details from './Details';
/**
 * This is usually meant for the 
 */

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id="myId">
      <header>
      <Link to={"/"}>
          You can adopt me here
        </Link>
        </header>
        <Router>
          <Results path="/"/>
          <Details path="details/:id/"/>
        </Router>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
