/* global React ReactDOM */
// The above is used to ommit throwing error on global React and ReactDOM object

import React from 'react';
import { render } from 'react-dom';
import Pet from './Pet';

class App extends React.Component {
  handleTitleClick() {
    alert("did you dare to click me");
  }
  render() {
    return React.createElement("div", { id: "myId" }, [
      React.createElement(
        "h1",
        { onClick: this.handleTitleClick },
        "You can adopt me here"
      ),
      React.createElement(Pet, {
        name: "Luna",
        animal: "dog",
        breed: "Havanese"
      }),
      React.createElement(Pet, {
        name: "Pepper",
        animal: "bird",
        breed: "Cockatiel"
      }),
      React.createElement(Pet, {
        name: "Doink",
        animal: "cat",
        breed: "Mixed"
      })
    ]);
  }
}

render(React.createElement(App), document.getElementById("root"));
