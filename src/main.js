import {render} from './framework/render.js';
import Filters from './view/filters-view';
import BoardPresenter from './presenter/board-presenter';
import PointModel from './model/point-model';
import { generateFilter } from './mock/filter.js';

const pageContainer = document.querySelector('.trip-events');
const pointsModel = new PointModel();
const boardPresenter = new BoardPresenter({boardContainer: pageContainer, pointsModel});

const filterContainer = document.querySelector('.trip-controls__filters');
const filters = generateFilter(pointsModel.points);
render (new Filters(filters), filterContainer);

boardPresenter.init();
