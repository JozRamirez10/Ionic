import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { GetCategories } from './categories.actions';
import { Category } from '../../models/category';
import { CategoriesService } from '../../services/categories.service';

export class CategoriesStateModel {
  categories ! : Category[];
}

const defaults = {
  categories: []
};

@State<CategoriesStateModel>({
  name: 'categories',
  defaults
})
@Injectable()
export class CategoriesState {

@Selector()
static categories(state : CategoriesStateModel) {
  return state.categories;
}

constructor(
  private categoriesService : CategoriesService
) {}

@Action(GetCategories)
  getCategories({ setState }: StateContext<CategoriesStateModel>) {
    return this.categoriesService.getCategories().then((categories : Category[]) => {
      setState({categories});
    });
  }
}
