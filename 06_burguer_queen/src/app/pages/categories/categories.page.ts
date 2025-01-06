import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, NavParams } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { Category } from 'src/app/models/category';
import { GetCategories } from 'src/app/state/categories/categories.actions';
import { CategoriesState } from 'src/app/state/categories/categories.state';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
  standalone: false
})
export class CategoriesPage {

  @Select(CategoriesState.categories)
  private categories$ : Observable<Category[]>;

  public categories : Category[];
  public subscription : Subscription;

  constructor(
    private store : Store,
    private loadinController : LoadingController,
    private translateService : TranslateService,
    private navController : NavController,
    private navParams : NavParams
  ) { 
    this.categories = [];
  }

  ionViewWillEnter(){
    this.subscription = new Subscription();
    this.loadData();
  }

  async loadData() {
    
    const loading = await this.loadinController.create({
      message: this.translateService.instant('label.loading'),
      duration: 3000,
    });

    loading.present();

    this.store.dispatch(new GetCategories());
    this.categories$.subscribe({
      next: () => {
        this.categories = this.store.selectSnapshot(CategoriesState.categories); 
        loading.dismiss();
      },
      error: (err) => {
        loading.dismiss();
      }
    })
  }

  goToProducts(category : Category){
    this.navParams.data["idCategory"] = category._id;
    this.navController.navigateForward("list-products");
  }

  refreshCategories($event){
    this.store.dispatch(new GetCategories());
    $event.target.complete();
  }

  ionViewWillLeave(){
    this.subscription.unsubscribe();
  }
}
