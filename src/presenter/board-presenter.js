import PointListView from '../view/point-list-view';
import PointPresenter from './point-presenter';
import Sorting from '../view/sorting-view';
import NoPointsView from '../view/no-points-view';
import CreationFormView from '../view/creation-form-view';
import {render, RenderPosition} from '../framework/render.js';
import { SortType } from '../const';
import { sortByDay, sortByPrice, updateItem } from '../util';

export default class BoardPresenter {
  #pointsListComponent = new PointListView();
  #boardContainer = null;
  #points = null;
  #pointsModel = null;
  #creationFormComponent = null;
  #noPointComponent = null;
  #sortComponent = null;
  #pointPresenter = new Map();
  #currentSortType = SortType.DAY;
  #sourcedPoints = [];

  constructor ({boardContainer, pointsModel}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#points = [...this.#pointsModel.points];
    this.#sourcedPoints = [...this.#pointsModel.points];
    this.#renderBoard();
  }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #sortPoints(sortType) {
    switch (sortType) {
      case 'sort-day':
        this.#points.sort(sortByDay);
        break;
      case 'sort-price':
        this.#points.sort(sortByPrice);
        break;
      default:
        this.#points = [...this.#sourcedPoints];
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#sortPoints(sortType);
    this.#clearPointsList();
    this.#renderPointsList();
  };

  #renderSort() {
    this.#sortComponent = new Sorting({
      onSortTypeChange: this.#handleSortTypeChange,
      currentSortType: this.#currentSortType
    });
    this.#sortPoints('sort-day');
    render(this.#sortComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
  }

  #renderBoard() {
    if (this.#points.length === 0) {
      this.#renderNoPoints();
      return;
    }
    this.#renderSort();
    this.#renderPointsList();
    //this.#renderCreationForm();
  }

  #renderNoPoints() {
    this.#noPointComponent = new NoPointsView();
    render(this.#noPointComponent, this.#boardContainer, RenderPosition.AFTERBEGIN );
  }

  #renderPointsList() {
    render(this.#pointsListComponent, this.#boardContainer);
    this.#renderPoints();
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#pointsListComponent.element,
      onModeChange: this.#handleModeChange,
      onDataChange: this.#handlePointChange
    });

    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  }

  #renderPoints() {
    this.#points.forEach((point) => this.#renderPoint(point));
  }

  #renderCreationForm() {
    this.#creationFormComponent = new CreationFormView(this.#points[0]);
    render(this.#creationFormComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
  }


  #clearPointsList() {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  }
}
