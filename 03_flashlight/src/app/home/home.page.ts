import { Component } from '@angular/core';
import { CapacitorFlash } from '@capgo/capacitor-flash';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  public active : boolean;

  constructor() {
    this.active = false;
  }

  flash(){
    this.active = !this.active;

    if(this.active)
      CapacitorFlash.switchOn({ intensity: 100});
    else
      CapacitorFlash.switchOff()
  }

}
