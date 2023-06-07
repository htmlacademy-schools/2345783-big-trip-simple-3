import {render} from './framework/render.js';
import { getRandomPoint } from './mock/point.js';
import FilterModel from './model/filter-model.js';
import PointModel from './model/point-model';
import FilterPresenter from './presenter/filter-presenter.js';
import BoardPresenter from './presenter/board-presenter';
import NewPointButton from './view/new-point-button-view.js';

const POINT_COUNT = 3;
const pageContainer = document.querySelector('.trip-events');
const pageHeader = document.querySelector('.trip-main');
const points = Array.from({length: POINT_COUNT}, getRandomPoint);
const pointsModel = new PointModel(points);
const filterModel = new FilterModel();
const boardPresenter = new BoardPresenter({
    boardContainer: pageContainer,
    pointsModel,
    filterModel,
    onNewPointDestroy: handleNewPointFormClose});

const filterPresenter = new FilterPresenter({
  filterContainer: pageHeader,
  filterModel,
  pointsModel
});
const newPointButtonComponent = new NewPointButton({
  onClick: handleNewPointButtonClick
});

function handleNewPointFormClose() {
  newPointButtonComponent.element.disabled = false;
}

function handleNewPointButtonClick() {
  boardPresenter.createPoint();
  newPointButtonComponent.element.disabled = true;
}

//const filterContainer = document.querySelector('.trip-controls__filters');
//const filters = generateFilter(pointsModel.points);
render(newPointButtonComponent, pageHeader);

filterPresenter.init();
boardPresenter.init();
