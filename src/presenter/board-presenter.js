import CreationFormView from '../view/creation-form-view';
import EditingFormView from '../view/editing-form-view';
import SortingView from '../view/sorting-view';
import PointView from '../view/point-view';
import PointListView from '../view/point-list-view';
import {render} from '../render';

export default class BoardPresenter {
  pointListComponent = new PointListView();

  constructor ({boardContainer, pointsModel}) {
    this.boardContainer = boardContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    this.points = [...this.pointsModel.getPoints()];
    render(new SortingView(), this.boardContainer);
    render(this.pointListComponent, this.boardContainer);
    render(new CreationFormView(), this.pointListComponent.getElement());
    render(new EditingFormView(), this.pointListComponent.getElement());
    for (let i = 0; i < this.points.length; i++) {
      render(new PointView({point: this.points[i]}));
    }
  }
}
