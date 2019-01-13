import React from "react";
import { Link } from "@reach/router";
// const Pet1 = props => {
//   return React.createElement("div", {}, [
//     React.createElement("h1", {}, props.name),
//     React.createElement("h2", {}, props.animal),
//     React.createElement("h3", {}, props.breed)
//   ]);
// };
/**
 * This can also be written as
 *  className instead of class(since this name is reserved in js) attribute for css
 *  htmlFor instead of for(since this name is reserved in js) attributed
 * the below is jsx
 */
class Pet extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { id, name, animal, breed, media, location } = this.props;
    let photos = [];

    if (media && media.photos && media.photos.photo) {
      photos = media.photos.photo.filter(photo => photo["@size"] === "pn");
    }
    let img_photo = photos[0] ? photos[0].value : "";
    return (
      <Link to={`/details/${id}`} className="pet">
        <div className="image-container">
          <img src={img_photo} alt={name} />
        </div>
        <div className="info">
          <h1>{name}</h1>
          <h2>
            {animal} - {breed} - {location}
          </h2>
        </div>
      </Link>
    );
  }
}

export default Pet;
