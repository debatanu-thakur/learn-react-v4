/* global React ReactDOM */
// The above is used to ommit throwing error on global React and ReactDOM object

import React from 'react';
import Pet from './Pet';
import { petfinder } from './petfinder';

/**
 * This is usually meant for the 
 */


class Results extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pets: []
    };
  }

  componentDidMount () {
    const promise = petfinder.pet.find({output: "full", location: "Seattle, WA"});

    promise.then( data => {
      let pets = [];
      if ( data.petfinder.pets && data.petfinder.pets.pet ) {
         if ( Array.isArray(data.petfinder.pets.pet)) {
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
  handleTitleClick() {
    alert("did you dare to click me");
  }
  render() {
    return (
      <div id="myId" className="search">
        {this.state.pets.map( pet => {
          let breed = "";
          if (Array.isArray(pet.breeds.breed)) {
            breed = pet.breeds.breed.join(', ');
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

export default Results;