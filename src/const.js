const FilterType = {
  FUTURE: 'future',
  EVERYTHING: 'everything'
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
};

export {FilterType, SortType, UserAction, UpdateType};
