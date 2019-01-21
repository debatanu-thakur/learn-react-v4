import React from "react";
import { ANIMALS } from "./petfinder-client";
import { connect } from "react-redux";
import { getBreeds } from "./actionCreators/getBreeds";
import { changeAnimal } from "./actionCreators/changeAnimal";
import { changeLocation } from "./actionCreators/changeLocation";
import { changeBreed } from "./actionCreators/changeBreed";

class SearchBox extends React.Component {
  handleSubmitForm = event => {
    event.preventDefault();
    this.props.search();
  };
  render() {
    return (
      <div className="search-params">
        <form onSubmit={this.handleSubmitForm}>
          <label htmlFor="location">
            Location
            <input
              id="location"
              onChange={this.props.handleLocationChange}
              placeholder="Location"
              value={this.props.location}
            />
          </label>
          <label htmlFor="animal">
            Animal
            <select
              id="animal"
              value={this.props.animal}
              onChange={this.props.handleAnimalChange}
              onBlur={this.props.handleAnimalChange}
            >
              <option value="">Please select an animal</option>
              {ANIMALS.map(animal => (
                <option key={animal} value={animal}>
                  {animal}
                </option>
              ))}
            </select>
            <label htmlFor="breed">
              Breed
              <select
                id="breed"
                value={this.props.breed}
                onChange={this.props.handleBreedChange}
                onBlur={this.props.handleBreedChange}
                disabled={this.props.breeds.length === 0}
              >
                <option value="">
                  {this.props.breeds.length !== 0
                    ? "Please select a breed"
                    : ""}{" "}
                </option>
                {this.props.breeds.map(breed => (
                  <option key={breed} value={breed}>
                    {breed}
                  </option>
                ))}
              </select>
            </label>
          </label>
          <button>Submit</button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = ({ breed, breeds, animal, location }) => ({
  breed,
  breeds,
  animal,
  location
});

const mapDispatchToProps = dispatch => ({
  handleAnimalChange(event) {
    dispatch(changeAnimal(event.target.value));
    dispatch(getBreeds());
  },
  handleLocationChange(event) {
    dispatch(changeLocation(event.target.value));
  },
  handleBreedChange(event) {
    dispatch(changeBreed(event.target.value));
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBox);
