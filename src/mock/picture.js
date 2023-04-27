import { getRandomPicture, getRandomArrayElement } from '../util';
import { descriptionPhrases } from './data';

const createPictures = () => ({
  src: getRandomPicture(),
  description: getRandomArrayElement(descriptionPhrases)
});

export {createPictures};
