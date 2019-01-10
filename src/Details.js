import React from "react";
import { navigate } from "@reach/router";
import { petfinder } from "./petfinder";
import Carousel from "./Carousel";

class Details extends React.Component {
  state = {
    loading: true
  };

  componentDidMount() {
    petfinder.pet
      .get({
        output: "full",
        id: this.props.id
      })
      .then(data => {
        let breed = "";
        const pet = data.petfinder.pet;

        if (Array.isArray(data.petfinder.pet.breeds.breed)) {
          breed = data.petfinder.pet.breeds.breed.join(", ");
        } else {
          breed = data.petfinder.pet.breeds.breed;
        }
        this.setState({
          name: pet.name,
          breed,
          animal: pet.animal,
          location: `${pet.contact.city} - ${pet.contact.state}`,
          description: pet.description,
          media: pet.media,
          loading: false
        });
      })
      .catch(err => {
        this.setState({ error: err, loading: false });
        setTimeout(() => navigate("/"), 5000);
      });
  }
  render() {
    if (this.state.loading) {
      return <h1>Loading...</h1>;
    }
    const { name, breed, animal, location, description, media } = this.state;
    let photos = [];

    if (media && media.photos && media.photos.photo) {
      photos = media.photos.photo.filter(photo => photo["@size"] === "x");
    }
    return (
      <div className="details">
      <Carousel media={media}/>
        <div>
          <h1>{name}</h1>
          <h2>
            {animal} - {breed} - {location}
          </h2>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}

export default Details;
