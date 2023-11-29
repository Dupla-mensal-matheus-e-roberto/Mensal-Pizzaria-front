import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionarioslistComponent } from './funcionarioslist.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { Funcionario } from 'src/app/models/funcionario';
import { of } from 'rxjs';

describe('FuncionarioslistComponent', () => {
  let component: FuncionarioslistComponent;
  let fixture: ComponentFixture<FuncionarioslistComponent>;
  let mockModalService: jasmine.SpyObj<NgbModal>;
  let mockFuncionarioService: jasmine.SpyObj<FuncionarioService>;

  beforeEach(async () => {

    mockModalService = jasmine.createSpyObj('NgbModal', ['open', 'dismissAll']);
    mockFuncionarioService = jasmine.createSpyObj('FuncionarioService', ['listAll', 'delete']);
  
    mockFuncionarioService.listAll.and.returnValue(of([])); 
  
    const funcionarioMock: Funcionario = new Funcionario();
    
    mockFuncionarioService.delete.and.returnValue(of(funcionarioMock));
  
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [FuncionarioslistComponent],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ],
      providers: [
        { provide: NgbModal, useValue: mockModalService },
        { provide: FuncionarioService, useValue: mockFuncionarioService }
      ]
    }).compileComponents();
  
    fixture = TestBed.createComponent(FuncionarioslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve chamar listAll do funcionarioService na inicialização', () => {
    expect(mockFuncionarioService.listAll).toHaveBeenCalled();
  });

  it('deve abrir o modal e resetar o funcionarioSelecionadoParaEdicao em adicionar', () => {
    const mockModal = {};
    component.adicionar(mockModal);
    expect(mockModalService.open).toHaveBeenCalledWith(mockModal, { size: 'lg' });
    expect(component.funcionarioSelecionadoParaEdicao).toEqual(new Funcionario());
  });

  it('deve configurar funcionarioSelecionadoParaEdicao e abrir o modal em editar', () => {
    const mockModal = {};
    const funcionario = new Funcionario();
    funcionario.idFuncionario = 1;

  
    component.editar(mockModal, funcionario, 0);
    expect(component.funcionarioSelecionadoParaEdicao.idFuncionario).toBe(1);
    expect(mockModalService.open).toHaveBeenCalledWith(mockModal, { size: 'lg' });
  });

  it('deve chamar delete do funcionarioService em deletar', () => {
    const funcionario = new Funcionario();
    funcionario.idFuncionario = 1;
    component.deletar(funcionario);
    expect(mockFuncionarioService.delete).toHaveBeenCalledWith(1);
  });
});
