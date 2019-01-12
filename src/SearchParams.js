import React from 'react';
import { ANIMALS } from 'petfinder-client';
import { petfinder } from './petfinder';

class SearchParams extends React.Component {
    state = {
        location: 'Seattle, WA',
        animal: '',
        breed: '',
        breeds: [],
    };
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
                        console.log("i am here")
                }
            }).catch(err => this.setState({error: err, breeds: [], }))
        } else {
            this.setState({
                breeds: [],
            })
        }
    }

    render () {
        return (
            <div className="search-params">
                <label htmlFor="location">Location
                    <input
                    id="location"
                    onChange={this.handleLocationChange}
                    placeholder="Location"
                    value={this.state.location}
                    />
                </label>
                <label htmlFor="animal">
                    Animal
                    <select
                    id="animal"
                    value={this.state.animal}
                    onChange={this.handleAnimalChange}
                    onBlur={this.handleAnimalChange}>
                        <option value="">Please select an animal</option>
                        {
                            ANIMALS.map(animal => 
                            (<option key={animal} value={animal}>{animal}</option>))
                        }
                    </select>
                    <label htmlFor="breed">
                    Breed
                        <select
                        id="breed"
                        value={this.state.breed}
                        onChange={this.handleBreedChange}
                        onBlur={this.handleBreedChange}
                        disabled={this.state.breeds.length === 0}>
                            <option value="">{
                                this.state.breeds.length !== 0 ?
                                "Please select a breed" : ""
                             } </option>
                            {
                                this.state.breeds.map(breed => 
                                (<option key={breed} value={breed}>{breed}</option>))
                            }
                        </select>
                    </label>
                </label>
            </div>
        )
    }
}

export default SearchParams;