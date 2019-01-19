/* global React ReactDOM */
// The above is used to ommit throwing error on global React and ReactDOM object

import React from "react";
import Pet from "./Pet";
import { petfinder } from "./petfinder";
import SearchBox from "./SearchBox";
import { connect } from "react-redux";
/**
 * This is usually meant for the
 */

class Results extends React.Component {
  state = {
    pets: []
  };
  componentDidMount() {
    this.search();
  }

  search = () => {
    const promise = petfinder.pet.find({
      output: "full",
      location: this.props.location,
      animal: this.props.animal,
      breed: this.props.breed
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
  };
  render() {
    return (
      <div id="myId" className="search">
        <SearchBox search={this.search} />
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

const mapStateToProps = ({ location, animal, breed }) => ({
  location,
  animal,
  breed
});

export default connect(mapStateToProps)(Results);
