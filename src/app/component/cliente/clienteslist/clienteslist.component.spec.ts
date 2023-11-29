import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteslistComponent } from './clienteslist.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

describe('ClienteslistComponent', () => {
  let component: ClienteslistComponent;
  let fixture: ComponentFixture<ClienteslistComponent>;
  let mockModalService: jasmine.SpyObj<NgbModal>;
  let mockClienteService: jasmine.SpyObj<ClienteService>;

  beforeEach(async () => {

    mockModalService = jasmine.createSpyObj('NgbModal', ['open', 'dismissAll']);
    mockClienteService = jasmine.createSpyObj('ClienteService', ['listAll', 'delete']);
  
    mockClienteService.listAll.and.returnValue(of([])); 
  
    const clienteMock: Cliente = new Cliente();
    
    mockClienteService.delete.and.returnValue(of(clienteMock));
  
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ClienteslistComponent],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ],
      providers: [
        { provide: NgbModal, useValue: mockModalService },
        { provide: ClienteService, useValue: mockClienteService }
      ]
    }).compileComponents();
  
    fixture = TestBed.createComponent(ClienteslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('deve chamar listAll do ClienteService na inicialização', () => {
    expect(mockClienteService.listAll).toHaveBeenCalled();
  });

  it('deve abrir o modal e resetar o clienteSelecionadoParaEdicao em adicionar', () => {
    const mockModal = {};
    component.adicionar(mockModal);
    expect(mockModalService.open).toHaveBeenCalledWith(mockModal, { size: 'lg' });
    expect(component.clienteSelecionadoParaEdicao).toEqual(new Cliente());
  });

  it('deve configurar ClienteSelecionadoParaEdicao e abrir o modal em editar', () => {
    const mockModal = {};
    const cliente = new Cliente();
    cliente.idCliente = 1;

  
    component.editar(mockModal, cliente, 0);
    expect(component.clienteSelecionadoParaEdicao.idCliente).toBe(1);
    expect(mockModalService.open).toHaveBeenCalledWith(mockModal, { size: 'lg' });
  });

  it('deve chamar delete do ClienteService em deletar', () => {
    const cliente = new Cliente();
    cliente.idCliente = 1;
    component.deletar(cliente);
    expect(mockClienteService.delete).toHaveBeenCalledWith(1);
  });

});
