import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';
import { environment } from 'src/environments/environment.prod';
import { KEY_TOKEN } from '../constants/constants';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  async getUser(email : string){
    const token = await Preferences.get({key: KEY_TOKEN});
    return CapacitorHttp.get({
      url: environment.urlApi + 'users',
      params: {
        email
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token.value,
      }
    }).then((response : HttpResponse) => {
      if(response.status == 200)
        return response.data as User;
      return null;
    }).catch(err => {
      return null
    });
  }

  createUser(user : User){
    return CapacitorHttp.post({
      url: environment.urlApi + 'users',
      params: {},
      data: {
        ...user,
      },
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response : HttpResponse) => {
      if(response.status == 201)
        return response.data as boolean;
      return false;
    }).catch(err => {
      return false
    });
  }
}
