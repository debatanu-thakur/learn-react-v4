/* global React ReactDOM */
// The above is used to ommit throwing error on global React and ReactDOM object

import React from "react";
import { render } from "react-dom";
import { Router, Link } from "@reach/router";
import Results from "./Results";
import Details from "./Details";
import SearchParams from "./SearchParams";
import { 
   SearchProvider } from "./SearchContext";
import { petfinder } from "./petfinder";
/**
 * This is usually meant for the
 */

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: 'Seattle, WA',
      animal: '',
      breed: '',
      breeds: [],
      handleLocationChange: this.handleLocationChange,
      handleAnimalChange: this.handleAnimalChange,
      handleBreedChange: this.handleBreedChange,
      getBreeds: this.getBreeds,
    };
  }
  handleLocationChange = (event) => {
    this.setState({
        location: event.target.value,
        animal: ''
    })
}

handleAnimalChange = (event) => {
    if (this.state.animal !== event.target.value) {
        // The above line is to re-request on same data
        // due to multiple event call
        this.setState({
            animal: event.target.value,
            breed: '',
        }, this.getBreeds)
    }
}

handleBreedChange = (event) => {
    this.setState({
        breed: event.target.value
    })
}

getBreeds () {
    if ( this.state.animal ) {
        const promise = petfinder.breed.list({animal: this.state.animal})
        promise.then( data => {
            if (
                data.petfinder &&
                data.petfinder.breeds
                ) {
                    if (Array.isArray(data.petfinder.breeds.breed)) {
                        this.setState({
                            breeds: data.petfinder.breeds.breed,
                        })
                    } else {
                        this.setState({
                            breeds: [data.petfinder.breeds.breed],
                        })
                    }
            }
        }).catch(err => this.setState({error: err, breeds: [], }))
    } else {
        this.setState({
            breeds: [],
        })
    }
}
  render() {
    return (
      <div id="myId">
        <header>
          <Link to={"/"}>You can adopt me here</Link>
        </header>
        <SearchProvider
         value={this.state}>
        <Router>
          <Results path="/" />
          <Details path="details/:id/" />
          <SearchParams path="search-params" />
        </Router>
        </SearchProvider>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
