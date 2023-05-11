import { getRandomPoint } from '../mock/point';

const POINT_COUNT = 3;

export default class PointModel {
  #points = Array.from({length: POINT_COUNT}, getRandomPoint);

  get points() {
    return this.#points;
  }
}
