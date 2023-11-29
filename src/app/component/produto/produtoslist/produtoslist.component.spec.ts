import { ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ProdutoslistComponent } from './produtoslist.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProdutoService } from 'src/app/services/produto.service';
import { Produto } from 'src/app/models/produto';
import { of } from 'rxjs';

describe('ProdutoslistComponent', () => {
  let component: ProdutoslistComponent;
  let fixture: ComponentFixture<ProdutoslistComponent>;
  let mockModalService: jasmine.SpyObj<NgbModal>;
  let mockProdutoService: jasmine.SpyObj<ProdutoService>;

  beforeEach(async () => {

    mockModalService = jasmine.createSpyObj('NgbModal', ['open', 'dismissAll']);
    mockProdutoService = jasmine.createSpyObj('ProdutoService', ['listAll', 'delete']);
  
    mockProdutoService.listAll.and.returnValue(of([]));
  
    const produtoMock: Produto = new Produto();
    
    mockProdutoService.delete.and.returnValue(of(produtoMock));
  
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ProdutoslistComponent],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ],
      providers: [
        { provide: NgbModal, useValue: mockModalService },
        { provide: ProdutoService, useValue: mockProdutoService }
      ]
  
    }).compileComponents();
  
    fixture = TestBed.createComponent(ProdutoslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('deve chamar listAll do ProdutoService na inicialização', () => {
    expect(mockProdutoService.listAll).toHaveBeenCalled();
  });

  it('deve abrir o modal e resetar o produtoSelecionadoParaEdicao em adicionar', () => {
    const mockModal = {};
    component.adicionar(mockModal);
    expect(mockModalService.open).toHaveBeenCalledWith(mockModal, { size: 'lg' });
    expect(component.produtoSelecionadoParaEdicao).toEqual(new Produto());
  });

  it('deve configurar produtoSelecionadoParaEdicao e abrir o modal em editar', () => {
    const mockModal = {};
    const produto = new Produto();
    produto.idProduto = 1;

  
    component.editar(mockModal, produto, 0);
    expect(component.produtoSelecionadoParaEdicao.idProduto).toBe(1);
    expect(mockModalService.open).toHaveBeenCalledWith(mockModal, { size: 'lg' });
  });

  it('deve chamar delete do ProdutoService em deletar', () => {
    const produto = new Produto();
    produto.idProduto = 1;
    component.deletar(produto);
    expect(mockProdutoService.delete).toHaveBeenCalledWith(1);
  });
});