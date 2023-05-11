import { descriptionPhrases, namesOfPlaces } from './data';
import { getRandomId, getRandomArrayElement } from '../util';
import { createPictures } from './picture';

const destinationsId = [];
const destinations = [];

const getRandomDestination = () => {
  let id = getRandomId();
  while (destinationsId.includes(id)) {
    id = getRandomId();
  }
  destinationsId.push(id);
  const description = getRandomArrayElement(descriptionPhrases);
  const name = getRandomArrayElement(namesOfPlaces);
  const pictures = createPictures();
  const destination = {
    id, description, name, pictures
  };
  destinations.push(destination);
  return id;
};

const getCityNameById = (id) => destinations.find((destination) => destination.id === id).name;
const getCityDescriptionById = (id) => destinations.find((destination) => destination.id === id).description;
const getCityPictureById = (id) => destinations.find((destination) => destination.id === id).pictures.src;
export {getRandomDestination, getCityNameById, getCityDescriptionById, getCityPictureById};
