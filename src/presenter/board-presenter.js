import PointListView from '../view/point-list-view';
import PointPresenter from './point-presenter';
import NewPointPresenter from './new-point-presenter';
import Sorting from '../view/sorting-view';
import NoPointsView from '../view/no-points-view';
import CreationFormView from '../view/creation-form-view';
import {render, remove, RenderPosition} from '../framework/render.js';
import { SortType, UpdateType, UserAction, FilterType } from '../const';
import { sortByDay, sortByPrice, updateItem, filter } from '../util';

export default class BoardPresenter {
  #pointListComponent = new PointListView();
  #boardContainer = null;
  #pointsModel = null;
  #creationFormComponent = null;
  #noPointComponent = null;
  #newPointPresenter = null;
  #sortPoints = null;
  #filterModel = null;
  #pointsPresenters = new Map();
  #currentSortType = 'sort-day';
  #filterType = FilterType.ALL;
  #sourcedPoints = [];

  constructor ({boardContainer, pointsModel, filterModel, onNewPointDestroy}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#newPointPresenter = new NewPointPresenter({
      pointListContainer: this.#pointListComponent.element,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewPointDestroy
    });

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case 'sort-day':
        return filteredPoints.sort(sortByDay);
      case 'sort-price':
        return filteredPoints.sort(sortByPrice);
    }
    return filteredPoints;
  }

  init() {
    this.#renderBoard();
  }

  createPoint() {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init();
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointsPresenters.forEach((presenter) => presenter.resetView());
  };

  // #handlePointChange = (updatedPoint) => {
  //   this.#points = updateItem(this.#points, updatedPoint);
  //   this.#pointsPresenters.get(updatedPoint.id).init(updatedPoint);
  // };

  #handleModelEvent = (updateType, data) => {
    console.log(updateType)
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointsPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetRenderedPointsCount: true, resetSortType: true});
        this.#renderBoard();
        break;
    }
  };

  // #sortPoints(sortType) {
  //   switch (sortType) {
  //     case 'sort-day':
  //       this.#points.sort(sortByDay);
  //       break;
  //     case 'sort-price':
  //       this.#points.sort(sortByPrice);
  //       break;
  //     default:
  //       this.#points = [...this.#sourcedPoints];
  //   }

  //   this.#currentSortType = sortType;
  // }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    console.log('handle sort type change: ', sortType);
    this.#currentSortType = sortType;
    this.#clearBoard({resetRenderedPointsCount: true});
    this.#renderBoard();
  };

  #renderSort() {
    this.#sortPoints = new Sorting({
      onSortTypeChange: this.#handleSortTypeChange,
      currentSortType: this.#currentSortType
    });
    render(this.#sortPoints, this.#boardContainer)
  }


  #renderNoPoints() {
    this.#noPointComponent = new NoPointsView({
      filterType: this.#filterType
    });
    render(this.#noPointComponent, this.#boardContainer, RenderPosition.AFTERBEGIN );
  }

  #renderPointsList() {
    console.log(this.#pointListComponent);
    render(this.#pointListComponent, this.#boardContainer);
    this.#renderPoints();
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#pointListComponent.element,
      onModeChange: this.#handleModeChange,
      onDataChange: this.#handleViewAction
    });


    pointPresenter.init(point);
    this.#pointsPresenters.set(point.id, pointPresenter);
  }

  #renderPoints() {
    this.points.forEach((point) => this.#renderPoint(point));
  }

  // #renderCreationForm() {
  //   this.#creationFormComponent = new CreationFormView(this.#points[0]);
  //   render(this.#creationFormComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
  // }

  #renderBoard() {
    console.log(this.#pointsModel.points)
    const points = this.points;
    if (points.length === 0) {
      this.#renderNoPoints();
      return;
    }
    this.#renderSort();
    this.#renderPointsList();
  }

  #clearBoard({resetRenderedPointsCount = false, resetSortType = false} = {}) {
    const pointsCount = this.#pointsModel.points.length;

    this.#newPointPresenter.destroy();
    this.#pointsPresenters.forEach((presenter) => presenter.destroy());
    this.#pointsPresenters.clear();

    remove(this.#sortPoints);

    if (this.#noPointComponent) {
      remove(this.#noPointComponent);
    }

    // if (resetRenderedPointsCount) {
    //   this.#renderedPointsCount = POINT_COUNT_PER_STEP;
    // } else {
    //   // На случай, если перерисовка доски вызвана
    //   // уменьшением количества задач (например, удаление или перенос в архив)
    //   // нужно скорректировать число показанных задач
    //   this.#renderedTaskCount = Math.min(pointsCount, this.#renderedTaskCount);
    // }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  // #clearPointsList() {
  //   this.#pointPresenters.forEach((presenter) => presenter.destroy());
  //   this.#pointPresenters.clear();
  // }
}
