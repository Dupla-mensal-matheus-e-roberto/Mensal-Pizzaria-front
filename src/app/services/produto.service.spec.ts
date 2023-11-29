import { TestBed } from '@angular/core/testing';

import { ProdutoService } from './produto.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('ProdutoService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [ProdutoService],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA //PARA QUE O KARMA NÃO CONFUNDA ELEMENTOS ANGULAR NO TEMPLATE COMO ERROS
      ]
    });
  });

  it('should be created', () => {
    const service: ProdutoService = TestBed.inject(ProdutoService);
    expect(service).toBeTruthy();
  });
});
