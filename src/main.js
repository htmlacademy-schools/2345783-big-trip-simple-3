import {render} from './render';
import Filters from './view/filters-view';
import BoardPresenter from './presenter/board-presenter';
import PointModel from './model/point-model';

const filterConteiner = document.querySelector('.trip-controls__filters');
render(new Filters,filterConteiner);

const pageContainer = document.querySelector('.trip-events');
const pointsModel = new PointModel();
const boardPresenter = new BoardPresenter({boardContainer: pageContainer, pointsModel});

boardPresenter.init();
