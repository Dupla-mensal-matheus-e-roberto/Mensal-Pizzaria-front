import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaslistComponent } from './pizzaslist.component';

describe('PizzaslistComponent', () => {
  let component: PizzaslistComponent;
  let fixture: ComponentFixture<PizzaslistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PizzaslistComponent]
    });
    fixture = TestBed.createComponent(PizzaslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
