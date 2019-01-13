import React from 'react';
import { ANIMALS } from 'petfinder-client';
import { SearchConsumer } from './SearchContext';

class SearchBox extends React.Component {
    handleSubmitForm = (event) => {
        event.preventDefault();
        this.props.search();
    }
    render () {
        return (
            <SearchConsumer>
            {
                context => (
                    <div className="search-params">
                    <form onSubmit={this.handleSubmitForm}>
                <label htmlFor="location">Location
                    <input
                    id="location"
                    onChange={context.handleLocationChange}
                    placeholder="Location"
                    value={context.location}
                    />
                </label>
                <label htmlFor="animal">
                    Animal
                    <select
                    id="animal"
                    value={context.animal}
                    onChange={context.handleAnimalChange}
                    onBlur={context.handleAnimalChange}>
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
                        value={context.breed}
                        onChange={context.handleBreedChange}
                        onBlur={context.handleBreedChange}
                        disabled={context.breeds.length === 0}>
                            <option value="">{
                                context.breeds.length !== 0 ?
                                "Please select a breed" : ""
                             } </option>
                            {
                                context.breeds.map(breed => 
                                (<option key={breed} value={breed}>{breed}</option>))
                            }
                        </select>
                    </label>
                </label>
                <button>Submit</button>
                </form>
            </div>
                )
            }
            </SearchConsumer>
        )
    }
}

export default SearchBox;