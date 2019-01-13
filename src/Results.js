/* global React ReactDOM */
// The above is used to ommit throwing error on global React and ReactDOM object

import React from "react";
import Pet from "./Pet";
import { petfinder } from "./petfinder";
import SearchBox from "./SearchBox";
import { SearchConsumer } from "./SearchContext";

/**
 * This is usually meant for the
 */

class Results extends React.Component {
  state = {
    pets: []
  }
  componentDidMount() {
    console.log("i am here")
    this.search();
  }
  
  search = () => {
    const promise = petfinder.pet.find({
      output: "full",
      location: this.props.searchParams.location,
      animal: this.props.searchParams.animal,
      breed: this.props.searchParams.breed,
    });
    promise.then(data => {
      let pets = [];
      if (data.petfinder.pets && data.petfinder.pets.pet) {
        if (Array.isArray(data.petfinder.pets.pet)) {
          pets = data.petfinder.pets.pet;
        } else {
          pets = [data.petfinder.pets.pet];
        }
      }
      
      this.setState({
        pets
      });
    });
  }
  render() {
    return (
      <div id="myId" className="search">
      <SearchBox search={this.search}/>
        {this.state.pets.map(pet => {
          let breed = "";
          if (Array.isArray(pet.breeds.breed)) {
            breed = pet.breeds.breed.join(", ");
          } else {
            breed = pet.breeds.breed;
          }

          return (
            <Pet
              key={pet.id}
              animal={pet.animal}
              id={pet.id}
              name={pet.name}
              breed={breed}
              media={pet.media}
              location={`${pet.contact.city}, ${pet.contact.state}`}
            />
          );
        })}
      </div>
    );
  }
}

export default function ResultsData(props) {
  return (
    <SearchConsumer>
      {context => <Results {...props} searchParams={context}/>
      }
    </SearchConsumer>
  )
};
