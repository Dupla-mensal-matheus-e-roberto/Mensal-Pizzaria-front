import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaslistComponent } from './pizzaslist.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PizzaService } from 'src/app/services/pizza.service';
import { of } from 'rxjs';
import { Pizza } from 'src/app/models/pizza';

describe('PizzaslistComponent', () => {
  let component: PizzaslistComponent;
  let fixture: ComponentFixture<PizzaslistComponent>;
  let mockModalService: jasmine.SpyObj<NgbModal>;
  let mockPizzaService: jasmine.SpyObj<PizzaService>;

  beforeEach(async () => {

    mockModalService = jasmine.createSpyObj('NgbModal', ['open', 'dismissAll']);
    mockPizzaService = jasmine.createSpyObj('PizzaService', ['listAll', 'delete']);
  
    mockPizzaService.listAll.and.returnValue(of([])); 
  
    const pizzaMock: Pizza = new Pizza();
    
    mockPizzaService.delete.and.returnValue(of(pizzaMock));
  
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [PizzaslistComponent],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ],
      providers: [
        { provide: NgbModal, useValue: mockModalService },
        { provide: PizzaService, useValue: mockPizzaService }
      ]
    }).compileComponents();
  
    fixture = TestBed.createComponent(PizzaslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('deve chamar listAll do PizzaService na inicialização', () => {
    expect(mockPizzaService.listAll).toHaveBeenCalled();
  });

  it('deve abrir o modal e resetar o pizzaSelecionadoParaEdicao em adicionar', () => {
    const mockModal = {};
    component.adicionar(mockModal);
    expect(mockModalService.open).toHaveBeenCalledWith(mockModal, { size: 'lg' });
    expect(component.pizzaSelecionadoParaEdicao).toEqual(new Pizza());
  });

  it('deve configurar PizzaSelecionadoParaEdicao e abrir o modal em editar', () => {
    const mockModal = {};
    const pizza = new Pizza();
    pizza.idPizza = 1;

  
    component.editar(mockModal, pizza, 0);
    expect(component.pizzaSelecionadoParaEdicao.idPizza).toBe(1);
    expect(mockModalService.open).toHaveBeenCalledWith(mockModal, { size: 'lg' });
  });

  it('deve chamar delete do PizzaService em deletar', () => {
    const pizza = new Pizza();
    pizza.idPizza = 1;
    component.deletar(pizza);
    expect(mockPizzaService.delete).toHaveBeenCalledWith(1);
  });

});
