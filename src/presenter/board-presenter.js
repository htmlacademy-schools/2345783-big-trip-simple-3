import EditingFormView from '../view/editing-form-view';
import SortingView from '../view/sorting-view';
import Point from '../view/point-view';
import PointListView from '../view/point-list-view';
import NoPointsView from '../view/no-points-view';
//import CreationFormView from '../view/creation-form-view';
import {render, replace} from '../framework/render.js';
import { isEscapeKey } from '../util';

export default class BoardPresenter {
  #pointListComponent = new PointListView();
  #boardContainer = null;
  #pointsModel = null;

  constructor ({boardContainer, pointsModel}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    const points = [...this.#pointsModel.points];
    if (points.length === 0) {
      render(new NoPointsView(), this.#boardContainer);
    }
    else {
      render(new SortingView(), this.#boardContainer);
      render(this.#pointListComponent, this.#boardContainer);
      //render(new CreationFormView(points[0]), this.#pointListComponent.element);
      for (let i = 0; i < points.length; i++) {
        this.#renderPoint(points[i]);
      }
    }
  }

  #renderPoint(point) {
    const ecsKeyDownHandler = (evt) => {
      if (isEscapeKey(evt)) {
        evt.preventDefault();
        replaceFormToPoint();
        document.body.removeEventListener('keydown', ecsKeyDownHandler);
      }
    };

    const pointComponent = new Point({
      point: point,
      onEditClick: () => {
        replacePointToForm.call(this);
        document.body.addEventListener('keydown', ecsKeyDownHandler);
      }});

    const editingFormComponent = new EditingFormView({
      point: point,
      onFormSubmit: () => {
        replaceFormToPoint.call(this);
        document.body.removeEventListener('keydown', ecsKeyDownHandler);
      }
    });

    function replacePointToForm() {
      replace(editingFormComponent, pointComponent);
    }

    function replaceFormToPoint() {
      replace(pointComponent, editingFormComponent);
    }
    render(pointComponent, this.#pointListComponent.element);
  }
}
