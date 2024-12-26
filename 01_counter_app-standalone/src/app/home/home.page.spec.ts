import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePage } from './home.page';
import { By } from '@angular/platform-browser';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('change num', () => {
    const buttonUp = fixture.debugElement.query(By.css('#button-up'));
    const buttonDown = fixture.debugElement.query(By.css('#button-down'));

    buttonUp.nativeElement.click();
    
    expect(component.num).toBe(1);

  });

  it('change num', () => {
    const buttonUp = fixture.debugElement.query(By.css('#button-up'));
    const buttonDown = fixture.debugElement.query(By.css('#button-down'));

    buttonUp.nativeElement.click();
    
    expect(component.num).toBe(1);

    buttonDown.nativeElement.click();

    expect(component.num).toBe(component.min);

  });

  it('max', () => {
    const buttonUp = fixture.debugElement.query(By.css('#button-up'));
    const buttonDown = fixture.debugElement.query(By.css('#button-down'));

    for (let index = 0; index < component.max; index++) {
      buttonUp.nativeElement.click();
    }

    expect(component.num).toBe(component.max);

    buttonUp.nativeElement.click();

    expect(component.num).toBe(component.max);

  });

});
