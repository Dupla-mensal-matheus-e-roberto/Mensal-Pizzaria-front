import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendaslistComponent } from './vendaslist.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VendaService } from 'src/app/services/venda.service';
import { of } from 'rxjs';
import { Venda } from 'src/app/models/venda';

describe('VendaslistComponent', () => {
  let component: VendaslistComponent;
  let fixture: ComponentFixture<VendaslistComponent>;
  let mockModalService: jasmine.SpyObj<NgbModal>;
  let mockVendaService: jasmine.SpyObj<VendaService>;

  beforeEach(async () => {

    mockModalService = jasmine.createSpyObj('NgbModal', ['open', 'dismissAll']);
    mockVendaService = jasmine.createSpyObj('VendaService', ['listAll', 'delete']);
  
    mockVendaService.listAll.and.returnValue(of([])); 
  
    const vendaMock: Venda = new Venda();
    
    mockVendaService.delete.and.returnValue(of(vendaMock));
  
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [VendaslistComponent],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ],
      providers: [
        { provide: NgbModal, useValue: mockModalService },
        { provide: VendaService, useValue: mockVendaService }
      ]
    }).compileComponents();
  
    fixture = TestBed.createComponent(VendaslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve chamar listAll do VendaService na inicialização', () => {
    expect(mockVendaService.listAll).toHaveBeenCalled();
  });

  it('deve abrir o modal e resetar o vendaSelecionadoParaEdicao em adicionar', () => {
    const mockModal = {};
    component.adicionar(mockModal);
    expect(mockModalService.open).toHaveBeenCalledWith(mockModal, { size: 'lg' });
    expect(component.vendaSelecionadoParaEdicao).toEqual(new Venda());
  });

  it('deve configurar VendaSelecionadoParaEdicao e abrir o modal em editar', () => {
    const mockModal = {};
    const venda = new Venda();
    venda.idVenda = 1;

  
    component.editar(mockModal, venda, 0);
    expect(component.vendaSelecionadoParaEdicao.idVenda).toBe(1);
    expect(mockModalService.open).toHaveBeenCalledWith(mockModal, { size: 'lg' });
  });

  it('deve chamar delete do VendaService em deletar', () => {
    const venda = new Venda();
    venda.idVenda = 1;
    component.deletar(venda);
    expect(mockVendaService.delete).toHaveBeenCalledWith(1);
  });

});
