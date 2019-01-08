import React from 'react';
import pf from 'petfinder-client';
import { navigate } from '@reach/router';
import Pet from './Pet';


const petfinder = pf({
    key: process.env.API_KEY,
    secret: process.env.API_SECRET
});

class Details extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true
        }
    }

    componentDidMount () {
        petfinder.pet.get({
            output: 'full',
            id: this.props.id
        }).then( data => {
            let breed = '';
            const pet = data.petfinder.pet;

            if (Array.isArray(data.petfinder.pet.breeds.breed)) {
                breed = data.petfinder.pet.breeds.breed.join(', ')
            } else {
                breed = data.petfinder.pet.breeds.breed
            }
            this.setState({
                name: pet.name,
                breed,
                animal: pet.animal,
                location: `${pet.contact.city} - ${pet.contact.state}`,
                description: pet.description,
                media: pet.media,
                loading: false
            })
        }).catch(err => {
            this.setState({error: err})
            setTimeout(() => navigate('/'), 5000)
        });

        
    }
    render() {
        const {name, breed, animal, location, description, media} = this.state;
        let photos = [];
        
        if (media && media.photos && media.photos.photo) {
            photos = media.photos.photo.filter(photo => photo["@size"] === "x")
        }
        return (
            <div className="details">
                <div>
                    <h1>{name}</h1>
                    <h2>{animal} - {breed} - {location}</h2>
                    <img src={photos && photos.length && photos[0].value} alt={name} />
                    <p>{description}</p>
                </div>
            </div>
        );
    }
}

export default Details;