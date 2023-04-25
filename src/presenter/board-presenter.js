import CreationForm from '../view/creation-form';
import EditingForm from '../view/editing-form';
import Sorting from '../view/sorting';
import Point from '../view/point';
import PointList from '../view/point-list';
import {render} from '../render';

export default class BoardPresenter {
  pointListComponent = new PointList();

  constructor ({boardContainer}) {
    this.boardContainer = boardContainer;
  }

  init() {
    render(new Sorting(), this.boardContainer);
    render(this.pointListComponent, this.boardContainer);
    render(new CreationForm(), this.pointListComponent.getElement());
    render(new Point(), this.pointListComponent.getElement());
    render(new EditingForm(), this.pointListComponent.getElement());
    for (let i = 0; i < 3; i++) {
      render(new Point(), this.pointListComponent.getElement());
    }
  }
}
