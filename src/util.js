import dayjs from 'dayjs';
import { FilterType } from './const.js';

const EVENT_DATE_FORMAT = 'MMM D';
const TIME_FORMAT = 'H:mm';
const FORM_DATE_FORMAT = 'DD/MM/YY';
const BASIC_DATE_FORMAT = 'DD/MM/YY HH:mm';

const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];
const getRandomPrice = () => Math.floor(Math.random() * 1000) + 100;
const getRandomId = () => Math.floor(Math.random() * 100) + 1;
const getRandomPicture = () => `http://picsum.photos/248/152?r=${getRandomId()}`;

const convertToEventDateTime = (date) => date.substring(0, date.indexOf('T'));
const convertToEventDate = (date) => dayjs(date).format(EVENT_DATE_FORMAT);
const convertToDateTime = (date) => date.substring(0, date.lastIndexOf(':'));
const convertToTime = (date) => dayjs(date).format(TIME_FORMAT);
const convertToUpperCase = (type) => type.charAt(0).toUpperCase() + type.slice(1);
const convertToFormDate = (date) => dayjs(date).format(FORM_DATE_FORMAT);
const convertToBasicFormat = (date) => dayjs(date).format(BASIC_DATE_FORMAT);

const isEscapeKey = (evt) => evt.key === 'Escape';

const isDateToToday = (point) => point.dateTo && dayjs().isBefore(point.dateTo, 'D');

const filter = {
  [FilterType.FUTURE]: (points) => points.filter((point) => isDateToToday(point)),
  [FilterType.EVERYTHING]: (points) => points
};

const updateItem = (items, update) => items.map((item) => item.id === update.id ? update : item);

function sortByDay(pointA, pointB) {
  return dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
}

function sortByPrice(pointA, pointB) {
  return pointB.basePrice - pointA.basePrice;
}

export {convertToBasicFormat, sortByDay, sortByPrice, filter, isEscapeKey, getRandomArrayElement, getRandomPrice, getRandomId, getRandomPicture, convertToEventDateTime, convertToEventDate, convertToDateTime, convertToTime, convertToUpperCase, convertToFormDate, updateItem};
