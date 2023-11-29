import { TestBed } from '@angular/core/testing';

import { UsuarioService } from './usuario.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('UsuarioService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [UsuarioService],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA //PARA QUE O KARMA NÃO CONFUNDA ELEMENTOS ANGULAR NO TEMPLATE COMO ERROS
      ]
    });
  });

  it('should be created', () => {
    const service: UsuarioService = TestBed.inject(UsuarioService);
    expect(service).toBeTruthy();
  });
});
