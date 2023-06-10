import AbstractView from '../framework/view/abstract-view.js';

function createNoPointsTemplate (filterType) {
  if (filterType === 'future') {
    return '<p class="trip-events__msg">There are no future points now</p>';
  }
  return '<p class="trip-events__msg">Click New Event to create your first point</p>';
}

export default class NoPointsView extends AbstractView {
  #filterType = null;
  constructor({filterType}){
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoPointsTemplate(this.#filterType);
  }
}
