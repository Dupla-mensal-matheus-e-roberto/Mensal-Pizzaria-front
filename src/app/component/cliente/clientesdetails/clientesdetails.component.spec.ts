import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesdetailsComponent } from './clientesdetails.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { of, throwError } from 'rxjs';

describe('ClientesdetailsComponent', () => {
  let component: ClientesdetailsComponent;
  let fixture: ComponentFixture<ClientesdetailsComponent>;
  let clienteService: jasmine.SpyObj<ClienteService>;  

  beforeEach(() => {
    clienteService = jasmine.createSpyObj('ClienteService', ['verify']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ClientesdetailsComponent],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ],
      providers: [{ 
        provide: ClienteService, 
        useValue: clienteService 
      }]
    });
    fixture = TestBed.createComponent(ClientesdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call verificar() and emit retorno on successful verification', () => {
    const cliente = { idCliente:1, nome: 'Roberto', endereco: 'rua jorge sanwais' };
    clienteService.verify.and.returnValue(of(cliente));

    spyOn(component.retorno, 'emit');

    component.cliente = cliente;
    component.verificar();

    expect(clienteService.verify).toHaveBeenCalledWith(cliente);
    expect(component.retorno.emit).toHaveBeenCalledWith(cliente);
  });

});
