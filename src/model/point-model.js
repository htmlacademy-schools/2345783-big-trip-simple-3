export default class PointModel {
  #points = null;

  constructor(points) {
    this.#points = points;
  }

  get points() {
    return this.#points;
  }
}
