import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzasdetailsComponent } from './pizzasdetails.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { PizzaService } from 'src/app/services/pizza.service';
import { of } from 'rxjs';

describe('PizzasdetailsComponent', () => {
  let component: PizzasdetailsComponent;
  let fixture: ComponentFixture<PizzasdetailsComponent>;
  let pizzaService: jasmine.SpyObj<PizzaService>;  

  beforeEach(() => {
    pizzaService = jasmine.createSpyObj('PizzaService', ['verify']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [PizzasdetailsComponent],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ],
      providers: [{ 
        provide: PizzaService, 
        useValue: pizzaService 
      }]
    });
    fixture = TestBed.createComponent(PizzasdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call verificar() and emit retorno on successful verification', () => {
    const pizza = { idPizza:1, sabores: 'calabresa', tamanho: 'P', adicionais: '', removiveis: ''};
    pizzaService.verify.and.returnValue(of(pizza));

    spyOn(component.retorno, 'emit');

    component.pizza = pizza;
    component.verificar();

    expect(pizzaService.verify).toHaveBeenCalledWith(pizza);
    expect(component.retorno.emit).toHaveBeenCalledWith(pizza);
  });
});
