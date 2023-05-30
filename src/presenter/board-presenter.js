import PointListView from '../view/point-list-view';
import PointPresenter from './point-presenter';
// import CreationFormView from '../view/creation-form-view';
import {render, RenderPosition} from '../framework/render.js';

export default class BoardPresenter {
  #pointsListComponent = new PointListView();
  #boardContainer = null;
  #points = null;
  #pointsModel = null;
  #noPointComponent = null;
  #pointPresenter = new Map();

  constructor ({boardContainer, pointsModel}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#points = [...this.#pointsModel.points];
    this.#renderBoard();
  }

  #renderBoard() {
    if (this.#points.length === 0) {
      render(this.#renderNoPoints, this.#boardContainer);
      return;
    }
    //this.#renderSort();
    this.#renderPointsList();
  }

  #renderNoPoints() {
    render(this.#noPointComponent, this.#boardContainer, RenderPosition.AFTERBEGIN );
  }

  #renderPointsList() {
    render(this.#pointsListComponent, this.#boardContainer);
    this.#renderPoints();
  }

  #renderPoint(point) {

    const pointPresenter = new PointPresenter({
      pointListContainer: this.#pointsListComponent.element,
      onModeChange: this.#handleModeChange
    });

    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  }

  #renderPoints() {
    this.#points.forEach((point) => this.#renderPoint(point));
  }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #clearPointList() {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
    //remove(this.#sortComponent);
  }
}
