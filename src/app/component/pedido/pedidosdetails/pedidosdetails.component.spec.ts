import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosdetailsComponent } from './pedidosdetails.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { PedidoService } from 'src/app/services/pedido.service';
import { of } from 'rxjs';
import { Cliente } from 'src/app/models/cliente';

describe('PedidosdetailsComponent', () => {
  let component: PedidosdetailsComponent;
  let fixture: ComponentFixture<PedidosdetailsComponent>;
  let pedidoService: jasmine.SpyObj<PedidoService>;  


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PedidosdetailsComponent],
      imports: [HttpClientTestingModule],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA 
      ],
      providers: [{ 
        provide: PedidoService, 
        useValue: pedidoService 
      }]
    });
    fixture = TestBed.createComponent(PedidosdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
