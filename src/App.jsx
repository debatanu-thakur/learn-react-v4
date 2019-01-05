/* global React ReactDOM */
// The above is used to ommit throwing error on global React and ReactDOM object

import React from 'react';
import { render } from 'react-dom';
import Pet from './Pet.jsx';

class App extends React.Component {
  handleTitleClick() {
    alert("did you dare to click me");
  }
  render() {
    return (
      <div id="myId">
        <h1>You can adopt me here</h1>
        <Pet name="Luna" animal="dog" breed="Havanese" />
        <Pet name="Pepper" animal="bird" breed="Cockatiel" />
        <Pet name="Doink" animal="cat" breed="Mixed" />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
