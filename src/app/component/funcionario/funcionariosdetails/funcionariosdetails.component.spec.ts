import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionariosdetailsComponent } from './funcionariosdetails.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { of } from 'rxjs';

describe('FuncionariosdetailsComponent', () => {
  let component: FuncionariosdetailsComponent;
  let fixture: ComponentFixture<FuncionariosdetailsComponent>;
  let funcionarioService: jasmine.SpyObj<FuncionarioService>;  

  beforeEach(() => {
    funcionarioService = jasmine.createSpyObj('FuncionarioService', ['verify']);

    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      declarations: [FuncionariosdetailsComponent],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA 
      ],
      providers: [{ 
        provide: FuncionarioService, 
        useValue: funcionarioService 
      }]
    });
    fixture = TestBed.createComponent(FuncionariosdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call verificar() and emit retorno on successful verification', () => {
    const funcionario = { idFuncionario:3, nome: 'Roberto', };
    funcionarioService.verify.and.returnValue(of(funcionario));

    spyOn(component.retorno, 'emit');

    component.funcionario = funcionario;
    component.verificar();

    expect(funcionarioService.verify).toHaveBeenCalledWith(funcionario);
    expect(component.retorno.emit).toHaveBeenCalledWith(funcionario);
  });
});
