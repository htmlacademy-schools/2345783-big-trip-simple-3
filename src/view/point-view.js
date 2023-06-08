import { convertToEventDateTime, convertToEventDate, convertToDateTime, convertToTime } from '../util';
import AbstractView from '../framework/view/abstract-view';

function createOffersTemplate(offers, offersIDs, type) {
  const currentTypeOffers = offers.find((el) => el.type === type).offers;
  return currentTypeOffers.filter((el) => offersIDs.includes(el.id)).map((offer) => `
    <li class="event__offer">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </li>
  `).join('');
}

function createPointTemplate(point, allOffers, allDestinations) {
  const basePrice = point.basePrice;
  const dateFrom = point.dateFrom;
  const dateTo = point.dateTo;
  const destination = point.destination;
  const type = point.type;
  const offersIDs = point.offersIDs;
  const destinationName = allDestinations.find((dest) => dest.id === destination).name;

  const eventDateTime = convertToEventDateTime(dateFrom);
  const eventDate = convertToEventDate(dateFrom);
  const fromDateTime = convertToDateTime(dateFrom);
  const fromTime = convertToTime(dateFrom);
  const toDateTime = convertToDateTime(dateTo);
  const toTime = convertToTime(dateTo);
  const offersTemplate = createOffersTemplate(allOffers, offersIDs, type);

  return(
    `<li class="trip-events__item">
        <div class="event">
          <time class="event__date" datetime="${eventDateTime}">${eventDate}</time>
          <div class="event__type">
            <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
          </div>
          <h3 class="event__title">${type} ${destinationName}</h3>
          <div class="event__schedule">
            <p class="event__time">
              <time class="event__start-time" datetime="${fromDateTime}">${fromTime}</time>
              &mdash;
              <time class="event__end-time" datetime="${toDateTime}">${toTime}</time>
            </p>
          </div>
          <p class="event__price">
            &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
          </p>
          <h4 class="visually-hidden">Offers:</h4>
          <ul class="event__selected-offers">
            ${offersTemplate}
          </ul>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </div>
      </li>`
  );
}

export default class Point extends AbstractView {
  #point = null;
  #offers = null;
  #destinations = null;
  #handleEditClick = null;

  constructor({point, offers, destinations, onEditClick}) {
    super();
    this.#point = point;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#handleEditClick = onEditClick;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  }

  get template() {
    return createPointTemplate(this.#point, this.#offers, this.#destinations);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };
}
