import { UpdateType } from '../const';
import Observable from '../framework/observable';
export default class PointModel extends Observable {
  #tripPointApiService = null;
  #tripPoints = [];
  #offers = [];
  #destinations = [];

  constructor ({pointsApiService}) {
    super();
    this.#tripPointApiService = pointsApiService;

  }

  get points() {
    return this.#tripPoints;
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }

  async init() {
    try {
      const tripPoints = await this.#tripPointApiService.tripPoints;
      this.#tripPoints = tripPoints.map(this.#adaptToClient);
      this.#offers = await this.#tripPointApiService.offers;
      this.#destinations = await this.#tripPointApiService.destinations;
    } catch(err) {
      this.#tripPoints = [];
      this.#offers = [];
      this.#destinations = [];
    }
    this._notify(UpdateType.INIT);
  }

  async updatePoint(updateType, update) {
    const index = this.#tripPoints.findIndex((tripPoint) => tripPoint.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting tripPoint');
    }

    try {
      const response = await this.#tripPointApiService.updatePoint(update);
      const updatedTripPoint = this.#adaptToClient(response);
      this.#tripPoints = [
        ...this.points.slice(0, index),
        updatedTripPoint,
        ...this.#tripPoints.slice(index + 1),
      ];

      this._notify(updateType, updatedTripPoint);
    } catch(err) {
      throw new Error('Can\'t update tripPoint');
    }
  }

  async addPoint(updateType, update) {
    try {
      const response = await this.#tripPointApiService.addPoint(update);
      const newTripPoint = this.#adaptToClient(response);
      this.#tripPoints = [newTripPoint, ...this.#tripPoints];
      this._notify(updateType, newTripPoint);
    } catch(err) {
      throw new Error('Can\'t add tripPoint');
    }
  }

  async deletePoint(updateType, update) {
    const index = this.#tripPoints.findIndex((tripPoint) => tripPoint.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting tripPoint');
    }

    try {
      await this.#tripPointApiService.deletePoint(update);
      this.#tripPoints = [
        ...this.points.slice(0, index),
        ...this.#tripPoints.slice(index + 1),
      ];
      this._notify(updateType);
    } catch(err) {
      throw new Error('Can\'t delete tripPoint');
    }
  }

  #adaptToClient(tripPoint) {
    const adaptedTripPoint = {...tripPoint,
      dateFrom: tripPoint['date_from'],
      dateTo: tripPoint['date_to'],
      offersIDs: tripPoint['offers'],
      basePrice: tripPoint['base_price'],
    };

    delete adaptedTripPoint['date_from'];
    delete adaptedTripPoint['date_to'];
    delete adaptedTripPoint['base_price'];
    delete adaptedTripPoint['offers'];

    return adaptedTripPoint;
  }
}
