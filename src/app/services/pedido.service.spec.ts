import { TestBed } from '@angular/core/testing';

import { PedidoService } from './pedido.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('PedidoService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [PedidoService],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA //PARA QUE O KARMA NÃO CONFUNDA ELEMENTOS ANGULAR NO TEMPLATE COMO ERROS

      ]
    });
  });

  it('should be created', () => {
    const service: PedidoService = TestBed.inject(PedidoService);
    expect(service).toBeTruthy();
  });
});
