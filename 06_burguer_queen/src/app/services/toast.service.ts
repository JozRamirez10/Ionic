import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController : ToastController) {}

  async showToast(message : string, duration = 1500 ){
    const toast = await this.toastController.create({
      message,
      duration,
      position: 'top'
    });
    await toast.present();
  }
}
