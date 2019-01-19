import { petfinder } from "../petfinder";
import { changeBreeds } from "./changeBreeds";

export function getBreeds() {
  return function getBreedsThunk(dispatch, getState) {
    const { animal } = getState();

    if (animal) {
      const promise = petfinder.breed.list({ animal });
      promise
        .then(data => {
          let breeds = [];
          if (data.petfinder && data.petfinder.breeds) {
            if (Array.isArray(data.petfinder.breeds.breed)) {
              breeds = data.petfinder.breeds.breed;
            } else {
              breeds = [data.petfinder.breeds.breed];
            }
          }
          dispatch(changeBreeds(breeds));
        })
        .catch(() => dispatch(changeBreeds([])));
    } else {
      dispatch(changeBreeds([]));
    }
  };
}
