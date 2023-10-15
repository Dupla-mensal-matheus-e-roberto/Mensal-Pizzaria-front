import { Component, EventEmitter, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-clienteslist',
  templateUrl: './clienteslist.component.html',
  styleUrls: ['./clienteslist.component.scss']
})
export class ClienteslistComponent {

  retorno = new EventEmitter<Cliente>();

  lista: Cliente[] = [];

  clienteSelecionadoParaEdicao: Cliente = new Cliente();
  indiceSelecionadoParaEdicao!: number;

  modalService = inject(NgbModal);
  clienteService = inject(ClienteService);

  constructor(){

    this.listAll();
  }

  listAll(){
    this.clienteService.listAll().subscribe({
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
    this.clienteSelecionadoParaEdicao = new Cliente();
 
    this.modalService.open(modal, {size: 'lg'});
  }

  editar(modal: any, cliente: Cliente, indice: number) {
    this.clienteSelecionadoParaEdicao = Object.assign({}, cliente);
    this.indiceSelecionadoParaEdicao = indice;

    this.modalService.open(modal, { size: 'lg'});
  }

  deletar(cliente: Cliente){
    this.clienteService.delete(cliente.idCliente).subscribe({
      next: retorno =>{
        this.lista = this.lista.filter(c => c.idCliente !== cliente.idCliente);
        this.retorno.emit(cliente);
      },
      error: erro =>{
        this.lista = this.lista.filter(c => c.idCliente !== cliente.idCliente);
        console.log(erro);
      }
    });
  }

  addOuEditarCliente(cliente: Cliente) {
    this.listAll();

    this.modalService.dismissAll();
  }

}
