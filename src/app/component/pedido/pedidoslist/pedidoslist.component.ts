import { Component, EventEmitter, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Cliente } from 'src/app/models/cliente';
import { Pedido } from 'src/app/models/pedido';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
  selector: 'app-pedidoslist',
  templateUrl: './pedidoslist.component.html',
  styleUrls: ['./pedidoslist.component.scss']
})
export class PedidoslistComponent {

  retorno = new EventEmitter<Pedido>();

  lista: Pedido[] = [];
  listacliente: Cliente[] = [];

  pedidoSelecionadoParaEdicao: Pedido = new Pedido();
  indiceSelecionadoParaEdicao!: number;

  modalService = inject(NgbModal);
  pedidoService = inject(PedidoService);

  modoConsulta: boolean = false

  constructor(){

    this.listAll();

    
  }

  listAll(){
    this.pedidoService.listAll().subscribe({
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
    this.pedidoSelecionadoParaEdicao = new Pedido();
 
    this.modalService.open(modal, {size: 'lg'});
  }

  editar(modal: any, pedido: Pedido, indice: number) {
    this.modoConsulta = false
    console.log(pedido);
    this.pedidoSelecionadoParaEdicao = Object.assign({}, pedido);
    this.indiceSelecionadoParaEdicao = indice;

    this.modalService.open(modal, { size: 'lg'});
  }

  deletar(pedido: Pedido){
    this.pedidoService.delete(pedido.idPedido).subscribe({
      next: retorno =>{
        this.lista = this.lista.filter(p => p.idPedido !== pedido.idPedido);
        this.retorno.emit(pedido);
      },
      error: erro =>{
        this.lista = this.lista.filter(p => p.idPedido !== pedido.idPedido);
        console.log(erro);
      }
    });
  }

  addOuEditarPedido(pedido: Pedido) {
    this.listAll();

    this.modalService.dismissAll();
  }

  visualizar(modal: any, pedido: Pedido){
    this.modoConsulta = true;
    console.log(pedido);
    this.pedidoSelecionadoParaEdicao = Object.assign({}, pedido);

    this.modalService.open(modal, {size: 'lg'})
  }

}
