import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-clientesdetails',
  templateUrl: './clientesdetails.component.html',
  styleUrls: ['./clientesdetails.component.scss']
})
export class ClientesdetailsComponent {

  @Input() cliente: Cliente = new Cliente();
  @Output() retorno = new EventEmitter<Cliente>();

  clienteService = inject(ClienteService);

  constructor(){

  }

  verificar(){
    this.clienteService.verify(this.cliente).subscribe({
      next: cliente =>{
        this.retorno.emit(cliente);
      },
      error: erro =>{
        alert("Errro, olhar no console");
        console.log(erro)
      }
    })
  }


}
