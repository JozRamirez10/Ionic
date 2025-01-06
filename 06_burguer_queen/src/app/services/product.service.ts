import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { environment } from 'src/environments/environment.prod';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  getProductsByCategory(idCategory : string){
    return CapacitorHttp.get({
      url: environment.urlApi + 'products/category/' + idCategory,
      params: {},
      headers: {
        'Content-Type': 'application/json'
      }
    }).then( (response : HttpResponse) => {
      if(response.status = 200)
        return response.data as Product[];
      return [];
    });
  }

  getProductById(id : String){
    return CapacitorHttp.get({
      url: environment.urlApi + 'products/' + id,
      params: {},
      headers: {
        'Content-Type' : 'application/json'
      }
    }).then( (response : HttpResponse) => {
      if(response.status == 200)
        return response.data as Product;
      return null
    })
  }

}
