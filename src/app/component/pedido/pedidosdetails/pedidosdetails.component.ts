import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import { Pedido } from 'src/app/models/pedido';
import { ClienteService } from 'src/app/services/cliente.service';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
  selector: 'app-pedidosdetails',
  templateUrl: './pedidosdetails.component.html',
  styleUrls: ['./pedidosdetails.component.scss']
})
export class PedidosdetailsComponent {

  @Input() pedido: Pedido = new Pedido();
  @Output() retorno = new EventEmitter<Pedido>();

  lista:Cliente[] = [];
  clienteSelecionado!: Cliente;

  constructor(private clienteService: ClienteService, private pedidoService: PedidoService){
    this.listAllCliente();
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

  }


