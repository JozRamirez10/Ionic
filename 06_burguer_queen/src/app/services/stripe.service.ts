import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { environment } from 'src/environments/environment.prod';
import { CreatePaymentIntent } from '../models/create.payment.intent';
import { Payment } from '../models/payment';

@Injectable({
  providedIn: 'root'
})
export class StripeService {

  createPaymentSheet(paymentIntent : CreatePaymentIntent){
    return CapacitorHttp.post({
      url: environment.urlApi + 'stripe/intent',
      params: {},
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${paymentIntent.secretKey}`
      },
      data: {
        ...paymentIntent
      }
    }).then( (response: HttpResponse) => {
      if(response.status == 201)
        return response.data as Payment;
      return null;
    }).catch( err => {
      return null;
    });
  }
}
