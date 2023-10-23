import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Produto } from 'src/app/models/produto';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-produtoslist',
  templateUrl: './produtoslist.component.html',
  styleUrls: ['./produtoslist.component.scss']
})
export class ProdutoslistComponent {

  @Input() modolancamento: boolean = false;
  @Output() retorno = new EventEmitter<Produto>();

  lista: Produto[] = [];

  produtoSelecionadoParaEdicao: Produto = new Produto();
  indiceSelecionadoParaEdicao!: number;

  modalService = inject(NgbModal);
  produtoService = inject(ProdutoService);

  modoConsulta: boolean = false

  constructor(){

    this.listAll();
  }

  listAll(){
    this.produtoService.listAll().subscribe({
      next: lista => {
        this.lista = lista;
      },
      error: erro => {
        alert('Exemplo de tratamento de erro/exception! Observe o erro no console!');
        console.error(erro);
      }
    });

  }

  adicionar(modal : any){
    this.modoConsulta = false
    this.produtoSelecionadoParaEdicao = new Produto();
 
    this.modalService.open(modal, {size: 'lg'});
  }

  editar(modal: any, produto: Produto, indice: number) {
    this.modoConsulta = false
    this.produtoSelecionadoParaEdicao = Object.assign({}, produto);
    this.indiceSelecionadoParaEdicao = indice;

    this.modalService.open(modal, { size: 'lg'});
  }

  deletar(produto: Produto){
    this.produtoService.delete(produto.idProduto).subscribe({
      next: retorno =>{
        this.lista = this.lista.filter(p => p.idProduto !== produto.idProduto);
        this.retorno.emit(produto);
      },
      error: erro =>{
        this.lista = this.lista.filter(p => p.idProduto !== produto.idProduto);
        console.log(erro);
      }
    });
  }

  addOuEditarProduto(produto: Produto) {
    this.listAll();

    this.modalService.dismissAll();
  }


  lancamento(produto: Produto){
    this.retorno.emit(produto);
  }

  visualizar(modal: any, produto: Produto){
    this.modoConsulta = true;

    this.produtoSelecionadoParaEdicao = Object.assign({}, produto);

    this.modalService.open(modal, {size: 'lg'})
  }

}
