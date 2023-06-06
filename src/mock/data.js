const pointTypes = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const offers = [
  {
    id: 1,
    title: 'Add luggage',
    price: 50
  },
  {
    id: 2,
    title: 'Travel by train',
    price: 40
  },
  {
    id: 3,
    title: 'Choose seats',
    price: 5
  },
  {
    id: 4,
    title: 'Switch to comfort',
    price: 80
  },
  {
    id: 5,
    title: 'Add meal',
    price: 15
  },
  {
    id: 6,
    title: 'Lunch in city',
    price: 30
  },
  {
    id: 7,
    title: 'Add breakfast',
    price: 50
  },
  {
    id: 8,
    title: 'Book tickets',
    price: 40
  },
  {
    id: 9,
    title: 'Order Uber',
    price: 20
  },
  {
    id: 10,
    title: 'Rent a car',
    price: 200
  }
];

const getOfferName = (offerId) => offers.find((offer) => offer.id === offerId).title;
const getOfferPrice = (offerId) => offers.find((offer) => offer.id === offerId).price;

const offersByType = [
  {
    type: 'taxi',
    offers: [offers[3], offers[8]]
  },

  {
    type: 'bus',
    offers: [offers[0], offers[2], offers[7]]
  },

  {
    type: 'train',
    offers: [offers[0], offers[2], offers[3], offers[4], offers[7]]
  },

  {
    type: 'ship',
    offers: [offers[0], offers[2], offers[3], offers[4], offers[7]]
  },

  {
    type: 'drive',
    offers: [offers[8], offers[9]]
  },

  {
    type: 'flight',
    offers: [offers[0], offers[1], offers[2], offers[3], offers[4], offers[7]]
  },

  {
    type: 'check-in',
    offers: [offers[6]]
  },

  {
    type: 'sightseeing',
    offers: [offers[5], offers[7]]
  },

  {
    type: 'restaurant',
    offers: [offers[2], offers[8]]
  },
];

const getArrayFromType = (type) => offersByType.find((offer) => offer.type === type).offers.map((off) => off.id);

const descriptionPhrases = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.', 'Aliquam id orci ut lectus varius viverra.', 'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.', 'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.', 'Aliquam erat volutpat.', 'Nunc fermentum tortor ac porta dapibus.', 'In rutrum ac purus sit amet tempus.'
];

const namesOfPlaces = [
  'Chamonix', 'Amsterdam', 'Geneva', 'Copenhagen', 'Murmansk', 'Liepaja'
];

const fromToDates = [
  {
    dateFrom: '2019-07-11T11:22:13.375Z',
    dateTo: '2019-07-11T11:40:13.375Z'
  },
  {
    dateFrom: '2019-07-13T11:22:13.375Z',
    dateTo: '2019-07-13T14:40:13.375Z'
  },
  {
    dateFrom: '2019-07-10T11:22:13.375Z',
    dateTo: '2019-07-10T11:40:13.375Z'
  },
  {
    dateFrom: '2019-07-15T09:15:13.375Z',
    dateTo: '2019-07-15T12:00:13.375Z'
  },
  {
    dateFrom: '2019-08-01T17:00:13.375Z',
    dateTo: '2019-08-01T18:00:13.375Z'
  },
  {
    dateFrom: '2019-08-03T11:22:13.375Z',
    dateTo: '2019-08-03T11:40:13.375Z'
  },
  {
    dateFrom: '2019-08-05T07:30:13.375Z',
    dateTo: '2019-08-05T09:00:13.375Z'
  },
  {
    dateFrom: '2019-07-18T20:20:13.375Z',
    dateTo: '2019-07-18T21:40:13.375Z'
  },
  {
    dateFrom: '2019-07-21T01:28:13.375Z',
    dateTo: '2019-07-21T07:40:13.375Z'
  },
  {
    dateFrom: '2019-07-28T16:15:13.375Z',
    dateTo: '2019-07-28T20:40:13.375Z'
  }
];

export {pointTypes, offers, getArrayFromType, descriptionPhrases, namesOfPlaces, fromToDates, getOfferName, getOfferPrice, offersByType};
