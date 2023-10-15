import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzasdetailsComponent } from './pizzasdetails.component';

describe('PizzasdetailsComponent', () => {
  let component: PizzasdetailsComponent;
  let fixture: ComponentFixture<PizzasdetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PizzasdetailsComponent]
    });
    fixture = TestBed.createComponent(PizzasdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
