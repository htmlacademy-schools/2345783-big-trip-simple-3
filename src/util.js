import dayjs from 'dayjs';
import { getOfferName, getOfferPrice } from './mock/data.js';
import { FilterType } from './const.js';

const EVENT_DATE_FORMAT = 'MMM D';
const TIME_FORMAT = 'H:mm';
const FORM_DATE_FORMAT = 'DD/MM/YY';

const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

const getRandomPrice = () => Math.floor(Math.random() * 1000) + 100;

const getRandomId = () => Math.floor(Math.random() * 100) + 1;

const getRandomPicture = () => `http://picsum.photos/248/152?r=${getRandomId()}`;

const convertToEventDateTime = (date) => date.substring(0, date.indexOf('T'));
const convertToEventDate = (date) => dayjs(date).format(EVENT_DATE_FORMAT);
const convertToDateTime = (date) => date.substring(0, date.indexOf('.'));
const convertToTime = (date) => dayjs(date).format(TIME_FORMAT);
const convertToUpperCase = (type) => type.charAt(0).toUpperCase() + type.slice(1);
const convertToFormDate = (date) => dayjs(date).format(FORM_DATE_FORMAT);

function createOffersTemplate(offers) {
  return offers.map((offer) => `
    <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer}" type="checkbox" name="event-offer-${offer}" checked>
      <label class="event__offer-label" for="event-offer-${offer}">
        <span class="event__offer-title">${getOfferName(offer)}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${getOfferPrice(offer)}</span>
      </label>
    </div>
  `).join('');
}

const isEscapeKey = (evt) => evt.key === 'Escape';

const isDateToToday = (point) => dayjs(point.dateFrom).isBefore(dayjs(), 'D') || dayjs(point.dateFrom).isSame(dayjs(), 'D');

const filter = {
  [FilterType.FUTURE]: (tripPoints) => tripPoints.filter((tripPoint) => isDateToToday(tripPoint.dateFrom)),
  [FilterType.EVERYTHING]: (tripPoints) => tripPoints,
};

export {filter, isEscapeKey, createOffersTemplate, getRandomArrayElement, getRandomPrice, getRandomId, getRandomPicture, convertToEventDateTime, convertToEventDate, convertToDateTime, convertToTime, convertToUpperCase, convertToFormDate};
