import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import { Pedido } from 'src/app/models/pedido';
import { ClienteService } from 'src/app/services/cliente.service';
import { PedidoService } from 'src/app/services/pedido.service';
import 'bootstrap/dist/js/bootstrap.bundle';
import { Produto } from 'src/app/models/produto';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pedidosdetails',
  templateUrl: './pedidosdetails.component.html',
  styleUrls: ['./pedidosdetails.component.scss']
})
export class PedidosdetailsComponent {

  @Input() pedido: Pedido = new Pedido();
  @Output() retorno = new EventEmitter<Pedido>();
  @Input() modoConsulta!: boolean 

  lista:Cliente[] = [];
  clienteSelecionado!: Cliente;

  modalref!: NgbModalRef;
  modalService = inject(NgbModal);

  constructor(private clienteService: ClienteService, private pedidoService: PedidoService){
    this.listAllCliente();
  }

  byId(item1: any, item2: any){
    if(item1 != null && item2 != null)
      return item1.id === item2.id
    else
      return item1 === item2;
  }

  listAllCliente(){
    this.clienteService.listAll().subscribe({
      next: lista => {
        console.log(lista)
        this.lista = lista;
      },
      error: erro => {
        alert('Exemplo de tratamento de erro/exception! Observe o erro no console!');
        console.error(erro);
      }
  });

  }

  verificar(){
      this.pedidoService.verify(this.pedido).subscribe({
      next: pedido =>{
        this.retorno.emit(pedido);
      },
      error: erro =>{
        alert("Errro, olhar no console");
        console.log(erro)
      }
    })
  }


  produtoList(produto: Produto){
    if(this.pedido.produtos == null){
      this.pedido.produtos = []
    }

    this.pedido.produtos.push(produto);

    this.modalref.dismiss();
  }

  adicionar(modal: any){
    this.modalref = this.modalService.open(modal, {size: 'lg'})
    
  }

  deletarProduto(i: number){
    this.pedido.produtos.splice(i, 1);
  }

}


