const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
};

const FilterTypeDescriptions = {
  [FilterType.EVERYTHING]: 'EVERYTHING',
  [FilterType.FUTURE]: 'FUTURE',
};

const SortType = {
  DAY: {text: 'day'},
  EVENT: {text: 'event'},
  TIME: {text: 'time'},
  PRICE: {text: 'price'},
  OFFERS: {text: 'offer'}
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT'
};

const pointTypes = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

export {FilterType, SortType, UserAction, UpdateType, pointTypes, FilterTypeDescriptions};
