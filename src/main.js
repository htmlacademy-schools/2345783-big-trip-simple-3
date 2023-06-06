import {render} from './framework/render.js';
import Filters from './view/filters-view';
import BoardPresenter from './presenter/board-presenter';
import PointModel from './model/point-model';
import { getRandomPoint } from './mock/point.js';
import { generateFilter } from './mock/filter.js';

const POINT_COUNT = 3;
const pageContainer = document.querySelector('.trip-events');
const points = Array.from({length: POINT_COUNT}, getRandomPoint);
const pointsModel = new PointModel(points);
const boardPresenter = new BoardPresenter({boardContainer: pageContainer, pointsModel});

const filterContainer = document.querySelector('.trip-controls__filters');
const filters = generateFilter(pointsModel.points);
render (new Filters(filters), filterContainer);

boardPresenter.init();
