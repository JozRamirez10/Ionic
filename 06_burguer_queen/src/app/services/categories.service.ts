import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { Category } from '../models/category';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor() { }

  getCategories(){
    return CapacitorHttp.get({
      url: environment.urlApi + 'categories',
      params: {},
      headers: {
        'Content-type' : 'application/json'
      }
    }).then( (response : HttpResponse ) => {
      if(response.status == 200)
        return response.data as Category[];
      return []
    }).catch( err => {
      return [];
    })
  }
}
