import EditingFormView from '../view/editing-form-view';
import SortingView from '../view/sorting-view';
import Point from '../view/point-view';
import PointListView from '../view/point-list-view';
import NoPointsView from '../view/no-points-view';
import { render } from '../render';
import { isEscapeKey } from '../util';

export default class BoardPresenter {
  #pointListComponent = new PointListView();
  #boardContainer = null;
  #pointsModel = null;
  #points = null;

  constructor ({boardContainer, pointsModel}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#points = [...this.#pointsModel.points];
    if(this.#points.length === 0) {
      render(new NoPointsView(), this.#boardContainer);
    }
    else {
      render(new SortingView(), this.#boardContainer);
      render(this.#pointListComponent, this.#boardContainer);
      for (let i = 0; i < this.#points.length; i++) {
        this.#renderPoint(this.#points[i]);
      }
    }
  }

  #renderPoint = (point) => {
    const pointComponent = new Point(point);
    const pointEditComponent = new EditingFormView(point);

    const replaceFormToPoint = () => {
      this.#pointListComponent.element.replaceChild(pointComponent.element, pointEditComponent.element);
    };

    const replacePointToForm = () => {
      this.#pointListComponent.element.replaceChild(pointEditComponent.element, pointComponent.element);
    };

    const closeFormOnEscape = (evt) => {
      if(isEscapeKey(evt)) {
        evt.preventDefault();
        replaceFormToPoint();
        document.body.removeEventListener('keydown', closeFormOnEscape());
      }
    };

    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', (evt) => {
      evt.preventDefault();
      replacePointToForm();
      document.body.addEventListener('keydown', closeFormOnEscape());
    });

    pointEditComponent.element.querySelector('.event__save-btn').addEventListener('click', (evt) => {
      evt.preventDefault();
      replaceFormToPoint();
      document.body.removeEventListener('keydown', closeFormOnEscape());
    });

    pointEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click', (evt) => {
      evt.preventDefault();
      replaceFormToPoint();
      document.body.removeEventListener('keydown', closeFormOnEscape());
    });

    render(pointComponent, this.#pointListComponent.element);
  };
}
