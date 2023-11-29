import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoslistComponent } from './pedidoslist.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PedidoService } from 'src/app/services/pedido.service';
import { of } from 'rxjs';
import { Pedido } from 'src/app/models/pedido';

describe('PedidoslistComponent', () => {
  let component: PedidoslistComponent;
  let fixture: ComponentFixture<PedidoslistComponent>;
  let mockModalService: jasmine.SpyObj<NgbModal>;
  let mockPedidoService: jasmine.SpyObj<PedidoService>;

  beforeEach(async () => {

    mockModalService = jasmine.createSpyObj('NgbModal', ['open', 'dismissAll']);
    mockPedidoService = jasmine.createSpyObj('PedidoService', ['listAll', 'delete']);
  
    mockPedidoService.listAll.and.returnValue(of([])); 
  
    const pedidoMock: Pedido = new Pedido();
    
    mockPedidoService.delete.and.returnValue(of(pedidoMock));
  
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [PedidoslistComponent],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ],
      providers: [
        { provide: NgbModal, useValue: mockModalService },
        { provide: PedidoService, useValue: mockPedidoService }
      ]
    }).compileComponents();
  
    fixture = TestBed.createComponent(PedidoslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve chamar listAll do PedidoService na inicialização', () => {
    expect(mockPedidoService.listAll).toHaveBeenCalled();
  });

  it('deve abrir o modal e resetar o pedidoSelecionadoParaEdicao em adicionar', () => {
    const mockModal = {};
    component.adicionar(mockModal);
    expect(mockModalService.open).toHaveBeenCalledWith(mockModal, { size: 'lg' });
    expect(component.pedidoSelecionadoParaEdicao).toEqual(new Pedido());
  });

  it('deve configurar pedidoSelecionadoParaEdicao e abrir o modal em editar', () => {
    const mockModal = {};
    const pedido = new Pedido();
    pedido.idPedido = 1;

  
    component.editar(mockModal, pedido, 0);
    expect(component.pedidoSelecionadoParaEdicao.idPedido).toBe(1);
    expect(mockModalService.open).toHaveBeenCalledWith(mockModal, { size: 'lg' });
  });

  it('deve chamar delete do PedidoService em deletar', () => {
    const pedido = new Pedido();
    pedido.idPedido = 1;
    component.deletar(pedido);
    expect(mockPedidoService.delete).toHaveBeenCalledWith(1);
  });
});
