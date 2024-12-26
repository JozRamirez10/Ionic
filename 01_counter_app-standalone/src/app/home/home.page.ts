import { Component } from '@angular/core';
import { IonHeader, IonContent, IonFooter, IonButton, IonIcon, IonGrid, IonRow, IonCol, IonText, AlertController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronUpOutline, chevronDownOutline } from 'ionicons/icons';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonText, IonCol, IonRow, IonGrid, IonIcon, IonButton, IonFooter, IonHeader, IonContent],
  providers: [AlertController]
})
export class HomePage {

  public num ! : number;
  public max ! : number;
  public min ! : number;
  private KEY_NUMBER ! : string;  

  constructor(private alertController : AlertController) {
    this.num = 0;
    this.max = 999;
    this.min = 0;
    this.KEY_NUMBER = 'key number';
    addIcons({chevronUpOutline,chevronDownOutline});
  }

  async ionViewWillEnter(){
    const counter = await Preferences.get({key: this.KEY_NUMBER});
    if(counter.value){
      const num = + counter.value;
      if(isNaN(num) || num < this.min || num > this.max){
        this.num = this.min;
        this.saveNum();
      }else{
        this.num = num;
      }
    }
  }

  up() {
    if(this.num < this.max){
      this.num++;
      this.saveNum();
    }
  }

  down() {
    if(this.num > this.min){
      this.num--;
      this.saveNum();
    }
  }

  async reset() {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Quieres resetar el contenedor?',
      buttons: [
        {
          text: 'Si',
          handler: () => {
            this.num = 0;
          }
        },
        {
          text: 'No',
          role: 'cancel'
        }
      ]
    });

    await alert.present();

  }

  private saveNum() {
    Preferences.set({ key: this.KEY_NUMBER, value: this.num.toString()});
  }

}
