import {render} from './render.js';
import Filters from './view/filters.js';
import BoardPresenter from './presenter/board-presenter.js';

const filterConteiner = document.querySelector('.trip-controls__filters');
render(new Filters,filterConteiner);

const pageContainer = document.querySelector('.trip-events');
const boardPresenter = new BoardPresenter({boardContainer: pageContainer});


boardPresenter.init();
