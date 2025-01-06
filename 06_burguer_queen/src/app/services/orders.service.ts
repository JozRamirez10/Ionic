import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';
import { KEY_TOKEN } from '../constants/constants';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  async createOrder(order : Order){
    const token = await Preferences.get({key: KEY_TOKEN});
    return CapacitorHttp.post({
      url: environment.urlApi + 'orders',
      data: {
        ...order
      },
      params: {},
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.value}`
      }
    }).then( (response : HttpResponse) => {
      if(response.status == 201)
        return response.data as boolean;
      return false;
    }).catch(err => {
      return false;
    })
  }

}
