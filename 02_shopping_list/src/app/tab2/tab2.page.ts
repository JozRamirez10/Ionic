import { Component } from '@angular/core';
import { ShoppingItemsService } from '../services/shopping-items.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public item ! : string;

  constructor(
    private shoppingList : ShoppingItemsService,
    private alertController : AlertController // Alertas
  ) {}

  addItem(){
    if(!this.shoppingList.existsItem(this.item)){
      this.shoppingList.addItem(this.item)
      this.item = '';
      this.alertSuccess();
    }else{
      this.alertError();
    }
  }

  async alertSuccess(){
    const alert = await this.alertController.create({
      header: 'Éxito',
      message: '¡Item añadido!',
      buttons: ['OK']
    });
    await alert.present();
  }

  async alertError(){
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'El item ya existe',
      buttons: ['OK']
    });
    await alert.present();
  }

}
